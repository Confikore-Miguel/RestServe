const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT ;
        this.usuariosPath = '/api/usuarios';
        //Conectar DB
        this.connectionDB();
        // middlewares
        this.middleware();
        //Rutas del app
        this.routes();
    }

    async connectionDB(){
        await dbConnection();
    }

    middleware(){
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
