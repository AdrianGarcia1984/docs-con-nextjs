import axios from "axios";
import Swal from "sweetalert2";
import React, { createContext, useEffect, useState, useContext } from "react";
//import { serialize } from "cookie";
import { getUser, logUser, deleteUser } from '../store/slice/user'
import { useDispatch, useSelector } from 'react-redux'
//intento con cookie
import {setTokenCookie, removeTokenCookie} from '../libs/cookieAuth'




const UserContext = createContext();
//estado inicial para el usuario
const initialState = { login: false, token: "", nombre: "", apellido: "", id: "",identificacion:'', roles:'' };

export const UserProvider = (props) => {
    //inicializar estados
    const [user, setUser] = useState(initialState);
    const [loading, setLoading] = useState(false);
    //reudx
    const { token } = useSelector(state => state.users)
    const dispatch = useDispatch()

    //loginUser para iniciar sesion
    //(user para capturar datos de usuario, history para mover lo del usuario)

    const loginUser = async (user, router) => {  

        try {
            setLoading(true);
            const { data } = await axios.post("api/usuario/login", user);
            setLoading(false);
            if (data.ok) {
                const userLogin = {
                    login: true,
                    id: data._id,
                    nombre: data.nombre,
                    apellido: data.apellido,
                    roles: data.roles,
                    token: data.token,
                    identificacion:data.identificacion,
                }
                setTokenCookie(data.token)
                localStorage.setItem('usuario', JSON.stringify(userLogin));
                setUser(userLogin);
                dispatch(getUser())
                Swal.fire({
                    icon: 'success',
                    title: data.mensaje,
                    showConfirmButton: false,
                    timer: 1500,
                });
                //router para mover al usuario por las rutas  
                router.push('/controlDocumentos')
            }
        } catch (error) {
            setLoading(false);
            if (error.response === undefined) {
                //console.log('error')
                return Swal.fire({
                    icon: 'error',
                    title: 'Upss, parece que nuestro servidor no responde, intentelo mas tarde, o contacte a soporte tecnico',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'rgb(12 74 110)',
                    //timer: 2500,
                });
            }
            //console.log(error.response)
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
        (async () => {
            const initial = await JSON.parse(localStorage.getItem("usuario"))
            initial ? initial.login && setUser(initial) : setUser(initialState);
        })();
        // const initial = JSON.parse(localStorage.getItem("usuario"))
        // initial ? initial.login && setUser(initial) : setUser(initialState);
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
        removeTokenCookie()
        dispatch(deleteUser())
        //router.push("/");
    }

    const isUserAuthenticated = () => {
        setLoading(true)
        const initial = JSON.parse(localStorage.getItem("usuario"))
        if (initial===null || !initial.token)
        {
            //console.log(user.token)
            setLoading(false)
            return false;
        }
        setLoading(false)
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
