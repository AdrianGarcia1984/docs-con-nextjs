import { UserProvider } from '../src/context/userContext';
import '../styles/globals.css'
import axios from "axios";
import 'rc-pagination/assets/index.css';
//import { SessionProvider } from 'next-auth/react'

//pruebas con 


axios.defaults.baseURL = "http://localhost:4000/"
//axios.defaults.baseURL=" https://backend-adr.herokuapp.com/"


//para pruebas con next auth
// function MyApp({ Component, pageProps: { session, ...pageProps } }) {
//   return (
//     <SessionProvider session={session}>
//       <UserProvider>
//         <Component {...pageProps} />
//       </UserProvider>
//     </SessionProvider>

//   )
// }

function MyApp({ Component, pageProps}) {
  return (    
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
  )
}

export default MyApp
