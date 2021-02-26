const { response, request, query } = require('express');

const usuariosGet = ( req = request, res= response)=>{

    //Desestructuracion de los parametros opcionles del url 
    const { q='algun mensaje',page=0,apikey} = req.query;

    res.json({
        msg: 'get Api - controlador ',
        q,
        page,
        apikey
    })
}

const usuariosPut = ( req, res= response)=>{
    const id = req.params.id;
    res.json({
        msg: 'put Api - controlador ',
        id
    })
}

const usuariosPost = ( req, res= response)=>{
    const body = req.body;
    res.json({
        msg: 'post Api - controlador ',
        body
    })
}

const usuariosDelete = ( req, res= response)=>{
    res.json({
        msg: 'delete Api - controlador '
    })
}

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}