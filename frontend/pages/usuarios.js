import React, { useState, useEffect } from 'react'
import { Layout } from '../component/Layout'
import { useUser } from '../src/context/userContext';
import Router, { useRouter } from 'next/router';
import { Loading } from '../component/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import Link from 'next/link'
import { getTokenCookie } from '../src/libs/cookieAuth'
import banner from '../public/bannerNoroestePresentacion.png'
import { getUser } from '../src/store/slice/user'
import { useDispatch, useSelector } from 'react-redux'

const usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [role, setRole] = useState([]);
    const initialState = { id: "", identificacion: "", roles: '', password: "" }
    const { user, loading } = useUser();
    const [load, setLoad] = useState(false);
    const tokenCookie = getTokenCookie()
    const options = { headers: { authorization: "Bearer " + tokenCookie } }

    //redux pruebas
    const { token: tokenUsuario } = useSelector(state => state.users)
    const dispatch = useDispatch()

    const listarUsuarios = async () => {
        try {
            setLoad(true)
            const { data } = await axios.get('api/usuario/', options);
            setLoad(false)
            //console.log(data.data)
            setUsuarios(data.data);
            //setRole(data.rolModel);
        } catch (error) {
            //console.log(error)
            setLoad(false)
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
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log('error listarUsuarios', error.message);
        }
    }

    const editarUsuario = (id) => {
        Router.push({
            pathname: '/editarusuario/[id]',
            query: { id }
        })
    }

    const borrarUsuario = async (id) => {
        try {
            if (user.id !== id) {
                Swal.fire({
                    title: 'esta seguro?',
                    text: "esta operacion no es reversible",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'eliminar'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const { data } = await axios.delete('api/usuario/borrar/' + id, options);
                        listarUsuarios();
                        Swal.fire({
                            icon: 'success',
                            title: data.message,
                            showConfirmButton: false,
                            timer: 2500
                        })
                    }
                })
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: "no puedes eliminar tu propio usuario",
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        } catch (error) {
            if (!error.response.data.ok) {
                return alert(error.message)
            }
            console.log('error en borrar usuario', error.message);
        }
    }

    useEffect(() => {
        dispatch(getUser())
        listarUsuarios()
        // eslint-disable-next-line
    }, []);

    return (
        <Layout>
            {loading || load ? <Loading /> :
                <>
                    <div className='d-grid d-md-flex justify-content-md-start'>
                        <img
                            className="mx-auto h-20 w-auto m-h-30"
                            src={banner.src}
                            alt="banner noroeste"
                        />
                    </div>
                    <div className='justify-content-center d-flex '>
                        <h2 className='m-2 font-mono font-bold justify-content-center text-center text-gray-700 xs:font-ligth text-2xl md:text-3xl lg:text-4xl'>modulo control usuarios</h2>
                    </div>
                    <div className="d-grid gap-3 d-md-flex justify-content-md-start m-3">
                        <Link className="btn btn-primary me-md-2" type="button" href="/registrar"><a className='text-decoration-none text-white btn btn-primary'>Nuevo usuario</a></Link>
                    </div>


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-3">
                        <table className="w-full text-sm text-left text-black-500 dark:text-black-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nombres
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Apellidos
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Identificacion
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        roles
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Editar</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usuarios.map((item) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 " key={item._id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-black-900" >
                                                {item.nombre}
                                            </th>
                                            <td className="px-6 py-4 font-medium text-black-900">
                                                {item.apellido}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-black-900">
                                                {item.identificacion}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-black-900">
                                                {item.roles}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a href="#" className="font-medium text-black-600 dark:text-black-500 hover:underline me-3" onClick={() => editarUsuario(item._id)}><i className='fas fa-edit'></i></a>
                                                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => borrarUsuario(item._id)}><i className='fas fa-trash'></i></a>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </Layout>
    )
}
export default usuarios
