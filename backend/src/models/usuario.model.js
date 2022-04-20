const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    identificacion: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type:String,
        enum:[
            'admin',
            'usuario',
            'consulta'
        ]   
    }
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model('usuario', usuarioSchema)
