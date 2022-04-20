import { Layout } from '../component/Layout'
import React, { useState, useEffect } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useUser } from '../src/context/userContext';
import { Pdf } from '../component/Pdf'
import '../styles/tailwind.config'
import { Loading } from '../component/Loading';
import banner from '../public/bannerNoroestePresentacion.png'
//import { useSession } from 'next-auth/react';


export default function Home() {

// const {data:session} = useSession()
// console.log(session)

    const sitekey = '6Lc51gofAAAAAKJBy3L96a9RY6CStP7AnJDjGWPt'
    const { user } = useUser();
    const options = { headers: { authorization: "Bearer " + user.token } }
    const inicialState = {
        oficio: '',
        fecha: '',
        asunto: '',
        img: ''
    }
    const [stateDocument, setStateDocument] = useState(inicialState)
    const [stateMostrar, setStateMostrar] = useState(inicialState)
    const [loading, setLoading] = useState(false);
    const [enable, setEnable] = useState('')
    const [border, setBorder] = useState('disabled')

    const listarDocumentoId = async (datos) => {
        //console.log(datos)
        try {
            setLoading(true);
            const { data } = await axios.post('/api/documento/consultar/', datos, options)
            console.log(data.data[0].oficio)
            setStateMostrar(data.data[0])
            //console.log(stateMostrar)
            setLoading(false);
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
            //console.log(error.response.data)
            if (!error.response.data.ok) {
                //error.response.data.ok === false && (setDisableBoton(false))
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: true,
                    timer: 2500,
                });
            }
        }
    }

    const ChangeInput = (e) => {
        setStateDocument({
            ...stateDocument, [e.target.name]: e.target.value
        });
       // console.log(stateDocument)
    }

    const action = (e) => {
        e.preventDefault()
        listarDocumentoId(stateDocument);
    }


    const onChange = (value) => {
        //console.log(value)
        if (value) {
            setBorder("")
        } else {
            setBorder('disabled')
        }
    }

    return (
        <>
            <Layout>                
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <img
                                className="mx-auto h-30 w-auto"
                                src={banner.src}
                                alt="bannerNoroeste"
                            />
                            <h2 className="mt-6 font-mono md:font-bold text-center text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900">Validar Documento</h2>
                            <p className='text-center font-mono text-gray-900 font-bold'>A continuacion podra verificar la veracidad del documento expedido por la REGIONAL NOROESTE</p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={action} >
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="oficio" className="sr-only">
                                        oficio
                                    </label>
                                    <input
                                        id="oficio"
                                        name="oficio"
                                        type="text"
                                        autoComplete="oficio"
                                        required
                                        onChange={(e) => ChangeInput(e)}
                                        value={stateDocument.oficio}
                                        className="uppercase appearance-none disabled:opacity-75 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm required:border-red-500"
                                        placeholder="numero de oficio"
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
                                        onChange={(e) => ChangeInput(e)}
                                        required
                                        value={stateDocument.fecha}
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm required:border-red-500"
                                        placeholder="fecha oficio"
                                    />
                                </div>
                            </div>
                            <div className='recaptcha'>
                                <ReCAPTCHA
                                    sitekey={sitekey}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className={` btn btn-primary btn-outline-primary ${border} text-white form-control`}
                                >
                                    validar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {loading ? <Loading /> :
                    <>
                        {stateMostrar._id && <div className="card mb-3" key={stateMostrar._id}            >
                            <div className="row g-0">
                                <div className="col-md-5">
                                    <div className="card-body">
                                        <h5 className="card-title">oficio N°: {stateMostrar.oficio}</h5>
                                        <p className="card-text"> asunto del oficio: {stateMostrar.asunto}</p>
                                        <p className="card-text"><small className="text-muted">ultima actualizacion: {stateMostrar.fecha}
                                        </small></p>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="file">
                                        <Pdf key={stateMostrar._id} documento={stateMostrar.img} />
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </>}
            </Layout>

        </>


    )
}
