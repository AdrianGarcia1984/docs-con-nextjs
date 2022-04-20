const borrarImgCrtl  = {};
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

//funcion que nos sirve para eliminar una imagen del back generado por cualquier controlador

borrarImgCrtl.deleteImg = async (nameImage) => {
    promisify(fs.unlink)(path.resolve(__dirname, "../storage/docs", nameImage));
};

module.exports= borrarImgCrtl 