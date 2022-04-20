import axios from "axios";
import Swal from "sweetalert2";
import React, { createContext, useEffect, useState, useContext } from "react";
import { serialize } from "cookie";




const UserContext = createContext();
//estado inicial para el usuario
const initialState = { login: false, token: "", nombre: "", apellido: "", id: "" };

export const UserProvider = (props) => {
    //inicializar estados
    const [user, setUser] = useState(initialState);
    const [loading, setLoading] = useState(false);

    //loginUser para iniciar sesion
    //(user para capturar datos de usuario, history para mover lo del usuario)

    const loginUser = async (user, router) => {
        try {
            setLoading(true);
            const { data } = await axios.post("api/usuario/login", user);
            console.log(data)
            setLoading(false);
            if (data.ok) {
                const userLogin = {
                    login: true,
                    id: data._id,
                    nombre: data.nombre,
                    apellido: data.apellido,
                    roles: data.roles,
                    token: data.token,
                }
                //  const serialised = serialize('miCookie', data.token, {
                //      httpOnly: true,
                //      secure: process.env.NODE_ENV !== 'development',
                //      sameSite: 'strict',
                //      maxAge: 60 * 60 * 24 * 30,
                //      //path: '/'
                //  });
                // console.log('serialized ',serialised)
                //res.setHeader('Set-Cookie', serialised)

                localStorage.setItem('usuario', JSON.stringify(userLogin));
                setUser(userLogin);

                Swal.fire({
                    icon: 'success',
                    title: data.mensaje,
                    showConfirmButton: false,
                    timer: 1500,
                });
                //router para mover al usuario por las rutas  
                //router.push('/controlDocumentos')
                (userLogin.roles==='admin') && router.push('/controlDocumentos');
                //(userLogin.roles[0].name==='vendedor') && router('/clientes');
                //(userLogin.roles[0].name==='bodega') && router('/productos');
                //(userLogin.roles[0].name==='THumano') && router('/usuarios');
            }
        } catch (error) {
            setLoading(false);
            console.log(error.response)
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.mensaje,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log('error en loginUser, ', error.mensaje);
        }

    };    

    //si se cierra el navegador para que se vuelva a autologuear usando useEfect
    useEffect(() => {
        const initial = JSON.parse(localStorage.getItem("usuario"))
        initial ? initial.login && setUser(initial) : setUser(initialState);
    }, []);

    //registerUser para registrar nuevo usuario
    //user para capturar dato de usuario, ROUTER para mover lo del usuario

    const registerUser = async (user, router, ok, options) => {
        try {
            setLoading(true);
            const { data } = await axios.post('api/usuario/registrar', user, options);
            setLoading(false);
            //lo comentado es cuando tengamos la pagina de registro y crear usuario            
            if (data.ok) {//controla si se registro
                if (!ok) {//deja funcion habilitada para registrarse en el futuro INICIANDO SESION
                    Swal.fire({
                        icon: 'success',
                        title: data.mensaje,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    //router para mover al usuario por las rutas
                    router.push("/usuarios");
                } else {
                    const userLogin = {
                        login: true,
                        id: data._id,
                        nombre: data.nombre,
                        apellido: data.apellido,
                        identificacion: data.identificacion,
                        roles: data.roles,
                        token: data.token,
                    }
                    localStorage.setItem('usuario', JSON.stringify(userLogin));
                    setUser(userLogin);
                    Swal.fire({
                        icon: 'success',
                        title: data.mensaje,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    //router para mover al usuario por las rutas
                    router.push("/usuarios");
                }
            }
        } catch (error) {
            setLoading(false);
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.mensaje,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log('error en registerUser', error.mensaje);

        }
    }
    //cerrar sesion
    const exit = () => {
        setUser(initialState);        
        localStorage.removeItem('usuario');
        //router.push("/");
    }

    const isUserAuthenticated = () => {
        const initial = JSON.parse(localStorage.getItem("usuario"))
        if (!user.token||!initial.token) {
            console.log(user.token)
          return false;
        }
        return true
       };

    const value = {
        user,
        isUserAuthenticated,
        loginUser,
        registerUser,
        exit,
        loading,

    };

    return <UserContext.Provider value={value} {...props} />;
};

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser error");

    }
    return context;
}
