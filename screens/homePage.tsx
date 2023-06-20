import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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

function RentadosScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Rentados!</Text>
        </View>
    );
}

function AsistenciaScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Asistencia!</Text>
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

const HomePage: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favoritos" component={FavoritosScreen} />
            <Tab.Screen name="Rentados" component={RentadosScreen} />
            <Tab.Screen name="Asistencia" component={AsistenciaScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
};

export default HomePage;
