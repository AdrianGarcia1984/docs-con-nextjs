const mensaje = {}

mensaje.mensajeGeneral = (res, statusCode, status, data, message) => {
    res.status(statusCode).json({
        ok: status,
        data,
        message
    })
}

module.exports = mensaje;