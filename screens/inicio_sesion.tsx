import React from 'react';
import { View, Text,Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const InicioSesion = () => {
  const logoImage = require('alojapp/Images/Alojapplogo.png');

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
            <TextInput style={styles.input} placeholder="Usuario" placeholderTextColor="#fff" />
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Contraseña"  placeholderTextColor="#fff" secureTextEntry={true} />
          </View>

          <TouchableOpacity style={styles.forgotPasswordLink}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {/* Agregar lógica para iniciar sesión */}}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.createAccountLink}>
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
