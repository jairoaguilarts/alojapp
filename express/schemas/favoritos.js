const mongoose = require('mongoose');
const FavoritosSchema = new mongoose.Schema({
    id:String,
    idUsuario: String,
    idAlojamiento: String
})

const favorito = mongoose.model('favorito', FavoritosSchema)
module.exports = favorito;