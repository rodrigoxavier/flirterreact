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
import firebase from "firebase"

var {height, width} = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class UserProfile extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height,
      userData: {

      }
    };
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user) {
        this.setState({userUid: user.uid});
        if (user){//Se é diferente de null, se é true, se é diferente de vazio, se é diferente de undefind
            firebase.database().ref("Users")
            .orderByChild("uid")
            .equalTo(user.uid)
            .once("value")
            .then((snapshot)=>{
                this.setState({userData: snapshot.val()[user.uid]})
            })
        }
    }.bind(this));
  }

  valueChanged(field, text){
    let userData = this.state.userData;
    userData[field] = text;

    this.setState({userData: userData});
  }

   maskTEL(v) {
    return new Promise((resolve, reject) => {
        if(!v){
            resolve("");
            return;
        }
        v = v.replace(/\D/g, "");
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
        v = v.replace(/(\d)(\d{4})$/, "$1-$2");
        resolve(v);
    });
}

applyMask(value){
    this.maskTEL(value).then(masked => {
        let userData = this.state.userData;
        userData.telefone = masked;
        this.setState({
            userData: userData
        })
    })
}

  render() {
      console.log("Dados do usuario", this.state.userData)
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> this.backToDashboard()} style={styles.backButton} >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titleText}>Edição de Usuário</Text>

        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.valueChanged("nome", text)}
          placeholder="Ex: João Silva"
          value={this.state.userData.nome}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.valueChanged("email", text)}
          placeholder="Ex: fulano@gmail.com"
          editable={false}
          value={this.state.userData.email}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.valueChanged("cidade", text)}
          placeholder="Ex: Belo Horizonte"
          value={this.state.userData.cidade}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.applyMask(text)}
          placeholder="Ex: (31) 99999=9999"
          maxLength={15}
          keyboardType="numeric"
          value={this.state.userData.telefone}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.valueChanged("idade", text)}
          keyboardType="numeric"
          placeholder="Ex: 19"
          value={this.state.userData.idade}
        />
        <TouchableOpacity onPress={()=> this.askUpdate()} style={styles.registerButton} >
          <Text style={styles.buttonText}>Atalizar Dados</Text>
        </TouchableOpacity>
      </View>
    );
  }

  backToDashboard(){
    Actions.dashboard();
  }

  askUpdate(){
    Alert.alert(
      'Atualizar',
      'Confirma atualizar com os seguintes dados?\nNome: ' + this.state.userData.nome + "\nEmail: " + this.state.userData.email ,
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
          //this.confirmRegister()
          this.updateUser()
        },
      ],
      { cancelable: false }
    )
  }

  updateUser(){
    const userData = this.state.userData;
    const userUid = this.state.userUid;
    firebase.database().ref("Users/" + userUid)
    .update(userData)
    .then(() => {
        Actions.dashboard();
        Alert.alert("Sucesso!", "Dados atualizados.")
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
  buttonText:{
    color: "white"
  },
  inputStyle:{
    height: height * 0.06, 
    width: width * 0.85, 
    borderBottomColor: 'gray', 
    borderBottomWidth: 1,
    margin: width * 0.04
  },
  titleText:{
    fontSize: 30,
    alignItems: 'center',
    textAlign: 'center',
    color: "#039BE5"
  }
});
