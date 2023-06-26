import { Image, StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect, FC } from 'react';
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";
import { NavigationProp, useNavigation, RouteProp, NavigationContainer } from '@react-navigation/native';
import ReservaScreen from "./reserva";

type RootStackParamList = {
    HomeScreen: undefined
    ReservaScreen: { idAlojamiento: string, nombreUsuario: string };
    CrearCuenta: undefined;
    // Agrega otras rutas aquí si es necesario
};

interface Props {
    nombreUsuario: string;
    navigation: NavigationProp<RootStackParamList, 'HomeScreen'>;
}

interface IAlojamiento {
    idAlojamiento: string;
    imgSrc: string;
    nombre: string;
    estrellas: string;
    resenas: string;
    ubicacion: string;
    fechaEntrada: string;
    fechaSalida: string;
    precio: string;
    // añade o modifica los campos según necesites
}

const HomeScreen: React.FC<Props> = ({ nombreUsuario }) => {

    const navigation = useNavigation();

    const [alojamientosRecomendados, setAlojamientosRecomendados] = useState<IAlojamiento[]>([]);
    const [alojamientosEconomicos, setAlojamientosEconomicos] = useState<IAlojamiento[]>([]);
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState<IAlojamiento[]>([]);
    const [searching, setSearching] = useState(false);


    // Carga los alojamientos recomendados
    useEffect(() => {
        fetch('http://10.0.2.2:3000/alojamientos/r')
            .then(response => response.json())
            .then(data => setAlojamientosRecomendados(data))
            .catch(error => console.error('Error:', error));
    }, []);

    // Carga los alojamientos economicos
    useEffect(() => {
        fetch('http://10.0.2.2:3000/alojamientos/e')
            .then(response => response.json())
            .then(data => setAlojamientosEconomicos(data))
            .catch(error => console.error('Error:', error));
    }, []);

    // Carga los alojamientos por busqueda de ubicacion
    useEffect(() => {
        if (searchText !== '') {
            fetch(`http://10.0.2.2:3000/buscarAlojamiento/${searchText}`)
                .then(response => response.json())
                .then(data => setSuggestions(data))
                .catch(error => console.error('Error:', error));
        }
    }, [searchText]);

    const handleSearchTextChange = (text: string) => {
        setSearchText(text);
        if (text === '') {
            setSearching(false);
        } else {
            setSearching(true);
        }
    };

    return (
        <ScrollView scrollEnabled={true}>
            <View style={styles.homepageV1}>

                <View style={styles.topBackground} >

                    <View style={styles.textContainer}>
                        <Text style={styles.welcomeText}>
                            Bienvenido,
                        </Text>
                        <Text style={styles.nameText}>
                            {nombreUsuario}
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>

                        <Image source={require('./icons/magnifier.png')} style={styles.inputImage} />

                        <TextInput
                            style={styles.input}
                            placeholder="Dónde viajarás hoy?"
                            placeholderTextColor="#fff"
                            onChangeText={handleSearchTextChange}
                            textAlign="center"
                        />

                        <Image source={require('./icons/filters.png')} style={styles.inputImage} />

                    </View>

                </View>

                {searching ?
                    (
                        <View style={[styles.frameGroup, styles.frameParentPosition]}>
                            <View style={styles.recomendadosParent}>
                                <Text style={[styles.recomendados, styles.recomendadosLayout]}>
                                    Resultados
                                </Text>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row' }}>
                                    {suggestions.map((alojamiento) => {
                                        return (
                                            <View key={alojamiento.idAlojamiento} style={styles.frameWrapper}>
                                                <View style={[styles.previewCard1Parent, styles.groupChildPosition]}>
                                                    <View>
                                                        <View style={styles.groupLayout}>
                                                            <Image
                                                                style={[styles.groupChild, styles.groupLayout]}
                                                                resizeMode="cover"
                                                                source={{ uri: alojamiento.imgSrc }}
                                                            />
                                                            <View style={styles.frameContainer}>
                                                                <View>
                                                                <TouchableOpacity onPress={() => navigation.navigate('ReservaScreen' , { idAlojamiento: alojamiento.idAlojamiento, nombreUsuario: nombreUsuario })}>
                                                                    <Text style={[styles.villaValor, styles.villaValorTypo]}>
                                                                        {alojamiento.nombre}
                                                                    </Text>
                                                                    </TouchableOpacity>
                                                                    <View style={styles.vectorParent}>
                                                                        <Image
                                                                            style={styles.vectorIcon}
                                                                            resizeMode="cover"
                                                                            source={require("../assets/vector.png")}
                                                                        />
                                                                        <Text style={[styles.reseas, styles.reseasTypo]}>
                                                                            {alojamiento.estrellas} | {alojamiento.resenas}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View style={styles.reseas}>

                                                            <Text style={[styles.laCeibaHonduras, styles.reseasTypo]}>
                                                                {alojamiento.ubicacion}
                                                            </Text>

                                                            <Text style={styles.diciembre10}>{alojamiento.fechaEntrada} - {alojamiento.fechaSalida}</Text>
                                                            <Text style={styles.diciembre10}>L. {alojamiento.precio} por noche</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    )
                    :
                    (
                        <>
                            <View style={[styles.frameGroup, styles.frameParentPosition]}>
                                <View style={styles.recomendadosParent}>
                                    <Text style={[styles.recomendados, styles.recomendadosLayout]}>
                                        Recomendados
                                    </Text>
                                </View>

                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={{ flexDirection: 'row' }}>
                                        {alojamientosRecomendados.map((alojamiento) => {
                                            return (
                                                <View key={alojamiento.idAlojamiento} style={styles.frameWrapper}>
                                                    <View style={[styles.previewCard1Parent, styles.groupChildPosition]}>
                                                        <View>
                                                            <View style={styles.groupLayout}>
                                                                <Image
                                                                    style={[styles.groupChild, styles.groupLayout]}
                                                                    resizeMode="cover"
                                                                    source={{ uri: alojamiento.imgSrc }}
                                                                />
                                                                <View style={styles.frameContainer}>
                                                                    <View>
                                                                        <TouchableOpacity onPress={() => navigation.navigate('ReservaScreen', { idAlojamiento: alojamiento.idAlojamiento, nombreUsuario: nombreUsuario })}>
                                                                            <Text style={[styles.villaValor, styles.villaValorTypo]}>
                                                                                {alojamiento.nombre}
                                                                            </Text>
                                                                        </TouchableOpacity>

                                                                        <View style={styles.vectorParent}>
                                                                            <Image
                                                                                style={styles.vectorIcon}
                                                                                resizeMode="cover"
                                                                                source={require("../assets/vector.png")}
                                                                            />
                                                                            <Text style={[styles.reseas, styles.reseasTypo]}>
                                                                                {alojamiento.estrellas} | {alojamiento.resenas}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={styles.reseas}>

                                                                <Text style={[styles.laCeibaHonduras, styles.reseasTypo]}>
                                                                    {alojamiento.ubicacion}
                                                                </Text>

                                                                <Text style={styles.diciembre10}>{alojamiento.fechaEntrada} - {alojamiento.fechaSalida}</Text>
                                                                <Text style={styles.diciembre10}>L. {alojamiento.precio} por noche</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </ScrollView>
                            </View>
                            
                            <View style={[styles.frameParent3, styles.frameParentPosition]}>
                                <View style={styles.recomendadosParent}>
                                    <Text style={[styles.recomendados, styles.recomendadosLayout]}>
                                        Económicos
                                    </Text>
                                </View>
                                

                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={{ flexDirection: 'row' }}>
                                        {alojamientosEconomicos.map((alojamiento) => {
                                            return (
                                                <View key={alojamiento.idAlojamiento} style={styles.frameWrapper}>
                                                    <View style={[styles.previewCard1Parent, styles.groupChildPosition]}>
                                                        <View>
                                                            <View style={styles.groupLayout}>
                                                                <Image
                                                                    style={[styles.groupChild, styles.groupLayout]}
                                                                    resizeMode="cover"
                                                                    source={{ uri: alojamiento.imgSrc }}
                                                                />
                                                                <View style={styles.frameContainer}>
                                                                    <View>
                                                                    <TouchableOpacity onPress={() => navigation.navigate('ReservaScreen' , { idAlojamiento: alojamiento.idAlojamiento, nombreUsuario: nombreUsuario })}>
                                                                        <Text style={[styles.villaValor, styles.villaValorTypo]}>
                                                                            {alojamiento.nombre}
                                                                        </Text>
                                                                        </TouchableOpacity>
                                                                        <View style={styles.vectorParent}>
                                                                            <Image
                                                                                style={styles.vectorIcon}
                                                                                resizeMode="cover"
                                                                                source={require("../assets/vector.png")}
                                                                            />
                                                                            <Text style={[styles.reseas, styles.reseasTypo]}>
                                                                                {alojamiento.estrellas} | {alojamiento.resenas}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={styles.reseas}>
                                                                <Text style={[styles.laCeibaHonduras, styles.reseasTypo]}>
                                                                    {alojamiento.ubicacion}
                                                                </Text>
                                                                <Text style={styles.diciembre10}>{alojamiento.fechaEntrada} - {alojamiento.fechaSalida}</Text>
                                                                <Text style={styles.diciembre10}>L. {alojamiento.precio} por noche</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </ScrollView>
                            </View>
                        </>
                    )
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#2D3652',
    },
    textContainer: {
        justifyContent: 'flex-start',
        marginTop: 20,
        paddingLeft: 20,
    },
    welcomeText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
    },
    nameText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'left',
        marginBottom: 20,
    },
    topBackground: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: "23%",
        backgroundColor: "#495C83",
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#88B4F5',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: '90%',
        marginHorizontal: 20,
        marginBottom: 17.5,
        backgroundColor: 'rgba(136, 180, 245, 0.3)',
    },
    input: {
        borderColor: '#2196F3',
        borderRadius: 5,
        color: '#fff',
        flex: 1,
    },
    inputImage: {
        margin: 20,
        width: 30,
        height: 30,
    },
    frameParentPosition: {
        left: 30,
        position: "absolute",
    },
    alejandroTypo: {
        width: 368,
        textAlign: "left",
        fontFamily: FontFamily.titleT2,
        color: Color.ghostwhite,
    },
    btnPrimario1Layout: {
        borderRadius: Border.br_xl,
        overflow: "hidden",
    },
    outlineLayout1: {
        height: 24,
        width: 24,
        overflow: "hidden",
    },
    recomendadosLayout: {
        height: 42,
        alignItems: "center",
    },
    groupChildPosition: {
        left: 0,
        top: 0,
        position: "absolute",
    },
    groupLayout: {
        height: 210,
        width: 340,
        marginBottom: 10,
    },
    villaValorTypo: {
        fontSize: 20,
        display: "flex",
        textAlign: "left",
        fontFamily: FontFamily.titleT2,
    },
    reseasTypo: {
        alignItems: "flex-end",
        lineHeight: 22,
        fontSize: FontSize.titleT3_size,
        display: "flex",
        color: Color.mainText,
        textAlign: "left",
        fontFamily: FontFamily.titleT2,
    },
    tabInnerLayout1: {
        width: 69,
        height: 80,
        top: 0,
        position: "absolute",
        overflow: "hidden",
    },
    outlineParentPosition: {
        bottom: "17.5%",
        top: "18.75%",
        height: "63.75%",
        position: "absolute",
    },
    outlineLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        bottom: "52.94%",
        top: "0%",
        height: "47.06%",
        position: "absolute",
        overflow: "hidden",
    },
    inicioTypo: {
        textAlign: "center",
        fontSize: FontSize.size_sm,
        top: 34,
        fontFamily: FontFamily.titleT2,
        left: 0,
        position: "absolute",
    },
    tabInnerLayout: {
        width: 70,
        height: 80,
        opacity: 0.7,
        top: 0,
        position: "absolute",
        overflow: "hidden",
    },
    homepageV1Child: {
        height: 280,
        display: "none",
        width: 428,
        left: 0,
        top: 0,
        position: "absolute",
    },
    homepageV1Item: {
        marginLeft: 214,
        top: 248,
        borderTopLeftRadius: Border.br_11xl,
        borderTopRightRadius: Border.br_11xl,
        height: 248,
        transform: [
            {
                rotate: "-180deg",
            },
        ],
        backgroundColor: Color.mainSecondary,
        left: "50%",
        width: 428,
        position: "absolute",
    },
    bienvenido: {
        fontSize: FontSize.titleT1_size,
    },
    alejandro: {
        fontSize: FontSize.headlineH4_size,
        marginTop: 10,
    },
    dndeViajarsHoy: {
        width: 240,
        marginLeft: 20,
        display: "flex",
        color: Color.mainText,
        fontSize: FontSize.titleT2_size,
        alignItems: "center",
        textAlign: "left",
        fontFamily: FontFamily.titleT2,
    },
    filters24Outline: {
        marginLeft: 20,
    },
    magnifier24OutlineParent: {
        alignItems: "center",
        flexDirection: "row",
    },
    inputSearchFilter: {
        backgroundColor: "rgba(136, 180, 245, 0.3)",
        borderStyle: "solid",
        borderColor: "#88b4f5",
        borderWidth: 2,
        padding: Padding.p_xl,
        marginTop: 20,
    },
    frameParent: {
        top: 50,
    },
    recomendados: {
        width: 267,
        fontSize: FontSize.headlineH4_size,
        display: "flex",
        textAlign: "left",
        fontFamily: FontFamily.titleT2,
        color: 'white',
        height: 42,
      },
    botnTerciario: {
        textDecorationLine: "underline",
        textAlign: "right",
        color: Color.mainText,
        fontSize: FontSize.titleT2_size,
        fontFamily: FontFamily.titleT2,
    },
    btnPrimario1: {
        width: 91,
        paddingLeft: Padding.p_3xs,
        paddingTop: Padding.p_3xs,
        paddingBottom: Padding.p_3xs,
        justifyContent: "flex-end",
        marginLeft: 10,
        flexDirection: "row",
        borderRadius: Border.br_xl,
        overflow: "hidden",
    },
    recomendadosParent: {
        flexDirection: "row",
    },
    groupChild: {
        left: 0,
        top: 0,
        position: "absolute",
        borderRadius: 25,
    },
    villaValor: {
        width: 198,
        color: Color.mainText,
        alignItems: "center",
    },
    vectorIcon: {
        width: 17,
        height: 16,
    },
    reseas2: {
        width: 174,
        marginLeft: 320,
    },
    reseas: {
        width: 174,
        marginLeft: 5,
    },
    vectorParent: {
        marginTop: 5,
        flexDirection: "row",
    },
    maskGroupIcon: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    frameContainer: {
        top: 147,
        left: 20,
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
    },
    laCeibaHonduras: {
        width: 288,
        alignItems: "flex-end",
    },
    diciembre10: {
        opacity: 0.7,
        lineHeight: 22,
        fontSize: FontSize.titleT3_size,
        marginTop: 5,
        width: 288,
        display: "flex",
        color: Color.mainText,
        alignItems: "center",
        textAlign: "left",
        fontFamily: FontFamily.titleT2,
    },
    laCeibaHondurasParent: {
        marginTop: 10,
    },
    previewCard11: {
        marginLeft: 20,
    },
    previewCard1Parent: {
        paddingRight: Padding.p_xl,
        flexDirection: "row",
    },
    frameWrapper: {
        width: 398,
        height: 297,
        marginTop: 10,
    },
    frameWrapper2: {
        width: 398,
        height: 297,
        marginTop: 1,
    },
    frameGroup: {
        top: 268,
    },
    frameParent3: {
        top: 657,
    },
    heart24Outline: {
        width: "41.38%",
        right: "29.31%",
        left: "29.31%",
    },
    favoritos: {
        color: Color.mainAccent,
    },
    heart24OutlineParent: {
        width: "84.06%",
        right: "7.25%",
        left: "8.7%",
    },
    tabBarInner: {
        left: 100,
        opacity: 0.7,
    },
    house24Outline: {
        width: "70.59%",
        right: "14.71%",
        left: "14.71%",
    },
    inicio: {
        color: Color.mainText,
    },
    house24OutlineParent: {
        width: "49.28%",
        right: "24.64%",
        left: "26.09%",
    },
    tabBarChild: {
        left: 21,
    },
    building24Outline: {
        width: "40%",
        right: "30%",
        left: "30%",
    },
    building24OutlineParent: {
        width: "85.71%",
        right: "7.14%",
        left: "7.14%",
    },
    tabBarInner1: {
        left: 179,
    },
    support24Outline: {
        width: "36.92%",
        right: "32.31%",
        left: "30.77%",
    },
    support24OutlineParent: {
        width: "94.2%",
        right: "2.9%",
        left: "2.9%",
    },
    tabBarInner2: {
        left: 259,
        opacity: 0.7,
    },
    profile24Outline: {
        width: "75%",
        right: "12.5%",
        left: "12.5%",
    },
    profile24OutlineParent: {
        width: "45.71%",
        right: "27.14%",
        left: "27.14%",
    },
    tabBarInner3: {
        left: 338,
    },
    tabBar: {
        marginLeft: -214,
        bottom: 0,
        height: 80,
        backgroundColor: Color.mainSecondary,
        left: "50%",
        width: 428,
        position: "absolute",
        overflow: "hidden",
    },
    homepageV1: {
        backgroundColor: Color.mainBackground,
        flex: 1,
        width: "100%",
        height: 1110,
        overflow: "hidden",
    },
    contentContainer: {
        flexGrow: 1,
    },
    stickyTabBar: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
});

export default HomeScreen;