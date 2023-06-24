import { Image, StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";

import HomeScreen from "./homeScreen";
import FavoritosScreens from "./favoritosScreen";
import PerfilScreen from "./perfilScreen";

type RootStackParamList = {
  Inicio: undefined;
  InicioSesion: undefined;
  CrearCuenta: undefined;
  HomePage: { firebaseUID: string };
};

type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomePage'>;
  route: RouteProp<RootStackParamList, 'HomePage'>;
};


const styles2 = StyleSheet.create({
  outlineParentPosition: {
    bottom: "17.5%",
    top: "18.75%",
    height: "63.75%",
    position: "absolute",
  },
  outlineLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    bottom: "52.94%",
    top: "0%",
    height: "47.06%",
    position: "absolute",
    overflow: "hidden",
  },
  inicioTypo: {
    fontSize: FontSize.labelL1_size,
    left: 0,
    top: 34,
    textAlign: "center",
    fontFamily: FontFamily.titleT2,
    position: "absolute",
  },
  tabLayout: {
    opacity: 0.7,
    width: 69,
    top: 0,
    height: 80,
    position: "absolute",
    overflow: "hidden",
  },
  frameViewLayout: {
    width: 70,
    opacity: 0.7,
    top: 0,
    height: 80,
    position: "absolute",
    overflow: "hidden",
  },
  navegaPorLaFlexBox: {
    justifyContent: "center",
    alignItems: "flex-end",
    display: "flex",
    fontSize: FontSize.titleT2_size,
    textAlign: "center",
    color: Color.mainText,
    fontFamily: FontFamily.titleT2,
  },
  favoritos: {
    top: 60,
    left: 30,
    fontSize: FontSize.headlineH4_size,
    width: 368,
    textAlign: "center",
    fontFamily: FontFamily.titleT2,
    position: "absolute",
    color: Color.mainText,
  },
  heart24Outline: {
    width: "41.38%",
    right: "29.31%",
    left: "29.31%",
  },
  favoritos1: {
    color: Color.mainText,
    left: 0,
    top: 34,
  },
  heart24OutlineParent: {
    width: "84.06%",
    right: "7.25%",
    left: "8.7%",
  },
  tabBarInner: {
    left: 100,
    width: 69,
    top: 0,
    height: 80,
    position: "absolute",
    overflow: "hidden",
  },
  house24Outline: {
    width: "70.59%",
    right: "14.71%",
    left: "14.71%",
  },
  inicio: {
    color: Color.mainAccent,
  },
  house24OutlineParent: {
    width: "49.28%",
    right: "24.64%",
    left: "26.09%",
  },
  tabBarChild: {
    left: 21,
  },
  building24Outline: {
    width: "40%",
    right: "30%",
    left: "30%",
  },
  building24OutlineParent: {
    width: "85.71%",
    right: "7.14%",
    left: "7.14%",
  },
  frameView: {
    left: 179,
  },
  support24Outline: {
    width: "36.92%",
    right: "32.31%",
    left: "30.77%",
  },
  support24OutlineParent: {
    width: "94.2%",
    right: "2.9%",
    left: "2.9%",
  },
  tabBarInner1: {
    left: 259,
  },
  profile24Outline: {
    width: "75%",
    right: "12.5%",
    left: "12.5%",
  },
  profile24OutlineParent: {
    width: "45.71%",
    right: "27.14%",
    left: "27.14%",
  },
  tabBarInner2: {
    left: 338,
  },
  tabBar: {
    marginLeft: -214,
    bottom: 0,
    backgroundColor: Color.mainSecondary,
    width: 428,
    height: 80,
    left: "50%",
    position: "absolute",
    overflow: "hidden",
  },
  frameChild: {
    width: 150,
    height: 150,
  },
  navegaPorLa: {
    width: 295,
    marginTop: 30,
  },
  groupParent: {
    alignItems: "center",
    width: 368,
  },
  botnSecundario: {
    width: 320,
    height: 24,
  },
  btnPrimario1: {
    borderRadius: Border.br_xl,
    backgroundColor: "rgba(136, 180, 245, 0.5)",
    borderStyle: "solid",
    borderColor: "#88b4f5",
    borderWidth: 2,
    height: 72,
    flexDirection: "row",
    padding: 24,
    marginTop: 30,
    overflow: "hidden",
  },
  frameParent: {
    marginTop: -205,
    marginLeft: -184,
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  favoritosVaco: {
    backgroundColor: Color.mainBackground,
    flex: 1,
    width: "100%",
    height: 926,
    overflow: "hidden",
  },
  datosPerfilContainer: {
    backgroundColor: '#181c2c',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 30,
  },
  linea: {
    height: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: '90%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoFallback: {
    width: 200,
    height: 200,
    backgroundColor: '#ccc',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 32,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  datosPerfilTitle: {
    fontSize: 32,
    fontWeight: '100',
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff'
  },
  datos: {
    flex: 1,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 10,
  },
  datosPerfilSubtitle: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '100',
    marginVertical: 5,
    color: '#fff'

  },
  datosPerfilText: {
    fontSize: 16,
    fontWeight: '100',
    marginVertical: 5,
    color: '#fff'
  },
  datosPerfilDescription: {
    fontSize: 18,
    fontWeight: '100',
    marginVertical: 50,
    color: '#fff'
  },
  datosTitle: {
    color: '#88B4F5',
    marginBottom: 5,

  },
  datosValue: {
    fontSize: 18,
    fontWeight: '100',
    marginVertical: 2,
    color: '#fff'
  },
});

