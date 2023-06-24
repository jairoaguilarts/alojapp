import { Image, StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect, FC } from 'react';
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";

interface Props{
    nombreUsuario: string;
    correo_electronico: string;
    usuario: string;
}

const PerfilScreen: FC<Props> = ({ nombreUsuario, correo_electronico, usuario }) => {
  
    const logoImage = require('alojapp/Images/profile2.png');
    const LineaHorizontal = () => {
      return <View style={styles2.linea} />;
    };
    const renderLogo = () => {
      if (logoImage) {
        return (
          <Image
            source={logoImage}
            style={styles2.logo}
            resizeMode="contain"
          />
        );
      } else {
        return (
          <Text style={styles2.logoFallback}>Logo</Text>
        );
      }
    };
  
    return (
      <ScrollView>
  
        <View style={styles2.datosPerfilContainer}>
          <View>
            <Text style={styles2.datosPerfilTitle}>Datos Personales</Text>
          </View>
          <View style={styles2.logoContainer}>
            {renderLogo()}
          </View>
  
          <View>
            <Text style={styles2.datosPerfilTitle}>{nombreUsuario}</Text>
            <Text style={styles2.datosPerfilSubtitle}>@{usuario}</Text>
          </View>
          <LineaHorizontal />
          <View style={styles2.datos}>
            <Text style={styles2.datosTitle}>Nombre completo</Text>
            <Text style={styles2.datosValue}>{nombreUsuario}</Text>
          </View>
  
          <LineaHorizontal />
          <View style={styles2.datos}>
            <Text style={styles2.datosTitle}>Número de teléfono</Text>
            <Text style={styles2.datosValue}>No especificado</Text>
          </View>
          <LineaHorizontal />
          <View style={styles2.datos}>
            <Text style={styles2.datosTitle}>Correo electrónico</Text>
            <Text style={styles2.datosValue}>{correo_electronico}</Text>
          </View>
          <LineaHorizontal />
          <View style={styles2.datos}>
            <Text style={styles2.datosTitle}>Dirección</Text>
            <Text style={styles2.datosValue}>No especificada</Text>
          </View>
        </View>
      </ScrollView>
    );
  };
  const styles2 = StyleSheet.create({
    datosPerfilContainer: {
      backgroundColor: '#181c2c',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      paddingVertical: 30,
    },
    linea: {
      height: 1,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      marginVertical: 10,
      width: '90%',
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 30,
    },
    logo: {
      width: 150,
      height: 150,
    },
    logoFallback: {
      width: 200,
      height: 200,
      backgroundColor: '#ccc',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 32,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    datosPerfilTitle: {
      fontSize: 32,
      fontWeight: '100',
      textAlign: 'center',
      marginVertical: 10,
      color: '#fff'
    },
    datos: {
      flex: 1,
      paddingVertical: 3,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      margin: 10,
    },
    datosPerfilSubtitle: {
      fontSize: 22,
      textAlign: 'center',
      fontWeight: '100',
      marginVertical: 5,
      color: '#fff'
  
    },
    datosPerfilText: {
      fontSize: 16,
      fontWeight: '100',
      marginVertical: 5,
      color: '#fff'
    },
    datosPerfilDescription: {
      fontSize: 18,
      fontWeight: '100',
      marginVertical: 50,
      color: '#fff'
    },
    datosTitle: {
      color: '#88B4F5',
      marginBottom: 5,
  
    },
    datosValue: {
      fontSize: 18,
      fontWeight: '100',
      marginVertical: 2,
      color: '#fff'
    },
  });

  export default PerfilScreen;