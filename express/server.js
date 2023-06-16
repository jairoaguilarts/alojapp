const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Usuario = require("./schemas/usuarios");
const Favorito = require("./schemas/favoritos");
const Propiedad = require("./schemas/propiedades");
const Detalles_Propiedad = require("./schemas/detalles_propiedad");
const detalles_propiedad = require('./schemas/detalles_propiedad');

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
app.post('/agregarUsuario', (req, res) => {
  const nuevoUsuario = new Usuario({
      id: req.body.id,
      nombre: req.body.nombre,
      contrasenia: req.body.contrasenia,
      correo: req.body.correo,
  });
  nuevoUsuario.save()
  .then(usuario => {
      res.json(usuario);
  })
  .catch(error => {
      res.status(500).send(error);
  });
});




app.get('/propiedades', (req, res) => {
  Propiedad.find({}, (error, propiedades) => {
    if (error) {
      console.log('Error al obtener propiedades:', error);
      res.status(500).json({ error: 'Error al obtener propiedades' });
    } else {
      res.json(propiedades);
    }
  });
});

app.post('/agregarPropiedades', (req, res) => {
  const nuevoPropiedad= new Propiedad({
      id_propiedad: req.body.id_propiedad,
      id_usuario: req.body.id_usuario,
      localizamiento: req.body.localizamiento,
      precio: req.body.precio,
      cuartos: req.body.cuartos,
      banios: req.body.banios,
  });
  nuevoPropiedad.save()
      .then(propiedad => {
          res.json(propiedad);
      })
      .catch(error => {
          res.status(500).send(error);
      });
});


app.get('/detalles_propiedad', (req, res) => {
  Detalles_Propiedad.find({}, (error, detalles_propiedad) => {
    if (error) {
      console.log('Error al obtener detalles de las propiedades:', error);
      res.status(500).json({ error: 'Error al obtener detalles de las propiedades' });
    } else {
      res.json(detalles_propiedad);
    }
  });
});


app.post('/agregarDetallesPropiedades', (req, res) => {
  const nuevoDetallesPropiedad= new Detalles_Propiedad({
      id_propiedad: req.body.id_propiedad,
      max_huespedes: req.body.max_huespedes,
      camas: req.body.camas,
      cocina: req.body.cocina,
      wifi: req.body.wifi,
      parqueo: req.body.parqueo,
  });
  nuevoDetallesPropiedad.save()
      .then(detalles_propiedades => {
          res.json(detalles_propiedades);
      })
      .catch(error => {
          res.status(500).send(error);
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
