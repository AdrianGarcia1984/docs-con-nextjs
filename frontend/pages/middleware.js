import React, { useEffect } from 'react'
import { NextResponse } from 'next/server'
import { useUser } from '../src/context/userContext'

const _middleware = (req) => {

    
    const jwt = ''
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        jwt = JSON.parse(localStorage.getItem("usuario"))
    }
    
    // useEffect(() => {
        //     // Perform localStorage action
        //     const item = JSON.parse(localStorage.getItem("usuario"))
        //   }, [])    
        //const initial = JSON.parse(localStorage.getItem("usuario"))
        //const {user} = useUser()
        
        //console.log('jwt',jwt)
    //console.log(req.url)

    const url = req.url

    if (url.includes('/controlDocumentos')) {
        console.log('si la incluye')
        //if (jwt===)
    }

}

export default _middleware