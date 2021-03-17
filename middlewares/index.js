const  validarCampos  = require('../middlewares/validar-campos');
const  validarJWT     = require('../middlewares/validar-jwb');
const  permitirRol    = require('../middlewares/validar-roles');
const  validarArchivo    = require('../middlewares/validar-archivo');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarArchivo,
    ...permitirRol
}