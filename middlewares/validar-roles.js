const { response } = require('express');

const validarRoles = (req, res, next)=>{
    const { rol } = req.user; 

    console.log(req.user);
    if ( !req.user){
        return res.status(500).json({
            mgs:'Se quiere verificar el rol sin antes validar el token primero'
        })
    }
    
     if ( rol !== 'ADMIN_ROLE'){
         return res.status(401).json({
             msg:`El rol ${ rol } no tiene permitido realizar esta accion`
         })
     }

    next();
}

const permitirRol = ( ...role ) =>{
    return (req, res, next)=>{
        if ( !req.user){
            return res.status(500).json({
                mgs:'Se quiere verificar el rol sin antes validar el token primero'
            })
        }
        if ( !role.includes(req.user.rol)){
            return res.status(401).json({
                msg:`El rol no tiene permitido realizar esta accion`
            })
        }
        next();
    }
}

module.exports={
    validarRoles,
    permitirRol
}