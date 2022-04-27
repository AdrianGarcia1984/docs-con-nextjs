import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
//import { Loading } from './Loading';

export const Login = () => {

    const navigate = useNavigate();
    const [identificacion, setIdentificacion] = useState('7184978');
    const [password, setPassword] = useState('12345');
    //extraer del usercontext
    const { loading, loginUser } = useUser();


    const login = (e) => {
        e.preventDefault();
        const user = { identificacion, password };
        loginUser(user, navigate);
    }


    return (

        <>
        <div>login

            <section className="container mt-5 mb-5 mx-auto col-4-md-5 d-flex">
                <div className="card mx-auto card-login">
                    <div className="card-body">
                        <h4 className="card-title mb-4">login an Account</h4>
                        <form className="form-card" onSubmit={login}>
                            <div className="mb-3">
                                
                                <label className="form-label">identificacion</label>
                                <input className="form-control" placeholder="Your identificacion" type="number" required autoFocus onChange={e => setIdentificacion(e.target.value)} value={identificacion} />
                            </div>
                
                            <div className="mb-3">
                                <label className="form-label">password</label>
                                <input className="form-control" placeholder="Password" type="password" required onChange={e => setPassword(e.target.value)} value={password} />
                            </div>
                
                            <div className="mb-3">
                                <p className="small text-center text-muted">By signing up, you confirm that you’ve read and accepted our User Notice and Privacy Policy.</p>
                            </div>
               
                            <div className="mb-4">
                                <button type="submit" className="btn btn-dark w-100 "> Login </button>
                            </div>
               
                        </form>

                        <br />
                        <p className="text-center mb-2">not have an account? <a href="/register">create an account</a></p>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}
