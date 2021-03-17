const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivo } = require('../middlewares');
const { coleccionesPermitidas }= require('../helpers')
const { cargarArchivos, actualizarImagen,mostrarImagen,actualizarImagenCloudinary } = require('../controllers/uploads');


const router = Router();

router.get('/:coleccion/:id',[
    check('id','No es un id valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas( c,['usuarios','productos'] )),
    validarCampos
], mostrarImagen)


// subir imagenes 
router.post('/',[
    validarArchivo,
    validarCampos
],cargarArchivos);

// ruta para actualizar imagenes 
router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','No es un id valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas( c,['usuarios','productos'] )),
    validarCampos
],actualizarImagenCloudinary);


module.exports= router;