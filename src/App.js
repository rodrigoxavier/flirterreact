import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import firebase from 'firebase';

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
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: "sua chave aqui",
        authDomain: "seu domain aqui",
        databaseURL: "sua ulr aqui",
        projectId: "seu project id aqui",
        storageBucket: "seu bucket aqui",
        messagingSenderId: "seu id aqui"
      })
    }
  }

  render() {
    return (
      <Router></Router>
    );
  }
}

export default App