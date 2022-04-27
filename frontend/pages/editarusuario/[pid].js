import { Layout } from '../../component/Layout'
import React, { useState, useEffect } from 'react'
import '../../tailwind.config'
import { useUser } from '../../src/context/userContext';
import { useRouter } from 'next/router'
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link'
import { Loading } from '../../component/Loading';
import { Formik } from 'formik'
import * as Yup from "yup"
import banner from '../../public/bannerNoroestePresentacion.png'
import { getTokenCookie } from '../../src/libs/cookieAuth';


const editarusuario = () => {

    const router = useRouter();
    //extraer del usercontext
    const { user } = useUser();
    const tokenCookie =getTokenCookie()
  const options = { headers: { authorization: "Bearer " + tokenCookie } }
    const { query: { pid } } = router;
    const [loading, setLoading] = useState(false);
    const inicialState = {
        nombre: '',
        apellido: '',
        identificacion: '',
        roles: '',
        password: '',
    }
    const [stateUsuario, setStateUsuario] = useState(inicialState)


    useEffect(() => {
        pid ? listarUsuarioId() : setStateUsuario(inicialState)
    }, [pid])// eslint-disable-next-line

    const listarUsuarioId = async () => {
        console.log(pid)
        try {
            setLoading(true);
            const { data } = await axios.get('/api/usuario/usuario/' + pid, options)
            console.log(data.data)
            setStateUsuario({ ...stateUsuario, nombre: data.data.nombre, apellido: data.data.apellido, identificacion: data.data.identificacion, password: data.data.password, roles: data.data.roles })
            //console.log(stateUsuario)
            setLoading(false);
        } catch (error) {
            //console.log(error)
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
                error.response.data.ok === false && (setDisableBoton(false))
                return Swal.fire({
                  icon: 'error',
                  title: error.response.data.message,
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
        }
    }

    //inicia prueba con formik

    const schemaValidation = Yup.object({
        nombre: Yup.string().required('el nombre es obligatorio '),
        apellido: Yup.string().required('el apellido es obligatorio '),
        identificacion: Yup.number().required('la identificacion es obligatoria '),
        roles: Yup.string().required('el rol es obligatorio '),
        password: Yup.string()
        .min(6, 'el password debe contener al menos 6 caracteres'),

    });
    //termina prueba con formik


    const editarUsuario = async (datos) => {
        console.log(datos)
        try {
            setLoading(true);
            const { data } = await axios.put('api/usuario/actualizar/' + pid, datos, options);
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'guardado',
                text: data.message,
                showConfirmButton: false,
                timer: 2500,
            })
            router.push("/usuarios") //redireccion a usuarios
        } catch (error) {
            setLoading(false);
            router.push("/usuarios")//redireccion a usuarios
            console.log(error)
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
            console.log("error en editar usuarios", error.message)
        }
    }


    return (
        <>
            <Layout>
                {loading ? <Loading /> :

                    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <img
                                    className="mx-auto h-30 w-auto"
                                    src={banner.src}
                                    alt="bannner noroeste"
                                />
                                <h2 className="m-2 font-mono text-center font-bold text-center justify-content-center text-gray-700 xs:font-ligth text-2xl md:text-3xl lg:text-4xl">Editar Usuario</h2>
                            </div>
                            <Formik
                                validationSchema={schemaValidation}
                                enableReinitialize
                                initialValues={stateUsuario}
                                onSubmit={(valores) => {
                                    console.log(valores)
                                    editarUsuario(valores);
                                }}
                            >
                                {props => {
                                    return (
                                        <form className="mt-8 space-y-6"
                                            //onSubmit={action}
                                            onSubmit={props.handleSubmit}
                                        >
                                            <input type="hidden" name="remember" defaultValue="true" />
                                            <div className="rounded-md shadow-sm -space-y-px">
                                                <div>
                                                    <label htmlFor="nombre" className="sr-only">
                                                        Nombre
                                                    </label>
                                                    <input
                                                        id="nombre"
                                                        type="text"
                                                        name="nombre"
                                                        autoComplete="nombre"
                                                        required
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="nombre"
                                                        //onChange={(e) => ChangeInput(e)}
                                                        //value={stateUsuario.nombre}
                                                        value={props.values.nombre}
                                                        onChange={props.handleChange} onBlur={props.handleBlur}

                                                    />
                                                    {props.touched.nombre && props.errors.nombre &&
                                                        <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert"> 
                                                            <p>{props.errors.nombre}</p>
                                                        </div>}
                                                </div>
                                                <div>
                                                    <label htmlFor="apellido" className="sr-only">
                                                        apellido
                                                    </label>
                                                    <input
                                                        id="apellido"
                                                        name="apellido"
                                                        type="text"
                                                        required
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="apellido"
                                                        //onChange={(e) => ChangeInput(e)} value={stateUsuario.apellido}
                                                        value={props.values.apellido} onChange={props.handleChange} onBlur={props.handleBlur}
                                                    />
                                                    {props.touched.apellido && props.errors.apellido &&
                                                        <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert"> 
                                                            <p>{props.errors.apellido}</p>
                                                        </div>}
                                                </div>
                                                <div>
                                                    <label htmlFor="identificacion" className="sr-only">
                                                        identificacion
                                                    </label>
                                                    <input
                                                        id="identificacion"
                                                        name="identificacion"
                                                        type="number"
                                                        required
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="identificacion"
                                                        //onChange={(e) => ChangeInput(e)} value={stateUsuario.identificacion}
                                                        value={props.values.identificacion} onChange={props.handleChange} onBlur={props.handleBlur}
                                                    />
                                                    {props.touched.identificacion && props.errors.identificacion &&
                                                        <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert"> 
                                                            <p>{props.errors.identificacion}</p>
                                                        </div>}
                                                </div>
                                                <div>
                                                    <label htmlFor="roles" className="sr-only">
                                                        roles
                                                    </label>
                                                    <select className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        name='roles'
                                                        //value={stateUsuario.roles} onChange={(e) => ChangeInput(e)}
                                                        onBlur={props.handleBlur}
                                                        value={props.values.roles} 
                                                       // onChange={e => cambiarEstadoRol(e.target.value)}
                                                        onChange={props.handleChange}
                                                    >roles
                                                        <option value="usuario">usuario</option>
                                                        <option value="consulta">consulta</option>
                                                        <option value="admin">admin</option>
                                                    </select>
                                                    {props.touched.roles && props.errors.roles &&
                                                       <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert"> 
                                                            <p>{props.errors.roles}</p>
                                                        </div>}
                                                </div>
                                                <div>
                                                    <label htmlFor="password" className="sr-only">
                                                        password
                                                    </label>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="password"
                                                        //onChange={(e) => ChangeInput(e)} value={stateUsuario.password}
                                                        value={props.values.password} onChange={props.handleChange} onBlur={props.handleBlur}
                                                    />
                                                    {props.touched.password && props.errors.password &&
                                                        <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert"> 
                                                            <p>{props.errors.password}</p>
                                                        </div>}
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-900 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900"
                                                >
                                                    Guardar
                                                </button>
                                                <Link
                                                    href={'/usuarios'}
                                                    type="button"
                                                ><a className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 text-decoration-none">
                                                        cancelar
                                                    </a>
                                                </Link>
                                            </div>
                                        </form>
                                    )
                                }}


                            </Formik>

                            {/* 
                            <form className="mt-8 space-y-6"
                                //onSubmit={action}
                                onSubmit={formik.handleSubmit}
                            >
                                <input type="hidden" name="remember" defaultValue="true" />
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <label htmlFor="nombre" className="sr-only">
                                            Nombre
                                        </label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            name="nombre"
                                            autoComplete="nombre"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="nombre"
                                            //onChange={(e) => ChangeInput(e)}
                                             //value={stateUsuario.nombre}
                                            value={formik.values.nombre} 
                                            onChange={formik.handleChange} onBlur={formik.handleBlur}

                                        />
                                        {formik.touched.nombre && formik.errors.nombre &&
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{formik.errors.nombre}</p>
                                        </div>}
                                    </div>
                                    <div>
                                        <label htmlFor="apellido" className="sr-only">
                                            apellido
                                        </label>
                                        <input
                                            id="apellido"
                                            name="apellido"
                                            type="text"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="apellido"
                                            //onChange={(e) => ChangeInput(e)} value={stateUsuario.apellido}
                                            value={formik.values.apellido} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.apellido && formik.errors.apellido &&
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{formik.errors.apellido}</p>
                                        </div>}
                                    </div>
                                    <div>
                                        <label htmlFor="identificacion" className="sr-only">
                                            identificacion
                                        </label>
                                        <input
                                            id="identificacion"
                                            name="identificacion"
                                            type="number"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="identificacion"
                                            //onChange={(e) => ChangeInput(e)} value={stateUsuario.identificacion}
                                            value={formik.values.identificacion} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.identificacion && formik.errors.identificacion &&
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{formik.errors.identificacion}</p>
                                        </div>}
                                    </div>
                                    <div>
                                        <label htmlFor="roles" className="sr-only">
                                            roles
                                        </label>
                                        <select className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        name='roles'
                                         //value={stateUsuario.roles} onChange={(e) => ChangeInput(e)}
                                         onBlur={formik.handleBlur}
                                         value={estadoRol} onChange={e => cambiarEstadoRol(e.target.value)}
                                         >roles
                                                 <option value="consulta">consulta</option>
                                                 <option value="usuario">usuario</option>
                                                 <option value="admin">admin</option>
                                             </select>
                                         {formik.touched.roles && formik.errors.roles &&
                                             <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                                 <p className='font-bold'>Error</p>
                                                 <p>{formik.errors.roles}</p>
                                             </div>}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="sr-only">
                                            password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="password"
                                            //onChange={(e) => ChangeInput(e)} value={stateUsuario.password}
                                            value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.password && formik.errors.password &&
                                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                                    <p className='font-bold'>Error</p>
                                                    <p>{formik.errors.password}</p>
                                                </div>}
                                    </div>
                                    <div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-900 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900"
                                    >
                                        Guardar
                                    </button>
                                    <Link
                                        href={'/usuarios'}
                                        type="button"
                                    ><a className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 text-decoration-none">
                                            cancelar
                                        </a>
                                    </Link>
                                </div>
                            </form> */}
                        </div>
                    </div>
                }
            </Layout>

        </>
    )
}

export default editarusuario
