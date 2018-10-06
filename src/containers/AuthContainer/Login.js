/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Alert, Image, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';

var {height, width} = Dimensions.get('window');

type Props = {};
export default class Login extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logoStyle} source={require('../../Images/logo.png')}/>
        <Text style={styles.titleText}>Flirter</Text>
        <TouchableOpacity onPress={()=> this.openSignup()} style={styles.askButton} >
          <Text style={styles.buttonText}>Cadastro</Text>
    </TouchableOpacity>
      </View>
    );
  }

  textoCondicional(condicao){
    if (condicao == "maior de minas"){
      Alert.alert("Atenção", "Cruzeirão Cabuloso");
    }
    else {
      Alert.alert("Atenção", "Não tem bi");
    }
    
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
    backgroundColor: "#039BE5",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.8,
    alignItems: 'center'
  },
  buttonText:{
    color: "white"
  },
  welcomeText: {
    color: "gray",
    fontSize: 38,
    alignItems: "center",
    textAlign: 'center'
  },
  logoStyle: {
    width: width * 0.55,
    height: width * 0.55
  },
  titleText:{
    fontSize: 30,
    alignItems: 'center',
    textAlign: 'center',
    color: "#039BE5"
  },
  meuBotao:{
    backgroundColor: 'green',
    width: width * 0.8,
    height: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  estiloTexto:{
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'center'
  }
});
