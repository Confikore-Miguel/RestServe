const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( file,extencionesPermitidas=['png','jpg','jpeg','gif'],caperta='' )=>{

    return new Promise ((resolve, reject )=>{

        const { archivo } = file;
        const nombreCortado = archivo.name.split('.');
        const extencion = nombreCortado[nombreCortado.length -1];
    
        //Validar extencion 
        if(!extencionesPermitidas.includes(extencion)){
            return reject (`La extencion '${extencion}' no es permitida, solo se admite: ${extencionesPermitidas}`)
        }
        const nombreTemp = uuidv4()+'.'+extencion;

        const uploadPath = path.join( __dirname,'../uploads/',caperta, nombreTemp);
    
        archivo.mv(uploadPath, (err) =>{
        if (err) {
            reject(err);
        }
        resolve  ( nombreTemp)
        });
    });
}
module.exports= {
    subirArchivo
}