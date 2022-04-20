import React, { useState, useEffect } from 'react'
import { Layout } from '../component/Layout'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useUser } from '../src/context/userContext'
import { useRouter } from 'next/router'
import { Loading } from '../component/Loading'
import banner from '../public/bannerNoroestePresentacion.png'
import Link from 'next/link'



const registrar = () => {
    const { loading, registerUser,user } = useUser();
  const options = { headers: { authorization: "Bearer " + user.token } }
    const router = useRouter();
    const [estadoRol, setEstadoRol] = useState('usuario')
    const [ok, setOk] = useState(false)


    const formik = useFormik({
        initialValues: {
            nombre: "",
            apellido: "",
            identificacion: "",
            password: "",
            roles: estadoRol
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('el nombre es obligatorio '),
            apellido: Yup.string()
                .required('el apellido es obligatorio '),
            identificacion: Yup.number()
                .required('la identificacion es obligatorio '),
            password: Yup.string()
                .required('el password es obligatorio ').min(6, 'el password debe contener al menos 6 caracteres'),
            roles: Yup.string()
                .required('el rol es obligatorio '),
        }),
        onSubmit: async valores => {
            console.log(valores)
            registerUser(valores, router, ok , options);
        }
    });


    const cambiarEstadoRol = (e) => {
        try {
            setEstadoRol(e)
            console.log(estadoRol)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>{loading ? <Loading /> :
            <Layout>
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <img
                                className="mx-auto h-30 w-auto"
                                src={banner.src}
                                alt="banner noroeste"
                            />
                            <div className='justify-content-center d-flex '>
                                <h2 className='m-2 font-mono text-center font-bold text-center justify-content-center text-gray-700 xs:font-ligth text-2xl md:text-3xl lg:text-4xl'>registro de usuario</h2>
                            </div>
                        </div>
                        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={formik.handleSubmit}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="identificacion-address" className="sr-only">
                                        nombres
                                    </label>
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="string"
                                        autoComplete="nombre"
                                        required
                                        className="capitalize appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                        placeholder="nombre"
                                        value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.nombre && formik.errors.nombre &&
                                        <><div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                                            <p>{formik.errors.nombre}</p>
                                        </div>
                                        </>}
                                </div>
                                <div>
                                    <label htmlFor="apellido" className="sr-only">
                                        apellidos
                                    </label>
                                    <input
                                        id="apellido"
                                        name="apellido"
                                        type="string"
                                        autoComplete="apellido"
                                        required
                                        className="capitalize appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                        placeholder="apellido"
                                        value={formik.values.apellido} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.apellido && formik.errors.apellido &&
                                        <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
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
                                        autoComplete="identificacion"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                        placeholder="identificacion"
                                        value={formik.values.identificacion} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.identificacion && formik.errors.identificacion &&
                                        <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                                            <p>{formik.errors.identificacion}</p>
                                        </div>}
                                </div>
                                <div>
                                    <label htmlFor="roles" className="sr-only">
                                        roles
                                    </label>
                                    <select className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                        //value={formik.values.roles} 
                                        // onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur}
                                        value={estadoRol} onChange={e => cambiarEstadoRol(e.target.value)}
                                    >roles
                                        <option value="consulta">consulta</option>
                                        <option value="usuario">usuario</option>
                                        <option value="admin">admin</option>
                                    </select>
                                    {formik.touched.roles && formik.errors.roles &&
                                        <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                                            <p>{formik.errors.roles}</p>
                                        </div>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.password && formik.errors.password &&
                                        <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                                            <p>{formik.errors.password}</p>
                                        </div>}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-900 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                >
                                    registrar
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
                    </div>
                </div>
            </Layout>
        }
        </>
    )
}

export default registrar
