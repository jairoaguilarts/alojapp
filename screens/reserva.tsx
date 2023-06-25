import { Image, StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect, FC } from 'react';
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";

interface Props {
    nombreUsuario: string;
}

const ReservaScreen: FC<Props> = ({ nombreUsuario }) => {
  const [alojamiento, setAlojamiento] = useState<any[]>([]);
  useEffect(() => {
    fetch('http://10.0.2.2:3000//idalojamientos/:idAlojamiento')
        .then(response => response.json())
        .then(data => setAlojamiento(data))
        .catch(error => console.error('Error:', error));
  }, []);

    return (
      <ScrollView>
        <View style={styles2.reservaContainer}>
          <Image
              style={styles2.imgContainer}
              resizeMode="cover"
              source={{ uri: alojamiento.imgSrc }}
          />
          <Text style={styles2.fontTituloNombre}>{alojamiento.nombre}</Text>

          <View style={styles2.rowContainer_smaller}>
            <View style={styles2.sectionContainer}>
              <Image source={require('./icons/star.jpeg')} style={styles2.inputImage} />
              <Text style={styles2.fontSubtitulo}>{alojamiento.estrellas}</Text>
            </View>

            <View style={styles2.verticalLine} />

            <View style={styles2.sectionContainer}>
              <Text style={styles2.fontSubtitulo}>{alojamiento.resenas} resenas</Text>
            </View>
            <TouchableOpacity style={styles2.buttonContainer}>
              <Image
                source={require('./icons/btn-favoritos.jpeg')}
                style={styles2.buttonImage}
              />
            </TouchableOpacity>
          </View>
          <Text>{alojamiento.ubicacion}</Text>


          <View style={styles2.rowContainer}>
            <View style={styles2.sectionContainer}>
              <Text style={styles2.fontTitulo}>L. {alojamiento.precio}</Text>
              <Text style={styles2.fontSubtitulo}>Por Noche</Text>
            </View>

            <View style={styles2.verticalLine} />

            <View style={styles2.sectionContainer}>
              <Text style={styles2.fontSubtitulo}>Alojamiento rentado por</Text>
              <Text style={styles2.fontTitulo}>{nombreUsuario}</Text>
            </View>
          </View>
          <View style={styles2.horizontalLine} />

          <View>
            <Text style={styles2.fontSubtitulo}>Disponible para renta</Text>
            <Text>{alojamiento.fechaEntrada} - {alojamiento.fechaSalida}</Text>
          </View>
          <View style={styles2.horizontalLine} />
        </View>
      </ScrollView>
    );
  }

  const styles2 = StyleSheet.create({    
    reservaContainer: {
      backgroundColor: '#181c2c',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      paddingVertical: 10,
    },
    sectionContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgContainer: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '40%',
      resizeMode: 'contain',
    },
    fontTituloNombre: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'left',
      marginVertical: 15,
      marginHorizontal: 15,
      color: '#fff'
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    rowContainer_smaller: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 100,
      marginVertical: 10,
    },
    verticalLine: {
      width: 1,
      height: '60%',
      backgroundColor: 'black',
      marginHorizontal: 10,
    },
    horizontalLine: {
      width: '80%', 
      height: 3, 
      backgroundColor: '#2d3652',
      marginVertical: 10
    },
    fontTitulo: {
      fontSize: 20,
      fontWeight: '100',
      textAlign: 'center',
      marginVertical: 15,
      marginHorizontal: 15,
      color: '#fff'
    },
    icono: {
      margin: 20,
      width: 30,
      height: 30,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      marginLeft: 10
    },
    buttonImage: {
      width: 20,
      height: 20,
      marginRight: 5,
    },
    fontSubtitulo: {
      fontSize: 14,
      fontWeight: '100',
      textAlign: 'center',
      marginVertical: 2,
      color: '#fff'
    }
  });

  export default ReservaScreen;