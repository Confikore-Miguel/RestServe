

const dbvalidators = require('./db-validators');
const generaraJWT = require('./generar-jwt');
const google = require('./google');
const subirArchivo = require('./subir-archivo');


module.exports={
    ...dbvalidators,
    ...generaraJWT,
    ...google,
    ...subirArchivo
}