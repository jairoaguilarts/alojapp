require('dotenv').config({ path: './configDB/credentials.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require('firebase/auth');
const { firebaseConfig, mongoUri } = require('./configDB/config');

const app = express();
const appFirebase = initializeApp(firebaseConfig);
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Schemas
const Usuario = require("./schemas/usuarios");
const Favorito = require("./schemas/favoritos");
const Propiedad = require("./schemas/propiedades");
const Detalles_Propiedad = require("./schemas/detalles_propiedad");

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log("Conectado a mongo")
})

app.post('/logIn', async (req, res) => {
  const { correo, contrasenia } = req.body;
  try {
    if (!correo.trim() || !contrasenia.trim()) {
      return res.status(400).json({ error: 'Error falta el Usuario o Contraseña ' });
    }
    const auth = getAuth();
    let firebaseUID = '';
    try {
      const userCredential = await signInWithEmailAndPassword(auth, correo, contrasenia);
      const user = userCredential.user;
      firebaseUID = user.uid;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return res.status(500).send({
        "msg": "Credenciales incorrectas"
      });
    }

    const usuario = await Usuario.findOne({ firebaseUID });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const contrasenia_adecuada = usuario.CompararContrasenia(contrasenia);
    if (!contrasenia_adecuada) {
      return res.status(404).json({ error: 'Contraseña Incorrecta' });
    }
    res.json({
      success: true,
      usuario: {
        nombre: usuario.nombre,
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        id: usuario._id,
        stripeCustomerId: usuario.stripeCustomerId,
        firebaseUID: usuario.firebaseUID
      }
    });
  } catch (error) {
    console.log('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

app.get('/logOut', (req, res) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      res.status(200).send({
        "msg": "Cierre de sesión exitoso"
      })
    })
    .catch((error) => {
      res.status(500).send({
        "msg": "Error al cerrar sesión"
      })
    });
});

app.post('/agregarUsuario', async (req, res) => {
  const { id, nombre, nombre_usuario, contrasenia, correo } = req.body;
  try {
    // Comprueba si ya existe un usuario con el mismo nombre de usuario
    const usuarioExistente = await Usuario.findOne({
      $or: [
        { nombre_usuario: nombre_usuario },
        { correo: correo }
      ]
    });
    if (usuarioExistente) {
      let errorMessage = '';
      if (usuarioExistente.nombre_usuario === nombre_usuario) {
        errorMessage = 'Ya existe un usuario con ese nombre de usuario';
      } else {
        errorMessage = 'Ya existe un usuario con ese correo electrónico, por favor Inicia Sesion';
      }
      return res.status(400).json({ error: errorMessage });
    }

    const nuevoUsuario = new Usuario({ id, nombre, nombre_usuario, contrasenia, correo });

    // Crea un nuevo cliente en Stripe
    const customer = await stripe.customers.create({ email: correo });
    nuevoUsuario.stripeCustomerId = customer.id;

    // Crea el usuario en firebase
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasenia);
      const user = userCredential.user;
      nuevoUsuario.firebaseUID = user.uid;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return res.status(500).send("El usuario no pudo ser creado en firebase");
    }

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
  const nuevoPropiedad = new Propiedad({
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
  const nuevoDetallesPropiedad = new Detalles_Propiedad({
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
  Favorito.find({uidUsuario: req.body.uidUsuario})
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
    uidUsuario: req.body.uidUsuario,
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

app.delete('/eliminarFavorito', (req, res) => {
  const { uidUsuario, idAlojamiento } = req.body;

  Favorito.deleteOne({ uidUsuario: uidUsuario, idAlojamiento: idAlojamiento })
    .then(result => {
      if (result.deletedCount === 0) {
        res.status(404).json({ message: 'Favorito no encontrado con el uidUsuario y idAlojamiento proporcionados' });
      } else {
        res.json({ message: 'Favorito eliminado con éxito' });
      }
    })
    .catch(error => {
      console.log('Error al eliminar favorito:', error);
      res.status(500).json({ error: 'Ocurrió un error al eliminar el favorito' });
    });
});

app.post('/addCard', async (req, res) => {
  const { firebaseUID } = req.body;
  const { card } = req.body;
  try {
    // Busca al usuario en la base de datos
    const user = await Usuario.findOne({ firebaseUID: firebaseUID });
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

app.get('/cards', async (req, res) => {
  const { firebaseUID } = req.body;
  try {
    // Busca al usuario en la base de datos
    const user = await Usuario.findOne({ firebaseUID: firebaseUID });
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

app.delete('/deleteCard/:firebaseUID/:cardId', async (req, res) => {
  const { firebaseUID, cardId } = req.params;

  try {
    // Busca al usuario en la base de datos
    const user = await Usuario.findOne({ firebaseUID: firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Elimina la tarjeta del cliente de Stripe
    const card = await stripe.customers.deleteSource(
      user.stripeCustomerId,
      cardId
    );
    res.json(card);
  } catch (error) {
    console.log('Error al eliminar tarjeta:', error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});