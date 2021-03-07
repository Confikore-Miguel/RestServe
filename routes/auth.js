const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validarCampos }= require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','El correo es oblogatorio').isEmail(),
    check('password','la constraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);

module.exports= router;