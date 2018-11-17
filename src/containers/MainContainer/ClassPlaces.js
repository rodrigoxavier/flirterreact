/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert, Dimensions, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase"
import _ from "lodash"

var { height, width } = Dimensions.get('window');

type Props = {};
export default class ClassPlaces extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            deviceWidth: width,
            deviceHeight: height,
            placesData: []
        }
    }

    componentDidMount(){
        this.searchPlaces();
    }

    searchPlaces(){
        firebase.database().ref("Places")
        .once("value")
        .then((snapshot)=>{
            const placesValues = _.values(snapshot.val());
            this.setState({placesData : placesValues});
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.backToDashboard()} style={styles.backButton} >
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.titleText}>Lista de Locais</Text>
                <FlatList
                    data={this.state.placesData}
                    renderItem={({item}) => this.renderPlace(item)}/>
            </View>
        );
    }

    renderPlace(item){
        return (
            <TouchableOpacity onPress={() => this.openPlaceDetail(item)} style={styles.rowView} >
                <Text>{item.nome} - </Text>
                <Text>{item.cidade}</Text>
            </TouchableOpacity>
        )
    }

    openPlaceDetail(item){
        //Alert.alert(local.nome, local.cidade);
        Actions.placeClassDetails({item});
    }

    backToDashboard() {
        Actions.dashboard();
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
    backButton: {
        backgroundColor: "gray",
        borderRadius: 10,
        padding: 10,
        margin: 20,
        alignSelf: "flex-start"
    },
    registerButton: {
        backgroundColor: "green",
        borderRadius: 10,
        padding: 10,
        margin: 20,
        width: width * 0.8,
        alignItems: 'center'
    },
    buttonText: {
        color: "white"
    },
    inputStyle: {
        height: height * 0.06,
        width: width * 0.85,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        margin: width * 0.04
    },
    titleText: {
        fontSize: 30,
        alignItems: 'center',
        textAlign: 'center',
        color: "#039BE5"
    },
    rowView:{
        flex: 1,
        flexDirection: 'row'
    }
});
