import React, { useState } from 'react';
import { View, Alert, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { set } from 'mongoose';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

type RootStackParamList = {
  Inicio: undefined;
  InicioSesion: undefined;
  CrearCuenta: undefined;
  HomePage: { firebaseUID: string } | undefined;
  // Agrega otras rutas aquí si es necesario
};

type InicioProps = {
  navigation: NavigationProp<RootStackParamList, 'InicioSesion'>;
};

const InicioSesion: React.FC<InicioProps> = ({ navigation }) => {
  const logoImage = require('alojapp/Images/Alojapplogo.png');

  const [user, setNombre_usuario] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [contrasenia, setContrasenia] = useState<string>('');
  const [correo_electronico, setCorreo_electronico] = useState<string>('');
  const [usuario, setUsuario] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleUsuarioCambio = (text: string) => {
    setNombre_usuario(text);
  };

  const handleContraseniaCambio = (text: string) => {
    setContrasenia(text);
  };

  const handleInciarSession = async () => {
    setLoading(true);
    try {
      // Datos de inicio de sesión del usuario
      const userData = {
        correo: user,
        contrasenia: contrasenia,
      };

      // Realizar la petición POST

      fetch('http://10.0.2.2:3000/logIn', {
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
          let firebaseUID = data.usuario.firebaseUID;
          setNombre(data.usuario.nombre);
          setCorreo_electronico(data.usuario.correo);
          setUsuario(data.usuario.nombre_usuario);
          navigation.navigate('HomePage', { firebaseUID: data.usuario.firebaseUID as string });
          Toast.show({
            type: 'success',
            text1: '¡Éxito!',
            text2: 'Ingreso exitoso.',
          });
        })
        .catch((error) => {
          if (error.message.includes('400')) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Falta el usuario o contraseña.',
            });
          } else if (error.message.includes('500')) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Credenciales incorrectas.',
            });
          } else if (error.message.includes('404')) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Usuario no encontrado.',
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
      Alert.alert('Inicio de sesión fallido')
    } finally {
      setLoading(false);
    }
  };

  const renderLogo = () => {
    if (logoImage) {
      return (
        <Image
          source={logoImage}
          style={styles.logo}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <Text style={styles.logoFallback}>Logo</Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {renderLogo()}
      </View>
      <View style={styles.pageContent}>
        <View style={styles.block}>
          <Text style={styles.heading}>Inicio de sesión</Text>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input}
              placeholder="Correo electronico" placeholderTextColor="#fff"
              value={user}
              onChangeText={handleUsuarioCambio}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#fff"
              secureTextEntry={true}
              value={contrasenia}
              onChangeText={handleContraseniaCambio}
            />
          </View>

          <TouchableOpacity style={styles.forgotPasswordLink}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={
              handleInciarSession
            }>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.createAccountLink} onPress={() => navigation.navigate('CrearCuenta')}>
            <Text style={styles.createAccountText}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>

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

export default InicioSesion;

