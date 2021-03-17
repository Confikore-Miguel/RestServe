const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios= async ( termino='', res= response )=>{
    
    const esMongoDB = ObjectId.isValid( termino );
    
    if ( esMongoDB ){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] :[] 
        })
    }
    const regex = new RegExp(termino,'i');
    const usuarios =  await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    })

    res.json({
        results:usuarios
    })
}

const buscarCategorias= async ( termino='', res= response )=>{
    
    const esMongoDB = ObjectId.isValid( termino );
    
    if ( esMongoDB ){
        const categoria = await Categoria.findById(termino)
            .populate('usuario','nombre');

        return res.json({
            results: ( categoria)  ? [ categoria ] :[] 
        })
    }
    const regex = new RegExp(termino,'i');
    const categorias =  await Categoria.find({nombre:regex, estado:true})
            .populate('usuario','nombre');

    res.json({
        results:categorias
    })
}

const buscarProducto= async ( termino='', res= response )=>{
    
    const esMongoDB = ObjectId.isValid( termino );
    
    if ( esMongoDB ){
        const producto = await Producto.findById(termino)
            .populate('categoria','nombre');

        return res.json({
            results: ( producto)  ? [ producto ] :[] 
        })
    }
    const regex = new RegExp(termino,'i');
    const productos =  await Producto.find({nombre:regex, estado:true})
            .populate('categoria','nombre');

    res.json({
        results:productos
    })
}

const buscar = async ( req,res = response )=>{

    const {coleccion, termino } = req.params; 

    if( !coleccionesPermitidas.includes(coleccion)){
        return res.status(401).json({
            msg:`Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }
    switch (coleccion) {
        case 'usuarios' :
                buscarUsuarios(termino,res);
            break;
        case 'categorias':
                buscarCategorias(termino,res)
            break;
        case 'productos':
                buscarProducto(termino,res);
            break;
        default:
            res.status(500).json({
                mgs:'Tal vez se ha olvidado agregar la coleccion'
            })
    }
}


module.exports={
    buscar
}