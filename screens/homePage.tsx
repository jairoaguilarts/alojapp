import React from 'react';
import { Text, View } from 'react-native';
import { NavigationProp,RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type RootStackParamList = {
    Inicio: undefined;
    InicioSesion: undefined;
    CrearCuenta: undefined;
    HomePage: { nombreUsuario: string } 
};

type HomeProps = {
    navigation: NavigationProp<RootStackParamList, 'HomePage'>;
    route: RouteProp<RootStackParamList, 'HomePage'>;
};

const Tab = createBottomTabNavigator();

const HomePage: React.FC<HomeProps> = ({ navigation,route }) => {
    const nombreUsuario = route.params.nombreUsuario;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Bienvenido, {nombreUsuario}</Text>
        </View>
      );
};

export default HomePage;
