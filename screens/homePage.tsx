import { Image, StyleSheet, View, Text, ScrollView } from "react-native";
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from "react";
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

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );

}

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
      <Tab.Screen name="Home">{() => <HomeScreen />}</Tab.Screen>
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
};


export default HomePage;
