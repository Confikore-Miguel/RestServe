const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async( req = request, res= response)=>{

    //Desestructuracion de los parametros opcionles del url 
    const { limite = 5,desde =0 } = req.query;  
    const query = { estado: true} 
    //Promise all crea un array de promesas que se ejecutan al tiempo
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async ( req, res= response)=>{

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol } );

    //ENCRIPTAR LA CONTRASEÑA 
    const salt = bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync(password , salt);
    //GUARDAR DB
    await usuario.save();
    
    res.json({
        usuario
    })
}

const usuariosPut =  async( req, res)=>{
    const { id } = req.params;
    const { _id,password,google,correo, ...resto } = req.body;

    //TODO validar contra bases de datos
    if ( password ){
        //ENCRIPTAR LA CONTRASEÑA 
        const salt = bcryptjs.genSaltSync();
        resto.password= bcryptjs.hashSync(password , salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put Api - controlador ',
        usuario
    })
}

const usuariosDelete = async ( req= request, res= response)=>{
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id , {estado: false});

    res.json(usuario);

}

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}