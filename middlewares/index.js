const  validarCampos  = require('../middlewares/validar-campos');
const  validarJWT     = require('../middlewares/validar-jwb');
const  permitirRol    = require('../middlewares/validar-roles');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...permitirRol
}