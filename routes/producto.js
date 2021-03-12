const { Router } = require('express');
const { check } = require('express-validator');

const { crearProducto, 
        getProductos, 
        getProducto, 
        putProductoActualizar, 
        deleteProducto 
    } = require('../controllers/productos.controller');

const { esRolValido,
        existEmail,
        NoExistId, 
        NoExistIdCategoria,
        NoExisteProducto
        } = require('../helpers/db-validators');

const { validarCampos,
        validarJWT,
        permitirRol, 
        validarRoles
        } = require('../middlewares')

const router = Router();


router.get('/',getProductos);

router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(NoExisteProducto),
    validarCampos
],getProducto);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom(NoExistIdCategoria),
    validarCampos
],crearProducto);

router.put('/:id',[
    validarJWT,
    validarRoles,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(NoExisteProducto),
    validarCampos
],putProductoActualizar);

router.delete('/:id',[
    validarJWT,
    validarRoles,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(NoExisteProducto),
    validarCampos
],deleteProducto);


module.exports = router;