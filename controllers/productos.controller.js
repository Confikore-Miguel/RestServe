
const { request, response } = require('express');
const { Producto } = require('../models');


const getProductos = async( req= request, res = response) =>{

    const { limit=5, desde =0} = req.query;
    const query = { estado: true }

    const [ total , productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario','nombre')
            .limit(Number(limit))
            .skip(Number(desde))
    ])
    res.json({
        total,
        productos
    })
}

const getProducto = async( req, res ) =>{

    const { id }= req.params;

    const producto = await Producto.findById(id)
        .populate('usuario','nombre');

    res.json({
        producto
    })
}

const crearProducto = async ( req= request, res ) =>{

    const { estado, usuario, ...body } = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre.toUpperCase()});

    if( productoDB ){
        return res.status(401).json({
            msg:`El producto '${ body.nombre }' ya existe`
        })
    }

    const data = {
        ...body,
        nombre : body.nombre.toUpperCase(),
        usuario : req.user._id
    }

    const producto = new Producto(data);

    producto.save();

    res.json({producto});
}

const putProductoActualizar = async ( req, res ) =>{
    const { id } = req.params;
    const { estado, usuario,...data  } = req.body;

    if ( data.nombre ){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.user._id;

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true})

    res.json({producto});
}
const deleteProducto = async ( req, res ) =>{
    
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id,{estado: false },{new: true}); 

    res.json({producto})
}


module.exports = {
    crearProducto,
    deleteProducto,
    getProducto,
    getProductos,
    putProductoActualizar
}