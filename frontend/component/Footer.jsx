import React, { useState } from 'react'

export const Footer = () => {

  return (
    <div className='container'>
        <footer className='d-flex flex-wrap justify-conten-between align-items-center py-3 my-4 border-top sticky-botton'>  
        <div className='col-md-4 d-flex align-items-center'>
            <a href="http://www.inpec.gov.co" target='_blank' className='mb-3 me-2 mb mb-0 text-muted text-decoration-none lh-1'>
                <img
                    className='bi' width={30} height={24} src='https://www.inpec.gov.co/documents/20143/46642/3110245.PNG/751d7e05-ee7e-b529-0f64-1b934ea9e114?t=1511790311995'
                />
            </a>
                <span className='text-muted me-1'><p>© 2022 Adrian Garcia</p> </span>
                <hr/>
                <span className='text-muted'>Version: 1.0</span>
        </div>
        <div className='col-md-4 d-flex align-items-center'>
            <span className='text-muted me-1'>DIRECCION REGIONAL NOROESTE EDIFICIO BANCOQUIA 2DO PISO</span><hr/>
            <span className='text-muted me-1'>CONTACTO: 6012347474</span>
        </div>
        <ul className='nav col-md-4 justify-content-end list-unstyled d-flex'>
            <li className='ms-3'>
                <a className='text-muted' target='_blank' href="https://twitter.com/INPEC_Colombia?ref_src=twsrc%5Etfw">
                    <i className="fab fa-twitter-square"></i>
                </a>
            </li>
            <li className='ms-3'>
                <a className='text-muted' target='_blank' href="http://es-la.facebook.com/INPECoficial/">
                    <i className="fab fa-facebook-square"></i>
                </a>
            </li>

        </ul>
        </footer>
    </div>
  )
}
