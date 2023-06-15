const mongoose = require('mongoose');
const UsuariosSchema = new mongoose.Schema({
    id:String,
    nombre: String,
    nombre_usuario: String,
    contrasenia: String,
})

const usuario = mongoose.model('usuario', UsuariosSchema)
module.exports = usuario;