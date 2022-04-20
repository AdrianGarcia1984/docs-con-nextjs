const jsw = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model')
//const roleModel = require('../models/role.model');
const verifyToken ={};
require('dotenv').config()



verifyToken.verify =  (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            ok: false,
            message: "not authorized one"
        })
    }
    const token = req.headers.authorization.split(" ")[1];
    if (token === null) {
        return res.status(401).json({
            ok: false,
            message: "not authorized two"
        })
    }
    jsw.verify(token, process.env.TOKENPS ,async (error, payload) => {
        //console.log(payload)
        //console.log(error)
        if (error) {
            return res.status(401).json({
                ok: false,
                message: "not authorized tree"
            })
        }
        const { _id } = payload;
        const usuario = await usuarioModel.findById({ _id })
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                message: "not authorized four"
                
            })
        }
        req.userid = payload._id;
      
        next();

    });
};

verifyToken.grupoUsuarios=async (req,res,next)=>{
    try {
        const usuario= await usuarioModel.findById (req.userid);
        console.log(usuario)
        // const roles= await roleModel.find({_id: {$in: usuario.roles}})
            // if  (roles[0].name === "admin"||roles[0].name === "THumano"){                
            //     next()
            //     return
            // }    
        // return res.status(403).json ({
        //     ok:false,
        //     message:'roles no admitidos, contacte al administrador del sistema'
        // })      
       
   } catch (error) {
       res.status(500).json({
           ok: false,
           message: error.message
       })
   }
}

// verifyToken.grupoClientes=async (req,res,next)=>{
//    try {
//       const usuario= await usuarioModel.findById (req.userid);
//       const roles= await roleModel.find({_id: {$in: usuario.roles}})      
//        if  (roles[0].name === "THumano"||roles[0].name === "admin"||roles[0].name ==='vendedor'){           
//            next()
//            return
//        }    
//     return res.status(403).json ({
//        ok:false,
//        message:'roles no admitidos, contacte al administrador del sistema'
//    })   
//    } catch (error) {
//        res.status(500).json({
//            ok: false,
//            message: error.message
//        })
//    }
// }

// verifyToken.grupoProductos=async (req,res,next)=>{
//     try {
//        const usuario= await usuarioModel.findById (req.userid);
//        //console.log(req.userid)
//        //console.log(usuario.roles)
//        const roles= await roleModel.find({_id: {$in: usuario.roles}}) 
//         if  (roles[0].name === "bodega" || roles[0].name === "admin"||roles[0].name === "vendedor"){            
//             next()
//             return
//         }     
//      return res.status(403).json ({
//         ok:false,
//         message:'roles no admitidos, contacte al administrador del sistema'
//     })   
//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             message: error.message
//         })
//     }
//  }

//  verifyToken.grupoPedidos=async (req,res,next)=>{
//     try {
//        const usuario= await usuarioModel.findById (req.userid);
//        //console.log(req.userid);
//        const roles= await roleModel.find({_id: {$in: usuario.roles}})      
//         if  (roles[0].name === "vendedor"||roles[0].name ==="admin"){            
//             next()
//             return
//         }     
//      return res.status(403).json ({
//         ok:false,
//         message:'roles no admitidos, contacte al administrador del sistema'
//     })   
//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             message: (error.message,'error desde grupo pedidos')
//         })
//     }
//  }

module.exports = verifyToken;