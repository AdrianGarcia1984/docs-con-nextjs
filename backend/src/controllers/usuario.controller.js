const usuarioCtrl = {};
const usuarioModel = require('../models/usuario.model');
const auth = require('../helpers/Auth.helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { mensajeGeneral } = require('../helpers/mensajeGeneral')
const capitalizar = require('../helpers/CapitalizarLetra')
const { serialize } = require('cookie')
require('dotenv').config()


//listar usuarios
usuarioCtrl.listarUsuario = async (req, res) => {
    try {
        const usuarios = await usuarioModel.find({}, { password: 0 })//.populate("roles");
        mensajeGeneral(res, 200, true, usuarios, "")
    } catch (error) {
        mensajeGeneral(res, 500, false, "", error.message)
    }
}

//Listar usuario por id
usuarioCtrl.listarUsuarioId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioModel.findById({ _id: id }, { password: 0 })//.populate("roles");        
        if (!usuario) {
            mensajeGeneral(res, 404, false, "", 'el usuario no existe')
        }
        mensajeGeneral(res, 200, true, usuario, "")
    } catch (error) {
        mensajeGeneral(res, 500, false, "", error.message)
    }
}

//creando un usuario
usuarioCtrl.registrarUsuario = async (req, res) => {
    try {
        const { nombre, apellido, identificacion, password, roles } = req.body;
        const usuario = await usuarioModel.find({ identificacion });
        if (!usuario) {
            mensajeGeneral(res, 404, false, "", 'el usuario ya existente')
        }
        const Nombre = capitalizar.primeraLetra(nombre)
        const Apellido = capitalizar.primeraLetra(apellido)
        console.log(Nombre, Apellido)
        //creando el usuario en mongo
        const nuevoUsuario = new usuarioModel({
            nombre: Nombre,
            apellido: Apellido,
            identificacion,
            //encriptando la password
            password: auth.encryptPassword(password),
            roles,
        })
        //check roles
        // if (roles) {
        //     const foundRole = await roleModel.find({ name: { $in: roles } })
        //     nuevoUsuario.roles = foundRole.map(role=>role);
        // } else {
        //     const role = await roleModel.findOne({ name: "admin" })
        //     nuevoUsuario.roles = role;
        // };
        //guardando usuario en la BD
        await nuevoUsuario.save();
        //respondiendo al frontend
        res.status(201).json({
            ok: true,
            message: 'bienvenido',
            nombre: nuevoUsuario.nombre,
            apellido: nuevoUsuario.apellido,
            _id: nuevoUsuario._id,
            identificacion: nuevoUsuario.identificacion,
            //creando el token
            token: jwt.sign({ _id: nuevoUsuario._id, identificacion: nuevoUsuario.identificacion }, process.env.TOKENPS),
            roles: nuevoUsuario.roles
        })

    } catch (error) {
        mensajeGeneral(res, 500, false, "", error.message)
    }
};

//login de usuario 
usuarioCtrl.login = async (req, res) => {
    try {
        const { identificacion, password } = req.body;
        //verificando si existe el usuario por identificacion 
        const usuario = await usuarioModel.findOne({ identificacion: identificacion })//.populate("roles",{ _id: 0 });
        //console.log(user)
        if (!usuario) {
            return mensajeGeneral(res, 400, false, "", 'identificacion o password incorrecta')
        }
        //verificando la password encriptada
        const resp = bcrypt.compareSync(password, usuario.password);

        if (resp) {
            const token = jwt.sign({ _id: usuario._id, name: usuario.nombre }, process.env.TOKENPS, { expiresIn: 3000 })
            const serialised = serialize('miCookie', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            });
            //console.log('serialized ',serialised)
            res.cookie('Set-Cookie', serialised)
            
            //res.cookie('token', token, { httpOnly: true });
            //console.log(res)
            return res.status(200).json({
                ok: true,
                mensaje: 'bienvenido',
                _id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                //password: usuario.password,
                roles: usuario.roles,
                token: token// jwt.sign({ _id: usuario._id, name: usuario.nombre }, process.env.TOKENPS, { expiresIn: 300 }),
            })
        }
        mensajeGeneral(res, 400, false, "", 'error en login de usuario');
    } catch (error) {
        mensajeGeneral(res, 500, false, "", error.message)
    }
}

//borrar usuario 

usuarioCtrl.borrarUsuario = async (req, res) => {
    {
        try {
            //capturando los datos del frontend            
            const { id } = req.params;
            console.log(id)
            //verificando si existe el usuario
            const usuario = await usuarioModel.findById({ _id: id });
            if (!usuario) {
                return mensajeGeneral(res, 404, false, "", 'el usuario no existente');
            }
            // if (usuario.nameImg) {
            //     deleteImg(usuario.nameImg);
            // }            
            //borrando usuario en la BD
            await usuario.deleteOne(); //antes de esta parte se ejecuta un pre en userSchema que borra todos los productos registrados por este usuario            
            //respondiendo al frontend
            mensajeGeneral(res, 200, true, "", 'usuario eliminado')
        } catch (error) {
            mensajeGeneral(res, 500, false, "", error.message)
        }
    };
}

//actualizar usuario
usuarioCtrl.actualizar = async (req, res) => {
    console.log(req.body)
    try {
        const { id } = req.params
        const usuario = await usuarioModel.findById({ _id: id });
        if (!usuario) {
            return mensajeGeneral(res, 404, false, "", 'el usuario no existente');
        }
        const Nombre = capitalizar.primeraLetra(req.body.nombre)
        const Apellido = capitalizar.primeraLetra(req.body.apellido)

        const nombre = Nombre || usuario.nombre
        const apellido = Apellido || usuario.apellido
        const identificacion = req.body.identificacion || usuario.identificacion
        const roles = req.body.roles || usuario.roles

        const userUpdate = {
            nombre,
            apellido,
            identificacion,
            roles,
        }
        if (req.body.password) {
            userUpdate.password = auth.encryptPassword(req.body.password)
        }
        console.log(userUpdate)
        await usuario.updateOne(userUpdate);
        mensajeGeneral(res, 200, true, userUpdate, '');
    } catch (error) {
        mensajeGeneral(res, 500, false, "", error.message)

    }
}

// Object.defineProperty(String.prototype, 'capitalizarPrimeraLetra', {
//     value: function () {
//         return this.charAt(0).toUpperCase() + this.slice(1);
//     },
//     writable: true, // Asi, puede sobreescribirse más tarde
//     configurable: true // Asi, puede borrarse más tarde
// });

module.exports = usuarioCtrl;