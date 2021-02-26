const express = require('express');
var cors = require('cors')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT ;
        this.usuariosPath = '/api/usuarios';
        // middlewares
        this.middlewarea();
        //Rutas del app
        this.routes();
    }

    middlewarea(){
        //Cors
        this.app.use( cors() );
        //Parseo y lectura
        this.app.use( express.json() );
        //Direcctorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen(){
        this.app.listen( this.port ,() =>{
            console.log('LocalHost :', this.port);
        });
    }
}


module.exports= Server;
