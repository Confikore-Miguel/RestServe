const { response, request }= require('express');
const { Categoria } = require('../models');
 

    //obtenerCategorias - paginado - total - populate
const getCategorias = async ( req, res = response )=>{

    const { limite = 5,desde =0 } = req.query;  
    const query = { estado: true} ;

    const [ total,categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario',['nombre','rol'])
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    })
}    
    //ObtenerCaterigoria - populate {}
const getCategoria = async( req= request, res = response )=>{
    const { id } = req.params;

    const {estado,nombre,_id,usuario} = await Categoria.findById(id)
        .populate('usuario',['nombre','rol']);
                    
    if( !estado ){
        return res.status(401).json({
            msg:'No se encontro dicha categoria'
        })
    }
    res.json({
        nombre,
        _id,
        usuario
    })
}

const crearCategoria=  async( req= request , res = response )=>{
   
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if( categoriaDB ){
        return res.status(401).json({
            msg:`La categoria ${ categoriaDB.nombre }, ya existe`
        }) 
    }
    // Generar la data a guardar 
    const data = {
        nombre,
        usuario:req.user._id
    } 

    const categoria = new Categoria( data );

    await categoria.save();
    res.status(200).json(categoria)
}
    // actualizarCategoria
const actualizarCategoria = async ( req=request, res=response )=>{
    const { id } = req.params;
    const {estado, usuario , ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.user._id;

    const categoria = await Categoria.findByIdAndUpdate(id,data, { new: true });

    res.json({categoria})
}
    // borrarCategoria - estado:false  
const borrarCategoria = async( req, res ) =>{
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new: true});

    res.json(categoria)
}



module.exports ={
    crearCategoria,
    getCategorias,
    getCategoria,
    actualizarCategoria,
    borrarCategoria
};