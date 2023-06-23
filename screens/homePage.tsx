import { Image, StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";


type RootStackParamList = {
  Inicio: undefined;
  InicioSesion: undefined;
  CrearCuenta: undefined;
  HomePage: { nombreUsuario: string }
};

type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomePage'>;
  route: RouteProp<RootStackParamList, 'HomePage'>;
};

function HomeScreen(props: { nombreUsuario: string }) {
  const { nombreUsuario } = props;
  const [buscarUbicacion, setUbicacion] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.topBackground}>

        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>
            Bienvenido,
          </Text>
          <Text style={styles.nameText}>
            {nombreUsuario}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('./icons/magnifier.png')} style={styles.inputImage} />
          <TextInput
            style={styles.input}
            placeholder="Dónde viajarás hoy?"
            placeholderTextColor="#fff"
            onChangeText={setUbicacion}
            textAlign="center"  
          />
          <Image source={require('./icons/filters.png')} style={styles.inputImage} />

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#2D3652',
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginTop: 20,
    paddingLeft: 20,
  },
  welcomeText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'left',
  },
  nameText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'left',
    marginBottom: 20,
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: "35%",
    backgroundColor: "#495C83",
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  inputContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#88B4F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '90%',
    marginHorizontal: 20,
    marginBottom: 17.5,
    backgroundColor: 'rgba(136, 180, 245, 0.3)',
  },
  input: {
    borderColor: '#2196F3',
    borderRadius: 5,
    color: '#fff',
    flex: 1,
  },
  inputImage: {
    margin: 20,
    width: 30,
    height: 30,
  },
});

function FavoritosScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Favoritos!</Text>
    </View>
  );
}

function PerfilScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Perfil!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const HomePage: React.FC<HomeProps> = ({ navigation, route }) => {
  const nombreUsuario = route.params.nombreUsuario;

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
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home">{() => <HomeScreen nombreUsuario={nombreUsuario} />}</Tab.Screen>
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
};


export default HomePage;
