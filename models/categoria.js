const { Schema, model } =require('mongoose');

const categoriaSchema = Schema({
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
    }
});

categoriaSchema.methods.toJSON = function() {
    const { __v,estado,...resto} = this.toObject();

    return resto;
}


module.exports= model('Categoria', categoriaSchema );