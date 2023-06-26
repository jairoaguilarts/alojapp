import { Image, StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect, FC } from 'react';
import { Color, FontSize, FontFamily, Padding, Border } from "../GlobalStyles";
import { RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

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


const Tab = createBottomTabNavigator();


const ReservaScreen: FC<Props> = ({ route }) => {
  const { idAlojamiento, nombreUsuario } = route.params;
  const [alojamiento, setAlojamiento] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://10.0.2.2:3000/obtenerInfoAlojamiento/${idAlojamiento}`)
      .then(response => response.json())
      .then(data => setAlojamiento(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const Reservar = (idAlojamiento: string) => {
    const url = `http://10.0.2.2:3000/reservar/${idAlojamiento}`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reservado: '1' }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          Toast.show({
            type: 'info',
            text1: 'Información',
            text2: 'El alojamiento ya estaba reservado'
          });
          throw new Error('El alojamiento ya estaba reservado');
        } else {
          throw new Error('Error del servidor');
        }
      })
      .then(data => {
        Toast.show({
          type: 'success',
          text1: '¡Éxito!',
          text2: 'Reservación realizada con éxito'
        });
      })
      .catch(error => {
        if (error.message !== 'El alojamiento ya estaba reservado') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Hubo un problema con la reservacion: ' + error.message
          });
        }
      });
  };

  return (
    <ScrollView style={styles2.scrollViewContentContainer}>
      {alojamiento.map((infoAlojamiento) => {
        return (
          <View key={infoAlojamiento.idAlojamiento} style={styles2.reservaContainer}>            

            <Image
              style={styles2.cardMainImage}
              resizeMode="cover"
              source={{ uri: infoAlojamiento.imgSrc }}
            />
            <View style={styles2.coContenedor}>
              
              <Text style={[styles2.villaValor]}>
                {infoAlojamiento.nombre}
              </Text>


              <Text style={[styles2.laCeibaHonduras, styles2.textFlexBox]}>{infoAlojamiento.ubicacion}</Text>
              <View style={styles2.starParent}>
                <Image
                  style={styles2.starIcon}
                  resizeMode="cover"
                  source={require("./icons/star.png")}
                />
                <Text style={styles2.text1Typo}>{infoAlojamiento.estrellas} | {infoAlojamiento.resenas} reseñas</Text>
              </View>


              <View style={styles2.groupParent}>
                <View style={styles2.l2400Parent}>
                  <Text style={[styles2.l2400, styles2.btnFlexBox]}>L. {infoAlojamiento.precio}</Text>
                  <Text style={[styles2.porNoche, styles2.porNochePosition]}>Por Noche</Text>
                </View>

                <Image
                  style={styles2.frameChild}
                  resizeMode="cover"
                  source={require("./icons/linea-vert.png")}
                />


                <View style={styles2.alojamientoRentadoPorParent}>
                  <Text style={[styles2.alojamientoRentadoPor, styles2.l2400Position]}>Alojamiento rentado por</Text>
                  <Text style={[styles2.luisaLopez, styles2.l2400Position]}>{nombreUsuario}</Text>
                </View>
              </View>



              <View style={styles2.horizontalLine} />



              <View style={[styles2.disponibleParaRentaParent]}>
                <Text style={[styles2.disponibleParaRenta, styles2.l2400Position]}>Disponible para renta</Text>
                <Text style={[styles2.diciembre10, styles2.l2400Position]}>
                  {infoAlojamiento.fechaEntrada} - {infoAlojamiento.fechaSalida}
                </Text>
              </View>


              <View style={styles2.horizontalLine} />


              <View style={styles2.contenedorPaServicios}>
                <Text style={[styles2.servicios]}>Servicios</Text>
                <View style={styles2.contenedorServDesc}>
                  <Image
                    style={styles2.starIcon}
                    resizeMode="cover"
                    source={require("./icons/habitacion.png")} />
                  <Text style={styles2.text1Typo}>
                    {infoAlojamiento.habitacion} habitaciones
                  </Text>
                </View>
                
                <View style={styles2.contenedorServDesc}>
                  <Image
                    style={styles2.starIcon}
                    resizeMode="cover"
                    source={require("./icons/bano.png")} />
                  <Text style={styles2.text1Typo}>
                    {infoAlojamiento.bano} baños
                  </Text>
                </View>

                <View style={styles2.contenedorServDesc}>
                  <Image
                    style={styles2.starIcon}
                    resizeMode="cover"
                    source={require("./icons/cama.png")} />
                  <Text style={styles2.text1Typo}>
                    {infoAlojamiento.cama} camas
                  </Text>
                </View>

                <View style={styles2.contenedorServDesc}>
                  <Image
                    style={styles2.starIcon}
                    resizeMode="cover"
                    source={require("./icons/comida.png")}
                  />
                  {infoAlojamiento.desayunoIncluido ? (
                    <Text style={styles2.text1Typo}>Desayuno Incluido</Text>
                  ) : (
                    <Text style={styles2.text1Typo}>Desayuno No Incluido</Text>
                  )}
                </View>

                <View style={styles2.contenedorServDesc}>
                  <Image
                    style={styles2.starIcon}
                    resizeMode="cover"
                    source={require("./icons/wifi.png")}
                  />
                  {infoAlojamiento.wifi ? (
                    <Text style={styles2.text1Typo}>Wifi Incluido</Text>
                  ) : (
                    <Text style={styles2.text1Typo}>Wifi No Incluido</Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles2.contentContainer}>
              <TouchableOpacity style={styles2.button} onPress={() => Reservar(infoAlojamiento.idAlojamiento)}>
                <Text style={styles2.buttonText}>Rentar | {infoAlojamiento.precio} por Noche</Text>
              </TouchableOpacity>
            </View>
          </View>

        );
      })}
    </ScrollView>
  );
}

