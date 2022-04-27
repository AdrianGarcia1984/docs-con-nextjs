import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { Login } from './pages/Login'
import { ControlDocumentos } from './pages/ControlDocumentos'
//import { useUser } from "./context/UserContext"

function App() {

  //const { user } = useUser()

  const Private =  ({ children }) => {
    const initial = JSON.parse(localStorage.getItem("usuario"))
    const isLoged=  initial.login
    return isLoged ? children : <Navigate to="/" />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/documentos" element={<Private><ControlDocumentos /></Private>} />

      </Routes>
    </Router>
  );
}

export default App;
