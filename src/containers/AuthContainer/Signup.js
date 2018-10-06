/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
var {height, width} = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class SignUp extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height,
      nome: "Nome aqui",
      email: "E-mail aqui",
      cidade: "Cidade aqui",
      telefone: "Telefone aqui",
      idade: "Idade aqui"
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Cadastro de Usuário</Text>
        <TouchableOpacity onPress={()=> this.backToLogin()} style={styles.backButton} >
          <Text style={styles.buttonText}>Voltar para login</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({nome: text})}
          value={this.state.nome}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({cidade: text})}
          value={this.state.cidade}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({telefone: text})}
          value={this.state.telefone}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({idade: text})}
          value={this.state.idade}
        />
        <TouchableOpacity onPress={()=> this.askRegister()} style={styles.registerButton} >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  backToLogin(){
    Actions.login();
  }

  askRegister(){
    Alert.alert(
      'Registrar',
      'Confirma o seu registo?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
          this.confirmRegister()
        },
      ],
      { cancelable: false }
    )
  }

  registerUser (email, password, name) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((currentUser) => {
      firebase.database().ref("Users/"+currentUser.uid).update({
        uid: currentUser.uid,
        email: currentUser.email,
        name: name
      });
      Alert.alert("Sucesso!", "Usuário criado");
      Actions.pop();
    })
    .catch((error) => { 
      console.log("firebase error: " + error.code);
    });
  }

  confirmRegister () {
    const userData = {
      nome: this.state.nome,
      email: this.state.email,
      cidade: this.state.cidade,
      telefone: this.state.telefone,
      idade: this.state.idade
    }
      firebase.database().ref("Users/").push(userData)
      .then(snapshot, () => {
        Alert.alert("Sucesso!", "Usuário criado");
        Actions.pop();
      })
      
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
    margin: 20
  },
  registerButton: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.8,
    alignItems: 'center'
  },
  buttonText:{
    color: "white"
  },
  inputStyle:{
    height: height * 0.06, 
    width: width * 0.85, 
    borderBottomColor: 'gray', 
    borderBottomWidth: 1,
    margin: width * 0.04
  }
});
