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
export default class NewPlace extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height,
      name: "",
      city: "",
      address: "",
      phone: "",
      openTime: "",
      closeTime: ""
  }
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
        this.setState({
            phone: masked
        })
    })
}

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> this.backToDashboard()} style={styles.backButton} >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titleText}>Cadastro de Local</Text>

        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({name: text})}
          placeholder="Nome do Local"
          value={this.state.name}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({city: text})}
          placeholder="Cidade"
          value={this.state.city}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({address: text})}
          placeholder="Endereço"
          value={this.state.address}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.applyMask(text)}
          placeholder="Telefone"
          maxLength={15}
          keyboardType="numeric"
          value={this.state.phone}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({openTime: text})}
          keyboardType="numeric"
          placeholder="Horário de Abertura"
          value={this.state.openTime}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({closeTime: text})}
          keyboardType="numeric"
          placeholder="Horário de Fechamento"
          value={this.state.closeTime}
        />
        <TouchableOpacity onPress={()=> this.askSave()} style={styles.registerButton} >
          <Text style={styles.buttonText}>Atalizar Dados</Text>
        </TouchableOpacity>
      </View>
    );
  }

  backToDashboard(){
    Actions.dashboard();
  }

  askSave(){
    Alert.alert(
      'Novo local',
      'Confirma o cadastro desse novo local?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
          this.createNewPlace()
        },
      ],
      { cancelable: false }
    )
  }

  createNewPlace(){
    const placeData = {
        name: this.state.name,
        city: this.state.city,
        address: this.state.address,
        phone: this.state.phone,
        openTime: this.state.openTime,
        closeTime: this.state.closeTime,
    }
    firebase.database().ref("Places/")
    .push(placeData)
    .then((snapshot) => {
        firebase.database().ref("Places/"+snapshot.key)
        .update({
            uid: snapshot.key
        });
        Actions.dashboard();
        Alert.alert("Sucesso!", "Local cadastado!")
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
