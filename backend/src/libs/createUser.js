const createUser = {}
const userModel = require('../models/usuario.model')
const auth = require('../helpers/Auth.helpers');


createUser.create = async (req,res) => {
    try {        
        const check = await userModel.findOne()
        if (check) {
            return
        }        
        //creando el usuario default administrador
        const nombre = "Admin"
        const identificacion = "800215546"
        const user = await userModel.find({ $or: [{ identificacion }, { nombre }] });
        console.log('user ', user.length)
        if (user.length!=0) {
            return
        }
        const apellido = "admin"
        const password = "admin"
        const roles = "admin"
        const newUser = new userModel({
            nombre,
            apellido,
            identificacion,
            roles,
            //encriptando la contraseña
            password: auth.encryptPassword(password),
        })    
        await newUser.save();
    } catch (error) {
        console.log(error)
    }
}

module.exports = createUser;