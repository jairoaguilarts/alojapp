import React from 'react';
import { Text, View, Image} from 'react-native';
import { NavigationProp,RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

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

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>HomePage</Text>
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

const HomePage: React.FC<HomeProps> = ({ navigation,route }) => {
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
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favoritos" component={FavoritosScreen} />
            <Tab.Screen name="Rentados" component={RentadosScreen} />
            <Tab.Screen name="Asistencia" component={AsistenciaScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
};

export default HomePage;
