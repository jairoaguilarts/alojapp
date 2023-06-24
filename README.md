# alojapp
## Descripcion General
alojapp es una aplicacion de booking de viajes, que te permite acceder a catalogos de alojamientos en diferentes ubicaciones del pais y reservar tu propio alojamiento a precios razonables! Hecho principalmente en React-Native, con una base de datos en MongoDB.

## Requisitos
-> React Native V.0.71.8  
-> React V.18.2.0
### dependencias
back
``` 
express  
multer  
mongoose  
firebase  
stripe  
```
front
``` 
react-navigation
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
```
```
npm i firebase
```
```
npm i stripe
```

## Guia de Uso
1. Dentro de `.\express\`, inicialize la conexion con la base de datos
```
node server.js
```
2. Vuelva a la carpeta madre, e inicialice el VDM y la aplicacion
```
npx react-native run-android
```
```
run react-native start
```
3. Al iniciar la app, ingrese con su cuenta, sino registrese, y luego tendra libre acceso al contenido disponible.
