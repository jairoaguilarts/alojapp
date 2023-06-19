import React from 'react';
import { Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type RootStackParamList = {
    Inicio: undefined;
    InicioSesion: undefined;
    CrearCuenta: undefined;
    HomePage: undefined;
};

type HomeProps = {
    navigation: NavigationProp<RootStackParamList, 'HomePage'>;
};

const Tab = createBottomTabNavigator();

const HomePage: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomePage" component={HomePage} />
        </Tab.Navigator>
    );
};

export default HomePage;
