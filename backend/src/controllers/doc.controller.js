documentoCtrl = {};
const documentModel = require('../models/documento.model')
const { mensajeGeneral } = require('../helpers/mensajeGeneral')
const { deleteImg } = require('../helpers/borrarImgCrtl ')

documentoCtrl.listarDoc = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
            || 10;
        const page = parseInt(req.query.page) || 1;

        const options = {
            limit,
            page,
            //  populate:[
            //     {
            //         path:"roles",
            //         path: "user", select: "name"
            //     }
            // ],
        };
        const documentos = await documentModel.paginate({}, options)
        mensajeGeneral(res, 200, true, documentos, "")
    } catch (error) {
        mensajeGeneral(res, 500, false, "", error.message)
    }
}

documentoCtrl.listarDocId = async (req, res) => {

    try {
        console.log(req.params)
        const { id } = req.params;
        const documento = await documentModel.findById({ _id: id });
        console.log(documento.length)
        if (!documento) {
            mensajeGeneral(res, 404, false, "", 'el documento no existe')
        }
        mensajeGeneral(res, 200, true, documento, "")
    } catch (error) {
        mensajeGeneral(res, 500, false, "", error.message)
    }
}


documentoCtrl.consultar = async (req, res) => {
    console.log('desde consultar', req.body)
    try {
        const { oficio, fecha } = req.body;
        const Oficio=oficio.toUpperCase()
        const documento = await documentModel.find({ $and: [{ oficio:Oficio }, { fecha } ]});
        console.log(documento.length)
        if (documento.length === 0) {
            mensajeGeneral(res, 404, false, "", 'el documento no existe')
        } else {
            mensajeGeneral(res, 200, true, documento, "")
        }
    } catch (error) {
        mensajeGeneral(res, 500, false, "", error.message)
    }
}


documentoCtrl.registrar = async (req, res) => {
    try {
        const { oficio, fecha, asunto, usuario } = req.body;
        //controlamos mayusculas y minusculas en el guardado
        const Oficio=oficio.toUpperCase()
        const Asunto = asunto.toLowerCase()
        console.log(Oficio)
        const documento = await documentModel.find({ oficio: Oficio });
        console.log(documento.length)
        if (documento.length === 0) {
            const NuevoDoc = new documentModel({
                oficio:Oficio, fecha, asunto:Asunto, usuario
            });
            if (req.file) {
                const { filename } = req.file;
                NuevoDoc.setimgUrl(filename);
            }
            await NuevoDoc.save();
            mensajeGeneral(res, 200, true, NuevoDoc, "nuevo documento guardado")
        } else {
            if (req.file) {
                deleteImg(req.file.filename);
            }
            mensajeGeneral(res, 500, false, "", "el documento ya existe en la base de datos")
        }
    } catch (error) {
        if (req.file) {
            deleteImg(req.file.filename);
        }
        mensajeGeneral(res, 500, false, "", error.message)
    }
}

documentoCtrl.editar = async (req, res) => {
    try {
        const { id } = req.params;
        const documento = await documentModel.findById({ _id: id });
        if (!documento) {
            mensajeGeneral(res, 500, false, "", 'el documento no existe')
        }
        if (req.file) {
            if (documento.nombreDocs) {
                deleteImg(documento.nombreDocs);
            }
            const { filename } = req.file;
            documento.setimgUrl(filename);
            await documento.save();
        }
        const oficio = req.body.oficio || documento.oficio;
        const fecha = req.body.fecha || documento.fecha;
        const asunto = req.body.asunto || documento.asunto;
        const Oficio=oficio.toUpperCase()
        const Asunto = asunto.toLowerCase()


        const nuevoDocumento = { oficio:Oficio, fecha, asunto: Asunto}
        await documento.updateOne(nuevoDocumento)
        mensajeGeneral(res, 200, true, "", "documento actualizado correctamente")
    } catch (error) {
        if (req.file) {
            deleteImg(req.file.filename);
        }
        mensajeGeneral(res, 500, false, "", error.message)
    }
}

documentoCtrl.borrar = async (req, res) => {
    const { id } = req.params;
    try {
        const documento = await documentModel.findById({ _id: id });
        if (!documento) {
            mensajeGeneral(res, 500, false, "", 'el documento no existe')
        }

        if (documento.nombreDocs) {
            deleteImg(documento.nombreDocs);
        }
        await documento.deleteOne();
        mensajeGeneral(res, 200, true, "", "documento eliminado correctamente");

    } catch (error) {
        mensajeGeneral(res, 500, false, "", error.message)
    }
}

module.exports = documentoCtrl