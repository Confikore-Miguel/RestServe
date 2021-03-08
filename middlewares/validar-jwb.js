const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req= request, res = response, next)=>{

    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }
    try {
        const {uid}= jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        //leer usuario que corresponde al uid
        const user = await Usuario.findById(uid)
        if( !user){
            return res.status(401).json({
                msg:'Token no válido - no existe usuario'
            })
        }
        if ( !user.estado ){
            return res.status(401).json({
                msd:'Token no valido - estado: false'
            })
        }
      
        req.user= user;

        next();
    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }
}


module.exports = {
    validarJWT
}