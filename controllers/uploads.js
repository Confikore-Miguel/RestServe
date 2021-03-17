const path = require('path');
const fs = require('fs');
var cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require('../helpers/subir-archivo');
const { Usuario,Producto } = require('../models');


const cargarArchivos= async( req, res )=>{  
    try {
        // Imagenes
        const nombre = await subirArchivo( req.files, undefined , 'imgs' );
        res.json({nombre})
    } catch (msg) {
        res.status(400).json({msg});
    }
} 

const actualizarImagen = async (req,res)=>{
    
    const {coleccion , id } = req.params;
    let modelo ;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if( !modelo ){
                res.status(400).json({
                    msg:`No existe un usuario con el id '${id}'`
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById( id );
            if( !modelo ){
                res.status(400).json({
                    msg:`No existe un producto con el id '${id}'`
                })
            }
        break;  
        default:
            return res.status(500).json({msg:'No se ha validado lo requirdo '})
    }

    //Limpiar imagenes previas 
    try {
        if( modelo.img ){
            const pathImagen = path.join(__dirname ,'../uploads',coleccion, modelo.img );
            if ( fs.existsSync( pathImagen)){
                fs.unlinkSync( pathImagen );
            }
        }

    } catch (error) {
            console.log( error );
    }


    const nombre = await subirArchivo( req.files, undefined , coleccion );
    modelo.img = nombre;

    await modelo.save();
    res.json({modelo})
}


const mostrarImagen= async( req, res ) =>{

    const {coleccion , id } = req.params;
    const pathNoFoundImage = path.join(__dirname,'../assets','no-image.jpg');
    let modelo ;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if( !modelo ){
                res.status(400).json({
                    msg:`No existe un usuario con el id '${id}'`
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById( id );
            if( !modelo ){
                res.status(400).json({
                    msg:`No existe un producto con el id '${id}'`
                })
            }
        break;  
        default:
            return res.status(500).json({msg:'No se ha validado lo requerido '})
    }

    //Limpiar imagenes previas 
        if( modelo.img ){
            const pathImagen = path.join(__dirname ,'../uploads',coleccion, modelo.img );
            if ( fs.existsSync( pathImagen)){
                return res.sendFile( pathImagen );
            }
        }
    
    res.sendFile( pathNoFoundImage )
} 

const actualizarImagenCloudinary = async (req,res)=>{
    
    const {coleccion , id } = req.params;
    let modelo ;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if( !modelo ){
                res.status(400).json({
                    msg:`No existe un usuario con el id '${id}'`
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById( id );
            if( !modelo ){
                res.status(400).json({
                    msg:`No existe un producto con el id '${id}'`
                })
            }
        break;  
        default:
            return res.status(500).json({msg:'No se ha validado lo requirdo '})
    }
    //Limpiar imagenes previas 
    if( modelo.img ){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[ nombreArr.length -1];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } =  await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url;
    await modelo.save();
    res.json({modelo})
}
module.exports = {
    actualizarImagenCloudinary,
    actualizarImagen,
    cargarArchivos,
    mostrarImagen,
}