const styles2 = StyleSheet.create({
  scrollViewContentContainer: {
    paddingBottom: 30,
  },
  reservaContainer: {
    backgroundColor: Color.mainBackground,
    flex: 1,
    //overflow: "hidden",
    width: "100%",
    paddingVertical: 10,
  },
  coContenedor: {
    marginLeft: 20,
  },
  cardMainImage: {
    height: 429,
    width: 428,
    marginBottom: 8,
  },
  starParent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  text1Typo: {
    fontSize: 20,
    fontFamily: FontFamily.headlineH4,
    color: "white"
  },
  villaValor: {
    fontSize: 30,
    color: "white",
    marginBottom: 8,
    //alignItems: "center",
  },
  laCeibaHonduras: {
    fontFamily: FontFamily.headlineH4,
    fontSize: FontSize.labelL1_size,
    textAlign: "left",
    marginBottom: 8,
  },
  textFlexBox: {
    textAlign: "left",
    color: Color.mainText,
  },
  groupParent: {
    alignItems: "center",
    flexDirection: "row",
    //marginBottom: 30,
  },
  l2400Parent: {
    height: 51,
    width: 80,
    marginRight: 12,
  },
  l2400: {
    fontSize: 20,
    color: Color.mainText,
    fontFamily: FontFamily.headlineH4,
    textAlign: 'center',
  },
  btnFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  porNochePosition: {
    left: 1,
  },
  porNoche: {
    fontSize: FontSize.labelL1_size,
    color: Color.mainText,
    fontFamily: FontFamily.headlineH4,
    textAlign: 'center',
  },
  frameChild: {
    width: 1,
    height: 71,
  },
  alojamientoRentadoPorParent: {
    width: 188,
    marginLeft: 12,
  },
  alojamientoRentadoPor: {
    fontSize: FontSize.labelL1_size,
    color: Color.mainText,
    fontFamily: FontFamily.headlineH4,
  },
  l2400Position: {
    left: 0,
  },
  luisaLopez: {
    fontSize: 20,
    color: Color.mainText,
    fontFamily: FontFamily.headlineH4,
  },
  disponibleParaRentaParent: {
    height: 56,
    width: 300,
    marginBottom: 8,
  },

  disponibleParaRenta: {
    fontSize: FontSize.labelL1_size,
    color: Color.mainText,
    fontFamily: FontFamily.headlineH4,
  },
  diciembre10: {
    fontSize: 20,
    color: Color.mainText,
    fontFamily: FontFamily.headlineH4,
  },
  contenedorPaServicios: {
    marginBottom: 50,
  },
  servicios: {
    fontSize: 20,
    color: Color.mainText,
    marginBottom: 8,
    fontFamily: FontFamily.headlineH4,
    textAlign: "left",
  },
  contenedorServDesc: {
    flexDirection: "row",
    textAlign: "left",
    marginBottom: 4,
    marginTop: 2,
    marginLeft: 2,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 16,
  },
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.mainAccent,
  },
  buttonText: {
    color: Color.mainText2,
    fontSize: 20,
    fontFamily: FontFamily.headlineH4,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  },

  horizontalLine: {
    width: '90%',
    height: 3,
    backgroundColor: '#2d3652',
    marginVertical: 25
  },

});

export default ReservaScreen;
