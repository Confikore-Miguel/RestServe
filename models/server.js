const express = require('express');
var cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT ;
        this.paths= {
            auth      :'/api/auth',
            buscar    :'/api/buscar',
            categorias:'/api/categorias',
            productos :'/api/productos',
            usuarios  :'/api/usuarios',
            uploads   :'/api/uploads',
        }
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
        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true	
        }));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/producto'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen(){
        this.app.listen( this.port ,() =>{
            console.log('LocalHost :', this.port);
        });
    }
}


module.exports= Server;
