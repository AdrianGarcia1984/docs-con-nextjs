import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
//import { Layout } from '../component/Layout'
//import { Pdf } from '../component/Pdf'
import { useUser } from '../context/UserContext';
//import { Loading } from '../component/Loading'
import Pagination from 'rc-pagination';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';



export const ControlDocumentos = () => {
    const navigate = useNavigate();
    const [listarDocumento, setListarDocumento] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState("");
    const { user } = useUser();
    const initial = JSON.parse(localStorage.getItem("usuario"))
    const  options = { headers: { authorization: "Bearer " + initial.token } }
    console.log(options)


    const listarDocumentos = useCallback(async (pageCurrent) => {
        try {
          setLoading(true);
          const { data } = await axios.get(`api/documento/?page=${pageCurrent}`, options);
          setLoading(false);
          if (data.data.docs.length > 0) {
            setListarDocumento(data.data.docs);
            setPage(data.data.page);
            setTotalPage(data.data.totalPages)
          } else {
            setLoading(false);
            //setDisableBoton(true)
            setListarDocumento([]);
          }
        } catch (error) {
          setLoading(false)
          console.log(error.response.data)
          if (!error.response.data.ok) {
            //error.response.data.ok === false //&& (setDisableBoton(false))
            return Swal.fire({
              icon: 'error',
              title: error.response.data.message,
              showConfirmButton: false,
              timer: 2500,
            });
          }
          console.log('error en  listarDocumentos', error.mensaje);
        }
      }, [])// eslint-disable-next-line
    
    
      useEffect(() => {
        listarDocumentos(page);
      }, [listarDocumentos, page])
    
      const onchangePage = (page) => {
        console.log(page)
        listarDocumentos(page);
      }
    
      const editarDocumento = (id) => {
        // Router.push({
        //   pathname: '/editardocumento/[id]',
        //   query: { id }
        // })
      }
    
      const borrarDocumento = async (id) => {
        console.log(id)
        try {
          Swal.fire({
            title: 'estas seguro?',
            text: "esta operacion no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'borrar'
          }).then(async (result) => {
            if (result.isConfirmed) {
              const { data } = await axios.delete('/api/documento/borrar/' + id, options);
              listarDocumentos();
              Swal.fire({
                text: data.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 1000,
              })
            }
          })
         // router.push("/controlDocumentos") //redireccion a controlDocumentos
        } catch (error) {
          setLoading(false)
          console.log(error.response)
          if (!error.response.data.ok) {
            //error.response.data.ok === false && (setDisableBoton(false))
            return Swal.fire({
              icon: 'error',
              title: error.response.data.message,
              showConfirmButton: false,
              timer: 2500,
            });
          }
          console.log('error en  listarDocumentos', error.mensaje);
        }
    
      }



    return (
        <div>
            <div className='"min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
              <img
                className="mx-auto h-20 w-auto"
                //src={banner.src}
                alt="Workflow"
              />
            </div>
              <div className='justify-content-center d-flex'>
                <h2 className='mb-2 font-mono font-bold justify-content-center text-center text-gray-700 sm:font-ligth text-2xl md:text-3xl lg:text-4xl'>modulo control documentos</h2>
              </div>
            {/* <div className="d-grid gap-3 d-md-flex justify-content-md-start m-3">
              <Link className="btn btn-primary me-md-2" type="button" href="/documento"><a className='text-decoration-none text-white btn btn-primary'>Nuevo Documento</a></Link>
            </div> */}
            <div>
              {
                listarDocumento.map((item, i) => (
                  <div className="card m-3" key={item._id}            >
                    <div className="row g-0">
                      <div className="col-md-5">
                        <div className="card-body">
                          <h5 className="card-title">oficio N°: {item.oficio}</h5>
                          <p className="card-text"> asunto del oficio: {item.asunto}</p>
                          <p className="card-text"><small className="text-muted">ultima actualizacion: {item.fecha}

                          </small></p>
                          <div className='justify-content-md-start'>
                            <a type='button' className='py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-900 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900 m-2' onClick={() => editarDocumento(item._id)}><i className='fas fa-edit me-1'></i>editar</a>
                            <a type='button' className=' py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 text-decoration-none m-2' onClick={() => borrarDocumento(item._id)}><i className='fas fa-trash me-1'></i>borrar</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="file">
                          {/* <Pdf key={item._id} documento={item.img} /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="my-5 d-flex justify-content-center">
              {/* <!-- visual paginacion // --> */}
              <Pagination
                //className="pagination"
                current={page}
                total={totalPage}
                pageSize={1}
                onChange={onchangePage}
              />
            </div>

        </div>
    )
}
