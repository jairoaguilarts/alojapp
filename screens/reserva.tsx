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
    return (
      <View style={styles2.favoritosVaco}>
        <View style={styles2.frameParent}>
          <View style={styles2.groupParent}>
            <Image
              style={styles2.frameChild}
              resizeMode="cover"
              source={require("../assets/group-713.png")}
            />
            <Text style={[styles2.navegaPorLa, styles2.navegaPorLaFlexBox]}>
              Navega por la aplicación para encontrar tu alojamiento favorito
            </Text>
          </View>
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