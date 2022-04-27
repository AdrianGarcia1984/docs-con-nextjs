import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { login: false, token: "", nombre: "", apellido: "", id: "",identificacion:'', roles:'' };

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.login = action.payload.login
            state.id = action.payload.id
            state.nombre = action.payload.nombre
            state.apellido = action.payload.apellido
            state.identificacion = action.payload.identificacion
            state.roles = action.payload.roles
            state.token = action.payload.token
            localStorage.setItem('usuario', JSON.stringify(state));
        },
        getUsers: (state, action) => {
            state.login = action.payload.login
            state.id = action.payload.id
            state.nombre = action.payload.nombre
            state.apellido = action.payload.apellido
            state.identificacion = action.payload.identificacion
            state.roles = action.payload.roles
            state.token = action.payload.token
        },
        deleteUsers: (state) => {
            state = initialState
            localStorage.removeItem('usuario');
        }
    }

})

export const { setUsers, getUsers, deleteUsers } = userSlice.actions

export default userSlice.reducer

export const getUser = () => {
    return async (dispatch) => {
        try {
            const usuario = JSON.parse(localStorage.getItem('usuario'))
            dispatch(getUsers(usuario))
        } catch (error) {
            console.log('error en getUser, desde redux', error);
        }
    }
}

export const logUser = (valores) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post("api/usuario/login", valores);
            console.log('data desde redux', data)
            dispatch(setUsers(data))
        } catch (error) {
            console.log('error en loginUser, desde redux', error);
        }
    }
}

export const deleteUser = () => {
    return async (dispatch) => {
        try {
           dispatch(deleteUsers())
           console.log('delete user')
        } catch (error) {
            console.log('error en deleteUser, desde redux', error);
        }
    }
}