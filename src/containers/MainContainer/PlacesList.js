/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { ActionConst, Actions } from 'react-native-router-flux';
import firebase from "firebase"

var { height, width } = Dimensions.get('window');

type Props = {};
export default class PlacesList extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            deviceWidth: width,
            deviceHeight: height,
            placesData: []
        }
    }

    componentDidMount(){
        this.loadPlacesList();
    }

    loadPlacesList(){
        firebase.database().ref("Places")
        .once("value")
        .then((snapshot)=>{
            console.log("Recebi os locais!")
            console.log(snapshot.val())
            Alert.alert("Sucesso", "Lista de Locais retornado");
            this.setState({placesData: snapshot.val()})
        })
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Listagem de Locais</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    loginButton: {
        backgroundColor: "#23541b",
        borderRadius: 10,
        padding: 10,
        margin: 20,
        width: width * 0.5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: "bold",
        fontSize: width * 0.05
    }
});
