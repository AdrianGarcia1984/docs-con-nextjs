const bcrypt = require('bcrypt');
const auth = {};


auth.encryptPassword = (password) => {
    try {
        //salt sirve para mirar cuantos saltos va a dar, hay que tener en cuenta la maquina en la cual se va  a desplegar, normal 10
        const salt = bcrypt.genSaltSync(10);
        //en el hash nos guardara la contraseña encriptada
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}



module.exports = auth;