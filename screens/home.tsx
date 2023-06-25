import React from 'react';
import { Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';

type RootStackParamList = {
  Inicio: undefined;
  InicioSesion: undefined;
  CrearCuenta: undefined;
  HomePage: undefined;
};

type HomeProps = {
  navigation: NavigationProp<RootStackParamList, 'HomePage'>;
};

const Home: React.FC<HomeProps> = ({ navigation })=> {

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Page</Text>
        </View>
    );
};

export default Home;