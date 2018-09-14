import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Router from './Router';

const customTextProps = {
  style: {
    fontFamily: 'roboto-regular'
  }
};

console.disableYellowBox = true;

class App extends Component {
  componentWillMount () {
    //Posso Fazer qualquer tipo de configuração global aqui
  }

  render() {
    return (
      <Router />
    );
  }
}

export default App