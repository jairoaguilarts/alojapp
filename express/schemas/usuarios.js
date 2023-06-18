const mongoose = require('mongoose');
const UsuariosSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    nombre_usuario:{
        type: String,
        required: true,
        unique: true,
    },
    correo:{
        type: String,
        required: true,
        unique: true,
    },
    contrasenia:{
        type: String,
        required: true,
    },
    imagen: Buffer, 
    stripeCustomerId: String  // ID del cliente de Stripe
});     



const usuario = mongoose.model('usuario', UsuariosSchema);
module.exports = usuario;
