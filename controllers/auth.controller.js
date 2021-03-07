const { response } = require('express');
const bcrytjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res= response)=>{

    const { correo, password }= req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if( !usuario ){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos'
            })
        }
        // si esta activo 
        if( !usuario.estado ){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos - estado: false'
            })
        }
        //Verificar la constraseña
        const validPassword= bcrytjs.compareSync(password, usuario.password);
        if (!validPassword ){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos - estado: false'
            })
        }
        //Generar el JSON WEB TOKEN JWT
        const token = await generarJWT( usuario.id);


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}


module.exports= {
    login
};