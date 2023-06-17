import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const InicioSesion = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {/* Agregar lógica para volver atrás */}
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonIcon}>arrow_back_ios_new</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pageContent}>
        <View style={styles.block}>
          <Text style={styles.heading}>Inicio de sesión</Text>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Correo electrónico" />
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} />
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
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  backButton: {
    paddingVertical: 10,
    paddingRight: 10,
  },
  backButtonIcon: {
    fontSize: 24,
  },
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    width: '80%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
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
  },
  methodText: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default InicioSesion;
