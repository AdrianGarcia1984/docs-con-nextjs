import axios from "axios";
import Swal from "sweetalert2";
import React, { createContext, useEffect, useState, useContext } from "react";


const UserContext = createContext();
//estado inicial para el usuario
const initialState = { login: false, token: "", nombre: "", apellido: "", id: ""  };

export const UserProvider = (props) => {
    //inicializar estados
    const [user, setUser] = useState(initialState);
    const [loading, setLoading] = useState(false);

//si se cierra el navegador para que se vuelva a autologuear usando useEfect
useEffect(() => {
    const initial = JSON.parse(localStorage.getItem("usuario"))
    initial ? initial.login && setUser(initial) : setUser(initialState);    
}, []);    

    //loginUser para iniciar sesion
    //(user para capturar datos de usuario, history para mover lo del usuario)

    const loginUser = async (user, navigate) => {
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
                }
                localStorage.setItem('usuario', JSON.stringify(userLogin));
                setUser(userLogin);
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                //navigate para mover al usuario por las rutas                
                navigate('/documentos');
            }
        } catch (error) {
            setLoading(false);
            console.log(error)
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log('error en loginUser, ', error.message);
        }

    };



    //registerUser para registrar nuevo usuario
    //user para capturar dato de usuario, history para mover lo del usuario

    const registerUser = async (user, navigate, ok) => {
        try {
            setLoading(true);
            const { data } = await axios.post('user/register', user);
            setLoading(false);
            console.log(data);
            if (ok){
                if (data.ok) {
                    const userLogin = {
                        login: true,
                        name: data.name,
                        id: data._id,
                        roles:data.roles,
                        token: data.token,
                        email: data.email,
                        
                    }
                    //console.log(userLogin)
                    localStorage.setItem('usuario', JSON.stringify(userLogin));
                    setUser(userLogin);
                    Swal.fire({
                        icon: 'success',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    //navigate para mover al usuario por las rutas
                    navigate("/homeproducts");
            }else{
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                //navigate para mover al usuario por las rutas
                    navigate("/homeuser");
            }
               
            }

        } catch (error) {
            setLoading(false);
      
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log('error registerUser', error.message);

        }
    }

    //cerrar sesion
    const exit = () => {
        setUser(initialState);
        localStorage.removeItem('usuario');
    }

    const value = {
        user,
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
