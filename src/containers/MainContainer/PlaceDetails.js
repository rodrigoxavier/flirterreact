/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux'
import firebase from "firebase"

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class PlaceDetails extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      placeData: props.place
    };
  }

  render() {
    console.log("Local recebido")
    console.log(this.state.placeData)
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.goToPlaceList()} style={styles.loginButton} >
          <Text style={styles.buttonText}>Voltar para a lista</Text>
        </TouchableOpacity>
        <Text style={styles.placeName}>{this.state.placeData.nome}</Text>
        <TouchableOpacity onPress={() => this.askRemove()} style={styles.loginButton} >
          <Text style={styles.buttonText}>Remover Local</Text>
        </TouchableOpacity>
      </View>
    );
  }

  goToPlaceList() {
    Actions.placeList();
  }

  askRemove() {
    Alert.alert("Atenção",
      "Deseja remover esse local?\n" + this.state.placeData.uid,
      [
        { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Remover', onPress: () => this.removePlace() },
      ])
  }

  removePlace() {
    var placeRef = firebase.database().ref('Places/'+this.state.placeData.uid);
    placeRef.remove()
      .then(function () {
        console.log("Remove succeeded.")
        Alert.alert("", "Local removido com sucesso!")
        Actions.placeList();
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message)
      });
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
    alignItems: 'center'
  },
  buttonText: {
    color: "white"
  },
  placeName: {
    color: "blue",
    fontSize: 50
  }
});
