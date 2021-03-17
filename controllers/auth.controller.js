const { response } = require('express');
const bcrytjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google');

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

const googleSingin= async(req, res= response) =>{

    const { id_token }= req.body;
    
    try {
        
        const {email:correo,name:nombre,picture:img} = await googleVerify( id_token );
        let usuario = await Usuario.findOne({correo});
         
        if ( !usuario){
            const data ={
                nombre,
                correo,
                password:':p',
                img,
                google: true
            };
            usuario = new Usuario( data ); 
            await usuario.save();
        }
        // estado false 
        if (!usuario.estado){
            return res.status(401).json({
                msd:'Usuario Bloqueado'
            })
        }
        //Generar token
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(401).json({
            msg:'Token de google no es valido'
        })
    }

}


module.exports= {
    login,
    googleSingin
};