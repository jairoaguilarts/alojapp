import React from 'react';
import { Text, View, Image ,StyleSheet,} from 'react-native';
import { NavigationProp,RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';


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
    return (
        
        <View style={styles.container}>
        <View style={styles.topBackground} />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.nameText}>{nombreUsuario}</Text>
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
        justifyContent: 'center',
        marginTop: 10,
      },
      welcomeText: {
        color: 'white',
        paddingLeft: 150,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      nameText: {
        flex: 1,
        alignItems: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 40,
        textAlign: 'left',
      },
      topBackground: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: "35%",
        backgroundColor: "#495C83",
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
            <Tab.Screen name="Home">{() => <HomeScreen nombreUsuario={nombreUsuario} />}</Tab.Screen>
            <Tab.Screen name="Favoritos" component={FavoritosScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
};


export default HomePage;
