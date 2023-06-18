const mongoose = require('mongoose');
const UsuariosSchema = new mongoose.Schema({
    nombre: String,
    nombre_usuario: String,
    contrasenia: String,
    stripeCustomerId: String,  // ID del cliente de Stripe
});

const usuario = mongoose.model('usuario', UsuariosSchema);
module.exports = usuario;
