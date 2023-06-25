import { Image, StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect, FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';




type ReservaScreenRouteProp = RouteProp<RootStackParamList, 'ReservaScreen'>;
type ReservaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReservaScreen'>;

type RootStackParamList = {
  ReservaScreen: {
    idAlojamiento: string;
    nombreUsuario: string;
  };
}

interface Props {
  idAlojamiento: string;
  nombreUsuario: string;
  route: ReservaScreenRouteProp;
  navigation: ReservaScreenNavigationProp;
}



const ReservaScreen: FC<Props> = ({ route }) => {
  const { idAlojamiento, nombreUsuario } = route.params;
  const [alojamiento, setAlojamiento] = useState<any[]>([]);

  useEffect(() => {
    console.log(idAlojamiento);
    fetch(`http://10.0.2.2:3000/obtenerInfoAlojamiento/${idAlojamiento}`)
      .then(response => response.json())
      .then(data => setAlojamiento(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <ScrollView>
      {alojamiento.map((infoAlojamiento) => {
        return (
          <View style={styles2.reservaContainer}>
            <Image
              style={styles2.imgContainer}
              resizeMode="cover"
              source={{ uri: infoAlojamiento.imgSrc }}
            />
            <Text style={styles2.fontTituloNombre}>{infoAlojamiento.nombre}</Text>

            <View style={styles2.rowContainer_smaller}>
              <View style={styles2.sectionContainer}>
                <Image source={require('./icons/star.png')} style={styles2.icono} />
                <Text style={styles2.fontSubtitulo}>{infoAlojamiento.estrellas}</Text>
              </View>

              <View style={styles2.verticalLine} />

              <View style={styles2.sectionContainer}>
                <Text style={styles2.fontSubtitulo}>{infoAlojamiento.resenas} resenas</Text>
              </View>
              <TouchableOpacity style={styles2.buttonContainer}>
                <Image
                  source={require('./icons/btn-favoritos.png')}
                  style={styles2.buttonImage}
                />
              </TouchableOpacity>
            </View>
            <Text>{infoAlojamiento.ubicacion}</Text>


            <View style={styles2.rowContainer}>
              <View style={styles2.sectionContainer}>
                <Text style={styles2.fontTitulo}>L. {infoAlojamiento.precio}</Text>
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
              <Text>{infoAlojamiento.fechaEntrada} - {infoAlojamiento.fechaSalida}</Text>
            </View>
            <View style={styles2.horizontalLine} />
          </View>
        );
      })}
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
