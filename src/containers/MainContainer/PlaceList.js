/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import { ActionConst, Actions } from 'react-native-router-flux';
import firebase from "firebase"
import _ from "lodash"

var {height, width} = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class PlaceList extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
        deviceWidth: width,
        deviceHeight: height,
        placesData: []
    };
  }

  componentDidMount(){
    this.searchPlaces();
  }

  searchPlaces(){
    firebase.database().ref("Places")
    .once("value")
    .then((snapshot)=>{
      const placesMaped = _.values(snapshot.val());
      this.setState({placesData: placesMaped})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Lista de Locais</Text>
        <TouchableOpacity onPress={()=> this.goToDashboard()} style={styles.loginButton} >
          <Text style={styles.buttonText}>Voltar para Dashboard</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.placesData}
          renderItem={({item})  => this.renderPlace(item)}
        />
      </View>
    );
  }

  renderPlace(item){
    return (
      <TouchableOpacity style={styles.rowView} onPress={()=>{this.openDetails(item)}}>
        <Text>{item.nome} - </Text>
        <Text>{item.cidade}</Text>
      </TouchableOpacity>
      
    )
  }

  openDetails(place){
    Actions.placeDetails({place: place})
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
  },
  rowView:{
    flex: 1,
    flexDirection: "row"
  }
});
