import { Layout } from '../component/Layout'
import React, { useState } from 'react'
import '../styles/tailwind.config'
import { useUser } from "../src/context/userContext";
import { Loading } from '../component/Loading';
import { useRouter } from 'next/router';
import * as Yup from "yup"
import Swal from 'sweetalert2';
import axios from 'axios';
import { formData } from '../src/helpers/formData';
import Link from 'next/link'
import banner from '../public/bannerNoroestePresentacion.png'




const documento = () => {
    const router = useRouter();
    //extraer del usercontext
    const { user} = useUser();
    const options = { headers: { authorization: "Bearer " + user.token } }
    const inicialState = {
        oficio: '',
        fecha: '',
        asunto: '',
        img: '',
        usuario: '',
        preview: ""
    }
    const [stateDocument, setStateDocument] = useState(inicialState)
    const [loading, setLoading] = useState(false);
    

    const guardarDocumento = async (datos) => {
        try {
            setLoading(true);
            const { data } = await axios.post('api/documento/registrar/', datos, options);
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'guardado',
                text: data.message,
                showConfirmButton: false,
                timer: 2500,
            })
            router.push("/controlDocumentos") //redireccion a controlDocumentos
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
            router.push("/controlDocumentos") //redireccion a controlDocumentos
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
            console.log("error en crearDocumentos", error.message)
        }
    }

    const validarFormato = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imagen = e.target.files[0];
            //if (!/\.(jpeg|jpg|png|svg|SVG|PNG|JPG|JPEG|pdf|PDF)$/i.test(imagen.name)) {
            if (!/\.(pdf|PDF)$/i.test(imagen.name)) {
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                    text: 'el archivo no es un tipo de archivo valido',
                })
                e.target.value = '';
                setStateDocument({ ...stateDocument, img: "" })
                //setStateDocument({ ...stateDocument, img: "", preview: "" })    
            } else {
                //setStateDocument({ ...stateDocument, img: imagen, preview: URL.createObjectURL(imagen) })
                setStateDocument({ ...stateDocument, img: imagen })
                console.log(stateDocument)
            }
        }
    }

    const ChangeInput = (e) => {
        setStateDocument({
            ...stateDocument, [e.target.name]: e.target.value
        });
        console.log(stateDocument)
    }

    const action = (e) => {
        e.preventDefault()
        stateDocument.usuario = user.id
        guardarDocumento(formData(stateDocument));
    }


    return (
        <>
            <Layout>
                {loading ? <Loading /> :
                    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full space-y-8 ">
                            <div >
                                <img
                                    className="mx-auto h-30 w-auto"
                                    src={banner.src}
                                    alt="banner noroeste"
                                />
                                <h2 className='m-2 font-mono font-bold justify-content-center text-center text-gray-700 xs:font-ligth text-2xl md:text-3xl lg:text-4xl'>Registrar Nuevo Documento</h2>
                            </div>
                            <form className="mt-8 space-y-6"
                                onSubmit={action}
                            >
                                <input type="hidden" name="remember" defaultValue="true" />
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <label htmlFor="oficio" className="sr-only">
                                            Numero de oficio
                                        </label>
                                        <input
                                            id="oficio"
                                            type="text"
                                            name="oficio"
                                            autoComplete="oficio"
                                            onChange={(e) => ChangeInput(e)}
                                            value={stateDocument.oficio}

                                            required
                                            className="uppercase appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="oficio"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="fecha" className="sr-only">
                                            fecha
                                        </label>
                                        <input
                                            id="fecha"
                                            name="fecha"
                                            type="text"
                                            required
                                            onChange={(e) => ChangeInput(e)}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="fecha"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="asunto" className="sr-only">
                                            asunto
                                        </label>
                                        <input
                                            id="asunto"
                                            name="asunto"
                                            type="text"
                                            required
                                            onChange={(e) => ChangeInput(e)}
                                            className="lowercase appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="asunto"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="img" className="sr-only">
                                            documento
                                        </label>
                                        <input
                                            id="img"
                                            name="img"
                                            type="file"
                                            required
                                            onChange={(e) => validarFormato(e)}
                                            className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-sky-50 file:text-sky-700
                                        hover:file:bg-sky-100
                                      "
                                            placeholder="documento"
                                        />
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
                                        href={'/controlDocumentos'}
                                        type="button"
                                    ><a className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 text-decoration-none">
                                            cancelar
                                        </a>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </Layout>
        </>
    )
}

export default documento

