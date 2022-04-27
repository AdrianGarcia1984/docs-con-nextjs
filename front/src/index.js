import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import 'rc-pagination/assets/index.css';
import axios from 'axios';

axios.defaults.baseURL="http://localhost:3001/"
//axios.defaults.baseURL=" https://backend-adr.herokuapp.com/"


ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);


