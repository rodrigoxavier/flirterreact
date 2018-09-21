/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');

import { Actions } from 'react-native-router-flux';

const instructions = Platform.select({
  ios: 'Texto IOS',
  android:
    'Texto Android',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      text: "Lalalala",
      deviceWidth: width,
      deviceHeight: height
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: this.state.deviceHeight * 0.2, width: this.state.deviceWidth * 0.9, borderBottomColor: 'gray', borderBottomWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );
  }

  openSignUp(){
    Actions.signup();
    //Alert.alert("Oba!!", "Vou abrir a tela");
    /*Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )*/
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
});
