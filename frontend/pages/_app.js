import { UserProvider } from '../src/context/userContext';
import '../styles/globals.css'
import axios from "axios";
import 'rc-pagination/assets/index.css';
//import { SessionProvider } from 'next-auth/react'
import React from 'react';
//pruebas con redux
import { Provider } from 'react-redux'
import store from '../src/store'


axios.defaults.baseURL = "http://localhost:4000/"
//axios.defaults.baseURL=" https://backend-adr.herokuapp.com/"


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>       
    <UserProvider>        
      <Component {...pageProps} />
    </UserProvider>
    </Provider>
  )
}
 export default MyApp
