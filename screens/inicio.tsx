import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Inicio: undefined;
  InicioSesion: undefined;
  // Agrega otras rutas aquí si es necesario
};
type InicioProps = {
  navigation: NavigationProp<RootStackParamList, 'Inicio'>;
};

const Inicio: React.FC<InicioProps> =  ({ navigation }) => {
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
      <Text style={styles.description}>
        Un lugar seguro que te ayudará a encontrar el alojamiento ideal para tus viajes
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InicioSesion')}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {/* Agregar lógica para crear cuenta */}}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181c2c',
    color: '#eaeaf2',
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoFallback: {
    width: 200,
    height: 200,
    backgroundColor: '#ccc',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 32,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
    color: '#eaeaf2',
    width: '99%',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
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
    
  },
});

export default Inicio;
