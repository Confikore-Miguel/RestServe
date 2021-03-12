const { Schema, model } =require('mongoose');

const productoSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El rol es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default:true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    precio:{ 
        type: Number,
        default: 0
    },
    descripcion:{type: String},
    disponible:{
        type:Boolean,
        default: true
    }
});

productoSchema.methods.toJSON = function() {
    const { __v,estado,disponible,...resto} = this.toObject();

    return resto;
}


module.exports= model('Producto', productoSchema );