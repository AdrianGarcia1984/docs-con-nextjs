import React, { useEffect } from 'react'
import { useUser } from '../src/context/userContext';
import Link from 'next/link'
import banner from '../public/bannerNoroestePresentacion.png'
import { getUser } from '../src/store/slice/user'
import { useDispatch, useSelector } from 'react-redux'

export const Nav = () => {
  const { user, exit } = useUser();
  const { nombre, apellido, roles } = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])  
 

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-md navbar-light bg-inpec ">
        <div className="container-fluid">
        <a className="navbar-brand " href="/">
            <img src={banner.src} alt="/" width="180" height="44" className="d-inline-block align-text-top fw-bold fs-2 me-2 rounded  justify-content-end" />            
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-decoration-none" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <>
                {user.login === true ?
                  (<>
                    <li className="nav-item text-decoration-none">
                      <Link href="/"><a className="nav-link text-decoration-none fw-bold" aria-current="page">Home</a></Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle fw-bold" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {`${nombre} ${apellido}`}
                      </a>
                      <ul className="dropdown-menu fw-bold" aria-labelledby="navbarDropdown">
                        <li><Link href="/controlDocumentos"><a className="dropdown-item fw-bold" >documentos</a></Link></li>
                        {roles==='admin'&&<>
                          <li><Link href="/usuarios"><a className="dropdown-item fw-bold" >usuarios</a></Link></li>
                          </>  }
                          <li><hr className="dropdown-divider" /></li>
                        
                        <li><Link href='/'><a className="dropdown-item fw-bold" onClick={() => exit()}>cerrar sesion</a></Link></li>
                      </ul>
                    </li>
                  </>
                  ) : (

                    <>
                      <li className="nav-item text-decoration-none">
                        <Link href="/login"><a className="nav-link text-decoration-none fw-bold" aria-current="page">Ingresar</a></Link>
                      </li>
                      {/* <li className="nav-item text-decoration-none">
                        <Link href="/api/auth/signin"><a className="nav-link text-decoration-none" aria-current="page">login con nextAuth</a></Link>
                      </li> */}
                    </>
                  )}
              </>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
