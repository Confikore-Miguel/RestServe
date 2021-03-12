const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, 
        getCategorias, 
        getCategoria, 
        actualizarCategoria, 
        borrarCategoria 
        } = require('../controllers/categorias.controller');
const { NoExistIdCategoria } = require('../helpers/db-validators');


const { validarCampos,validarJWT, validarRoles } = require('../middlewares')
    
const router = Router();

/**
 * {{url}}/api/categorias
 */

// todas las categorias - publico
router.get('/',getCategorias);

//Obtener una categoria - publico
router.get('/:id',[
    check('id','El id no es valido').isMongoId(),
    check('id').custom(NoExistIdCategoria),
    validarCampos
],getCategoria);

//Crear categoria - privado - cualquier personas con token valido 
router.post('/',[ 
    validarJWT,
    check('nombre','EL nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar por id - privado - con token valido
router.put('/:id',[
    validarJWT,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(NoExistIdCategoria),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria);

//delete categoria - Admin 
router.delete('/:id',[
    validarJWT,
    validarRoles,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(NoExistIdCategoria),
    validarCampos
],borrarCategoria);

module.exports = router;
