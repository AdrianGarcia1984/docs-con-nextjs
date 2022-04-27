import React, { useEffect, useState } from 'react'
import { Layout } from '../component/Layout'
import '../styles/tailwind.config'
import { useUser } from "../src/context/userContext";
import { Loading } from '../component/Loading';
import { useRouter } from 'next/router';
import { useFormik } from 'formik'
import * as Yup from "yup"
import banner from '../public/bannerNoroestePresentacion.png'




const login = () => {

    const router = useRouter();

    //extraer del usercontext
    const { loading, loginUser } = useUser();

    const formik = useFormik({
        initialValues: {
            identificacion: '7184978',
            password: '12345'
        },
        validationSchema: Yup.object({
            identificacion: Yup.number()
                .required('campo obligatorio'),
            password: Yup.string()
                .required('el password es obligatorio '),
        }),
        onSubmit: async valores => {
            loginUser(valores, router);        

        }
    })

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
                            <h2 className="mb-2 font-mono font-bold justify-content-center text-center text-gray-700 sm:font-ligth text-2xl md:text-3xl lg:text-4xl">ingreso usuario</h2>
                        </div>
                        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={formik.handleSubmit}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="identificacion" className="sr-only">
                                        Identificacion
                                    </label>
                                    <input
                                        id="identificacion"
                                        type="number"
                                        autoComplete="identificacion"
                                        value={formik.values.identificacion} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                        placeholder="identificacion"
                                    />
                                    {formik.touched.identificacion && formik.errors.identificacion &&
                                       <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert"> 
                                            <p>{formik.errors.identificacion}</p>
                                        </div>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                        placeholder="Contraseña"
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
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-900 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900"
                                >
                                    ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        }

        </>
    )
}

export default login