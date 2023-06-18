const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

UsuariosSchema.methods.CompararContrasenia = async function (contrasenia) {
    const resultado = await bcrypt.compareSync(contrasenia, this.contrasenia);
    return resultado;
}

const usuario = mongoose.model('usuario', UsuariosSchema);
module.exports = usuario;
