/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { ActionConst, Actions } from 'react-native-router-flux';
import firebase from "firebase"

var {height, width} = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class PlaceList extends Component<Props> {


  componentDidMount(){
    this.searchPlaces();
  }

  searchPlaces(){
    firebase.database().ref("Places")
    .orderByChild("cidade")
    .equalTo("Belo Horizonte")
    .once("value")
    .then((snapshot)=>{
      console.log("Meus locais")
      console.log(snapshot.val())
    })


    /*firebase.database().ref("Users")
            .orderByChild("uid")
            .equalTo(user.uid)
            .once("value")
            .then((snapshot)=>{
                this.setState({userData: snapshot.val()[user.uid]})
            })*/
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Lista de Locais</Text>
        <TouchableOpacity onPress={()=> this.goToDashboard()} style={styles.loginButton} >
          <Text style={styles.buttonText}>Voltar para Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  goToDashboard(){
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
  loginButton: {
    backgroundColor: "#23541b",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: "bold",
    fontSize: width * 0.05
  }
});
