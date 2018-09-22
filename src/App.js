import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

//import firebase from 'firebase';

import Router from './Router';

const customTextProps = {
  style: {
    fontFamily: 'roboto-regular'
  }
};

console.disableYellowBox = true;

class App extends Component {
  componentWillMount () {
    //Posso Fazer qualquer tipo de configuração global aqui como por exemplo o Firebase
    /*if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: "AIzaSyDMQfC7QQArHtedDhUmQtaF-MHy5usQPjI",
        authDomain: "aulareact-f3277.firebaseapp.com",
        databaseURL: "https://aulareact-f3277.firebaseio.com",
        projectId: "aulareact-f3277",
        storageBucket: "aulareact-f3277.appspot.com",
        messagingSenderId: "674457894840"
      })
    }*/ss
  }

  render() {
    return (
      <Router></Router>
    );
  }
}

export default App