const Tab = createBottomTabNavigator();

const HomePage: React.FC<HomeProps> = ({ navigation, route }) => {
  const firebaseUID = route.params.firebaseUID;

  const [correo, setCorreo] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [usuario, setUsuario] = useState('');
  const [firbaseUIDHP, setFirebaseUID] = useState('');

  // Peticion al back para obtener la informacion del usuario
  fetch(`http://10.0.2.2:3000/usuario/${firebaseUID}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Ocurrió un error en la respuesta');
      }
      return response.json();
    })
    .then(data => {
      setCorreo(data.correo);
      setNombreUsuario(data.nombre);
      setUsuario(data.nombre_usuario);
      setFirebaseUID(firebaseUID);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Image source={require('./icons/home.png')} style={{ width: size, height: size, tintColor: color }} />;
          } else if (route.name === 'Favoritos') {
            return <Image source={require('./icons/favorites.png')} style={{ width: size, height: size, tintColor: color }} />;
          } else if (route.name === 'Rentados') {
            return <Image source={require('./icons/rents.png')} style={{ width: size, height: size, tintColor: color }} />;
          } else if (route.name === 'Asistencia') {
            return <Image source={require('./icons/support.png')} style={{ width: size, height: size, tintColor: color }} />;
          } else if (route.name === 'Perfil') {
            return <Image source={require('./icons/profile.png')} style={{ width: size, height: size, tintColor: color }} />;
          }
        },
        activeTintColor: '#495C83',
        inactiveTintColor: 'tomato',
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false, tabBarStyle: { backgroundColor: "#495C83" } }}>{() => <HomeScreen nombreUsuario={nombreUsuario} />}</Tab.Screen>
      <Tab.Screen name="Favoritos" options={{ headerShown: false, tabBarStyle: { backgroundColor: "#495C83" } }}>{() => <FavoritosScreens firebaseUID={firbaseUIDHP} />}</Tab.Screen>
      <Tab.Screen name="Perfil" options={{ headerShown: false, tabBarStyle: { backgroundColor: "#495C83" } }}>{() => (<PerfilScreen nombreUsuario={nombreUsuario} correo_electronico={correo} usuario={usuario} />)}</Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomePage;
