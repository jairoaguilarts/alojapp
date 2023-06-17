const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51NJS8vHe3t6WjAoJtlqFxm85wkNciUnjj9qHGSrhS6XbXpZ3gw1rQ4tkhCC0661pZhF9Clz46rroAWCF4b1xSqHg00RnEKefvP');

const Usuario = require("./schemas/usuarios");
const Favorito = require("./schemas/favoritos");
const Propiedad = require("./schemas/propiedades");
const Detalles_Propiedad = require("./schemas/detalles_propiedad");

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

app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find({});
    res.json(usuarios);
  } catch (error) {
    console.log('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

app.post('/agregarUsuario', async (req, res) => {
  const { id, nombre, nombre_usuario, contrasenia, correo } = req.body;
  try {
    // Comprueba si ya existe un usuario con el mismo nombre de usuario
    const usuarioExistente = await Usuario.findOne({ nombre_usuario: nombre_usuario });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese nombre de usuario' });
    }

    const nuevoUsuario = new Usuario({ id, nombre, nombre_usuario, contrasenia, correo });
    // Crea un nuevo cliente en Stripe
    const customer = await stripe.customers.create({ email: correo });
    nuevoUsuario.stripeCustomerId = customer.id;
    await nuevoUsuario.save();
    res.json(nuevoUsuario);
  } catch (error) {
    console.log('Error al agregar usuario:', error);
    res.status(500).send({ error: error.message });
  }
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

app.post('/card/:username', async (req, res) => {
  const { username } = req.params;
  const { card } = req.body;
  try {
      // Busca al usuario en la base de datos
      const user = await Usuario.findOne({ nombre_usuario: username });
      if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      // Añade la tarjeta al cliente de Stripe
      const source = await stripe.customers.createSource(user.stripeCustomerId, { source: card });
      res.json(source);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get('/cards/:username', async (req, res) => {
  const { username } = req.params;
  try {
      // Busca al usuario en la base de datos
      const user = await Usuario.findOne({ nombre_usuario: username });
      if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      // Obtiene las tarjetas del cliente de Stripe
      const cards = await stripe.customers.listSources(user.stripeCustomerId, { object: 'card', limit: 3 });
      res.json(cards);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});