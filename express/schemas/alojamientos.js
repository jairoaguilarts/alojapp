const mongoose = require('mongoose');
const AlojamientosSchema = new mongoose.Schema({
    idAlojamiento: String,
    nombre: String,
    ubicacion: String,
    precio: String,
    personas: String,
    imgSrc: String,
    fechaEntrada: String,
    fechaSalida: String,
    estrellas: String,
    resenas: String,
    tipo: String,
});

const alojamientos = mongoose.model('alojamientos', AlojamientosSchema)
module.exports = alojamientos;