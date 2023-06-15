const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Usuario = require("./schemas/usuarios");
const Favorito = require("./schemas/favoritos");

const MongoUri = "mongodb+srv://GrupoUX:ProyectoUX2023@cluster0.4nq8gyr.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MongoUri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log("Conectado a mongo")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Conexion establecida');
});

app.get('/usuarios', (req, res) => {
  Usuario.find({}, (error, usuarios) => {
    if (error) {
      console.log('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    } else {
      res.json(usuarios);
    }
  });
});

app.get('/favoritos', (req, res) => {
  Favorito.find({})
      .then(favoritos => {
          res.json(favoritos);
      })
      .catch(error => {
          console.log('Error al obtener favoritos:', error);
          res.status(500).json({ error: 'Error al obtener favoritos' });
      });
});

app.post('/agregarFavorito', (req, res) => {
  const nuevoFavorito = new Favorito({
      id: req.body.id,
      idUsuario: req.body.idUsuario,
      idAlojamiento: req.body.idAlojamiento
  });

  nuevoFavorito.save()
      .then(favorito => {
          res.json(favorito);
      })
      .catch(error => {
          res.status(500).send(error);
      });
});

app.delete('/eliminarFavorito/:id', (req, res) => {
  Favorito.deleteOne({ id: req.params.id })
        .then(result => {
            if(result.deletedCount === 0){
                res.status(404).json({ message: 'Favorito no encontrado con el id proporcionado' });
            } else {
                res.json({ message: 'Favorito eliminado con éxito' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'Ocurrió un error al eliminar el favorito' });
        });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
