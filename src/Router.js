import React, { Component } from 'react'
import {
  View,
  StatusBar,
} from 'react-native'

import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux'

import Login from './containers/AuthContainer/Login'
import Signup from './containers/AuthContainer/Signup'
import Dashboard from './containers/MainContainer/Dashboard'
import BarDetails from './containers/MainContainer/PlaceDetails'

class RouterComponent extends Component {
  constructor (props) {
    super (props);
    this.state = {};
  }

  render () {
    const {container, sceneStyle, navigationBarStyle, titleStyle, tabBarStyle} = styles;
    return (
      <View style={[container]}>
        <StatusBar
          backgroundColor='black'
          translucent
          barStyle='light-content'/>
        <Router
          sceneStyle={sceneStyle}
          navigationBarStyle={navigationBarStyle}
          titleStyle={titleStyle}>
          <Scene key='app'>
            <Scene key='auth' initial hideNavBar>
              <Scene key='login'
                component={Login}
                initial />
              <Scene
                key='signup'
                component={Signup} />
              <Scene
                  key='dashboard'
                  component={Dashboard} />
              <Scene
                key='barDetails'
                component={BarDetails} />
            </Scene>
          </Scene>
        </Router>
      </View>
    )
  };
}

const styles = {
  container: {
    flex: 1
  },
  sceneStyle: {
    backgroundColor: '#F5F6F7'
  },
  navigationBarStyle: {
    elevation: 10,
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  titleStyle: {
    color: '#FFFFFF',
    letterSpacing: 1,
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: -30,
  }
}

export default RouterComponent
