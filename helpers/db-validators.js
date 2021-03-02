const Role = require('../models/role');
const Usuario = require('../models/usuario');

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

module.exports= {
    esRolValido,
    existEmail,
    NoExistId
}