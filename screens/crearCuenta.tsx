import React, { useState } from 'react';
import { View, Text, Alert, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

type RootStackParamList = {
  Inicio: undefined;
  InicioSesion: undefined;
  CrearCuenta: undefined;
  HomePage: undefined;
  HomeScreen: undefined;
  // Agrega otras rutas aquí si es necesario
};

type CrearProps = {
  navigation: NavigationProp<RootStackParamList, 'CrearCuenta'>;
};


const CrearCuenta: React.FC<CrearProps> = ({ navigation }) => {

  const [paso, setPaso] = useState(1);
  const [correo, setCorreo] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');

  const continuarPaso1 = () => {
    if ((contrasena != '' && confirmarContrasena != '') && contrasena === confirmarContrasena) {
      setPaso(2);
    }
  };

  const continuarPaso2 = () => {
    if (nombreCompleto != '') {
      try {
        // Datos del usuario
        const userData = {
          nombre: nombreCompleto,
          nombre_usuario: nombreUsuario,
          correo: correo,
          contrasenia: contrasena,
          fecha_nacimiento: fechaNacimiento,
          numero_telefono: numeroTelefono
        };

        // Realizar la petición POST
        fetch('http://10.0.2.2:3000/agregarUsuario', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
          })
          .then(data => {
            Toast.show({
              type: 'success',
              text1: '¡Éxito!',
              text2: 'Usuario creado correctamente.'
            });
            navigation.navigate('InicioSesion');
          })
          .catch((error) => {
            if (error.message.includes('400')) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'El usuario ya existe.',
              });
            } else if (error.message.includes('500')) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error del servidor.',
              });
            } else {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `Un error inesperado ocurrió: ${error.message}`,
              });
            }
          });

      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Registro fallido',
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageContent}>
        {paso === 1 && (
          <>
            <View>
              <TouchableOpacity onPress={() => { }} style={{ position: 'absolute', top: 10, left: 10 }}></TouchableOpacity>
            </View>

            <View style={styles.block}>
              <Text style={styles.heading}>Crear cuenta</Text>
              <Text style={styles.heading}>Paso 1 de 2</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  placeholderTextColor="#fff"
                  value={correo}
                  onChangeText={setCorreo}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  secureTextEntry
                  placeholderTextColor="#fff"
                  value={contrasena}
                  onChangeText={setContrasena}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirma tu contraseña"
                  placeholderTextColor="#fff"
                  secureTextEntry
                  value={confirmarContrasena}
                  onChangeText={setConfirmarContrasena}
                />
              </View>

              <View>
                <TouchableOpacity onPress={continuarPaso1} style={styles.button}>
                  <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.forgotPasswordLink}>
                <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('InicioSesion')}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {paso === 2 && (
          <>
            <View>
              <TouchableOpacity onPress={() => { }} style={{ position: 'absolute', top: 10, left: 10 }}></TouchableOpacity>
            </View>

            <View style={styles.block}>
              <Text style={styles.heading}>Crear cuenta</Text>
              <Text style={styles.heading}>Paso 2 de 2</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre completo"
                  placeholderTextColor="#fff"
                  value={nombreCompleto}
                  onChangeText={setNombreCompleto}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre usuario"
                  placeholderTextColor="#fff"
                  value={nombreUsuario}
                  onChangeText={setNombreUsuario}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Fecha de nacimiento (opcional)"
                  secureTextEntry
                  placeholderTextColor="#fff"
                  value={fechaNacimiento}
                  onChangeText={setFechaNacimiento}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Numero de telefono (opcional)"
                  placeholderTextColor="#fff"
                  secureTextEntry
                  value={numeroTelefono}
                  onChangeText={setNumeroTelefono}
                />
              </View>

              <View>
                <TouchableOpacity onPress={continuarPaso2} style={styles.button}>
                  <Text style={styles.buttonText}>Crear Cuenta</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.forgotPasswordLink} onPress={() => navigation.navigate('InicioSesion')}>
                <Text style={styles.forgotPasswordText}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181c2c',
    color: '#eaeaf2',
    textAlign: 'center',

  },

  lightText: {
    fontSize: 18,
    fontWeight: '200',
    color: '#fff',
  },
  leftText: {
    textAlign: 'left',
    fontSize: 18,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoFallback: {
    width: 200,
    height: 100,
    backgroundColor: '#ccc',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 32,
  },
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    width: '80%',
    height: '90%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#fff',
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    color: '#fff',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',

  },
  createAccountLink: {
    alignSelf: 'center',
    marginTop: 10,
  },
  createAccountText: {
    textDecorationLine: 'underline',
    color: '#fff',
  },
  methodText: {
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },

});

export default CrearCuenta;
