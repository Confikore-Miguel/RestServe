const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido,existEmail,NoExistId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost, 
        usuariosDelete} = require('../controllers/usuarios.controller');

router.get('/', usuariosGet  );

router.post('/',[
    // check prepara los errores u los guarda en la request 
    //isEmpty es vacio   isIn existir en 
    check('nombre','El nombre es obligatorio' ).not().isEmpty(),
    check('password','Debe tener mas de 6 letras').isLength({ min:6 }),
    check('correo','El correo no es valido').isEmail(),
    check('correo',).custom((correo)=> existEmail(correo)),
    // check('rol','El rol no es valido').isIn(['ADMIN_ROLE',['USER_ROLE']]),
    check('rol').custom(esRolValido),
    validarCampos
] ,usuariosPost );

router.put('/:id',[
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(NoExistId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut );

router.delete('/:id',[
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(NoExistId),
    validarCampos
], usuariosDelete );

module.exports= router;