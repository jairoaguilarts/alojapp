import React from 'react';
import { View, Text,Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CrearCuenta1 = () => {
  return (
    <View style={styles.container}>
        <View style={styles.pageContent}>
      <View>
        <TouchableOpacity onPress={() => {}} style={{ position: 'absolute', top: 10, left: 10 }}>
          <Text>arrow_back_ios_new</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.block}>
         
        <Text style={styles.heading}>Paso 1 de 2</Text>
        <Text style={styles.heading}>Crear cuenta</Text>
        <Text style={styles.lightText}  >Paso 1 de 2</Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Correo electrónico"  placeholderTextColor="#fff" value="" onChangeText={() => {}}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            placeholderTextColor="#fff"
            value=""
            onChangeText={() => {}}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirma tu contraseña"
            placeholderTextColor="#fff"
            secureTextEntry
            value=""
            onChangeText={() => {}}
          />
        </View>

        <View>
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPasswordLink}>
        <Text style={styles.forgotPasswordText}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>

      <Text>O utiliza otro método</Text>

      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text>Iniciar sesión con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text>Iniciar sesión con Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text>Continuar sin crear cuenta</Text>
      </TouchableOpacity>
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

export default CrearCuenta1;
