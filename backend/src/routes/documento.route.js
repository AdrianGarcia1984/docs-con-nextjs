const Router=require ('express');
const route=Router();
const documentoCtrl = require('../controllers/doc.controller');
const usuarioCtrl = require('../controllers/usuario.controller');
const verifyToken=require ('../midlewares/Token')
const upload = require('../midlewares/CargarArchivo')


//para pruebas

//  route.get('/', documentoCtrl.listarDoc);
//  route.post('/consultar/', documentoCtrl.consultar);
//  route.get('/listarid/:id', documentoCtrl.listarDocId);
//  route.post('/registrar', upload.single('img'),documentoCtrl.registrar);
//  route.delete('/borrar/:id', documentoCtrl.borrar);
//  route.put('/editar/:id', upload.single('img') , documentoCtrl.editar);

//con jwt y rol check
route.get('/', verifyToken.verify, documentoCtrl.listarDoc);
route.post('/consultar/', documentoCtrl.consultar);
route.get('/listarid/:id',verifyToken.verify, documentoCtrl.listarDocId);
route.post('/registrar', verifyToken.verify,upload.single('img'),documentoCtrl.registrar);
route.delete('/borrar/:id',documentoCtrl.borrar);
route.put('/editar/:id',verifyToken.verify,upload.single('img') , documentoCtrl.editar);



module.exports=route;