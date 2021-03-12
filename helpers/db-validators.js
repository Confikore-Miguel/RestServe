const { Categoria,Usuario, Producto } = require('../models');
const Role = require('../models/role');

const esRolValido = async (rol='') =>{
    const existRol = await Role.findOne({rol});
    if( !existRol ){
        throw new Error(`El rol '${ rol }' no esta esta registrado en la base de datos `)
    }
}
    //VERIFICAR SI EL CORREO EXISTE
const existEmail = async( correo= '')=>{

    const exist = await Usuario.findOne({ correo });
        if ( exist ){
            throw new Error(`El correo '${ correo }' ya esta registrado `);
        } 
} 

const NoExistId = async( id='' )=>{

    const exist = await Usuario.findById(id);
        if ( !exist ){
            throw new Error(`No existe el ID: ${id}` );
        } 
} 
// Categoria
const NoExistIdCategoria = async( id ='' ) =>{
    const exist = await Categoria.findById(id);
        if( !exist ){
            throw new Error(`No existe el ID: ${id}`)
        }
}

// Producto 
const NoExisteProducto = async(id='')=>{

    const exist = await Producto.findById(id);
    if( !exist ){
        throw new Error(`No existe el ID: ${id}`)
    }
}   
module.exports= {
    esRolValido,
    existEmail,
    NoExistId,
    NoExistIdCategoria,
    NoExisteProducto
}