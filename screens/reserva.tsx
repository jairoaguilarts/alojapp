import { Image, StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect, FC } from 'react';
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";

interface Props {
    firebaseUID: string;
}

const FavoritosScreen: FC<Props> = ({ firebaseUID }) => {
  const [alojamiento, setAlojamiento] = useState<any | null>(null);
  useEffect(() => {
    fetch('http://10.0.2.2:3000//idalojamientos/:idAlojamiento')
        .then(response => response.json())
        .then(data => setAlojamiento(data))
        .catch(error => console.error('Error:', error));
}, []);

    return (
      <View style={styles2.favoritosVaco}>
        <Image
            style={{ width: 200, height: 200 }}
            resizeMode="cover"
            source={{ uri: alojamiento.imgSrc }}
        />
        <Text>{alojamiento.nombre}</Text>
        <Text>{alojamiento.ubicacion}</Text>
        <View>
          <Text>Precio: {alojamiento.precio}</Text>
          <Text>Personas: {alojamiento.personas}</Text>
        </View>
        <View>
          <Text>Fecha de entrada: {alojamiento.fechaEntrada}</Text>
          <Text>Fecha de salida: {alojamiento.fechaSalida}</Text>
      </View>
      </View>
    );
  }

  const styles2 = StyleSheet.create({    
    navegaPorLaFlexBox: {
      justifyContent: "center",
      alignItems: "flex-end",
      display: "flex",
      fontSize: FontSize.titleT2_size,
      textAlign: "center",
      color: Color.mainText,
      fontFamily: FontFamily.titleT2,
    },
    frameChild: {
      width: 150,
      height: 150,
    },
    navegaPorLa: {
      width: 295,
      marginTop: 30,
    },
    groupParent: {
      alignItems: "center",
      width: 368,
    },
    frameParent: {
      marginTop: -205,
      marginLeft: -184,
      top: "50%",
      left: "50%",
      position: "absolute",
    },
    favoritosVaco: {
      backgroundColor: Color.mainBackground,
      flex: 1,
      width: "100%",
      height: 926,
      overflow: "hidden",
    },
  });

  export default FavoritosScreen;