# alojapp
## Descripcion General
alojapp es una aplicacion de booking de viajes, que te permite acceder a catalogos de alojamientos en diferentes ubicaciones del pais y reservar tu propio alojamiento a precios razonables! Hecho principalmente en React-Native, con una base de datos en MongoDB.

## Requisitos
-> React Native V.0.71.8  
-> React V.18.2.0
### dependencias
back
``` 
    "bcrypt": "^5.1.0",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "firebase": "^9.23.0",
    "fs": "^0.0.1-security",
    "mongoose": "^7.3.1",
    "multer": "^1.4.5-lts.1",
    "stripe": "^12.10.0" 
```
front
``` 
    "@expo/vector-icons": "^13.0.0",
    "@react-navigation/bottom-tabs": "^6.5.7",
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "@react-navigation/stack": "^6.3.16",
    "@rneui/base": "^4.0.0-rc.7",
    "@rneui/themed": "^4.0.0-rc.7",
    "axios": "^1.4.0",
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "expo-font": "^11.1.1",
    "express": "^4.18.2",
    "firebase": "^9.23.0",
    "jsonwebtoken": "^9.0.0",
    "mongodb": "^5.6.0",
    "mongoose": "^7.3.0",
    "multer": "^1.4.5-lts.1",
    "react": "18.2.0",
    "react-native": "0.71.8",
    "react-native-safe-area-context": "^4.5.3",
    "react-native-screens": "^3.21.0",
    "react-native-toast-message": "^2.1.6",
    "react-native-vector-icons": "^9.2.0",
    "stripe": "^12.10.0"
``` 

## Instalacion
En dispositivo virtual, es necesario crear un VDM en Android Studio.  
Guia para [configurar un VDM](https://reactnative.dev/docs/environment-setup?guide=native)  

Ya cuando el VDM este configurado
1. Clone el repositorio desde https://github.com/jairoaguilarts/alojapp.git
```
git clone https://github.com/jairoaguilarts/alojapp.git
``` 
2. Dentro de la carpeta, instale las dependencias necesarias
```
npm i
```
3. Igualmente, instale las dependencias necesarias para el BackEnd dentro de `.\express\`
```
npm i express
npm i firebase
npm i stripe
```
**Usualmente solo con `npm i` es suficiente, pero si le da error, pruebe con los comandos de arriba**

## Guia de Uso
1. Dentro de `.\express\`, inicialize la conexion con la base de datos
```
node server.js
```
2. Ejecute el  apk que se encuentra en:
```
./android/app/builds/outputs/apk/debug
```
3. Al iniciar la app, ingrese con su cuenta, sino registrese, y luego tendra libre acceso al contenido disponible.

## Funcionalidades
* _Crear_ o _Registrar_ un usuario
* Acceso a diferentes alojamientos
* Acceso a perfil
* Acceso a alojamientos favoritos
* Reservacion de Alojamientos

## Ejemplo de Codigo
```ruby 
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio}  options={{ headerShown: false }}/>
        <Stack.Screen name="InicioSesion" component={InicioSesion} options={{ headerShown: false }} />
        <Stack.Screen name="CrearCuenta" component={CrearCuenta} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
``` 
