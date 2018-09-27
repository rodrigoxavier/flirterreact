/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';

var {height, width} = Dimensions.get('window');

type Props = {};
export default class Login extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      text: "Meu Texto Aqui",
      deviceWidth: width,
      deviceHeight: height
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity onPress={()=> this.openSignup()} style={styles.askButton} >
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
        
      </View>
    );
  }

  openAskAlert(){
    Alert.alert(
      'Título do Alerta',
      'Você quer mesmo confirmar?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
          this.openSimpleAlert()
        },
      ],
      { cancelable: false }
    )
  }

  openSimpleAlert(){
    Alert.alert("Olá", "Você confirmou");
  }

  openSignup(){
    Actions.signup();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputStyle:
    {height: height * 0.1, 
      width: width * 0.9, 
      borderBottomColor: 'gray', 
      borderBottomWidth: 1
  },
  mainButton:{
    backgroundColor: "#4f8942",
  },
  textButton: {
    color: "white",
    margin: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
  },
  askButton: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 10,
    margin: 20
  },
  buttonText:{
    color: "white"
  }
});
