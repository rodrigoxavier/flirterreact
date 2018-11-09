/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Alert, Image, Dimensions, TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase";

var {height, width} = Dimensions.get('window');

type Props = {};
export default class Login extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height,
      email: "joao@joao.com",
      senha: "semsenha"
    };
  }

  componentDidMount(){
    //const currentUser = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("Current user ")
        console.log(JSON.stringify(user))
        if (user){//Se é diferente de null, se é true, se é diferente de vazio, se é diferente de undefind
          Actions.dashboard();
        }
      } else {
        // No user is signed in.
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logoStyle} source={require('../../Images/logo.png')}/>
        <Text style={styles.titleText}>Flirter</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({email: text})}
          placeholder="Ex: fulano@gmail.com"
          value={this.state.email}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({senha: text})}
          placeholder="Senha aqui"
          secureTextEntry
          value={this.state.senha}
        />
        <TouchableOpacity onPress={()=> this.loginUser( this.state.email, this.state.senha)} style={styles.loginButton} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.askForgotPassword()} style={styles.forgotButton} >
          <Text style={styles.forgotText}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.openSignup()} style={styles.askButton} >
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    );
  }

  askForgotPassword(){
    if (this.state.email == ""){
      Alert.alert("Erro", "Você precisa informar o seu e-mail");
    }
    else {
      Alert.alert(
        'Recuperar senha',
        'Deseja realmente recuperar a senha do e-mail?\n' + this.state.email + '?',
        [
          {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => 
            //this.confirmRegister()
            this.resetPassword()
          },
        ],
        { cancelable: false }
      )
    }
  }

  resetPassword(){
    const email = this.state.email
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Sucesso', "Um e-mail de recuperação de senha foi enviado para: "+email);
      })
      .catch((error) => this.resetPasswordFail(error))
  }

  resetPasswordFail(error){
    console.log("Erro ao recuperar senha: "+error)
  }

  loginUser(email, password){
    //Alert.alert("Confirmar dados", "Verifique se os dados estão corretos.\nEmail: " + email + "\nSenha: "+ password);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then ((dadosUsuario)=> {
      //Alert.alert("Sucesso!");
      Actions.dashboard();
    })
    .catch(function(error) {
      // Handle Errors here.
      if (error.code == "auth/user-not-found"){
        Alert.alert("Atenção!", "Usuário não encontrado");
      }
      else {
        Alert.alert("Atenção!", "Procure o dev e brigue com ele pq você não sabe sua senha.");
      }
      //Alert.alert("Errou!!", "Código: " + error.code + "\nMensagem: " + error.message);
      // ...
    });
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
  loginButton: {
    backgroundColor: "#23541b",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.8,
    alignItems: 'center'
  },
  forgotButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.8,
    alignItems: 'center'
  },
  buttonText:{
    color: "white"
  },
  forgotText:{
    color: "blue",
    textDecorationLine: "underline"
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
  },
  inputStyle:{
    height: height * 0.06, 
    width: width * 0.85, 
    borderBottomColor: 'gray', 
    borderBottomWidth: 1,
    margin: width * 0.04
  },
});
