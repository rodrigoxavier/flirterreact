/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Alert,
	Dimensions,
	TouchableOpacity,
    TextInput,
    Animated
} from "react-native";
import { Actions } from "react-native-router-flux";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

var { height, width } = Dimensions.get("window");

const FirstRoute = () => <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />;
const SecondRoute = () => <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />;
const ThirdRoute = () => <View style={[styles.scene, { backgroundColor: "blue" }]} />;
const FourthRoute = () => <View style={[styles.scene, { backgroundColor: "yellow" }]} />;

type Props = {};
export default class Tabs extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			deviceWidth: width,
			deviceHeight: height,
			index: 2,
			routes: [
				{ key: "primeira", title: "Home" },
				{ key: "segunda", title: "Config" },
				{ key: "terceira", title: "Terceiro" },
				{ key: "quarta", title: "Quarto" },
			],
		};
	}

	render() {
		return (
			<TabView
				navigationState={this.state}
				tabBarPosition="bottom"
				renderTabBar={this._renderTabBar}
				renderScene={this._renderScene}
				onIndexChange={index => this.setState({ index })}
				initialLayout={{ width: Dimensions.get("window").width }}
			/>
		);
    }
    
    _renderScene = SceneMap({
        primeira: FirstRoute,
        segunda: SecondRoute,
        terceira: ThirdRoute,
        quarta: FourthRoute,
    })

    _renderTabBar = props => (
        <TabBar
          {...props}
          renderIndicator={this._renderIndicator}
          renderIcon={this._renderIcon}
          style={styles.tabbar}
        />
      );

      _renderIcon = ({ route }) => (
        <FontAwesome name="users" size={24} style={styles.icon} />
      );

      _renderIndicator() {
        _renderIndicator = props => {
            const { width, position } = props;
            const inputRange = [
              0,
              0.48,
              0.49,
              0.51,
              0.52,
              1,
              1.48,
              1.49,
              1.51,
              1.52,
              2,
            ];
        
            const scale = position.interpolate({
              inputRange,
              outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
            });
            const opacity = position.interpolate({
              inputRange,
              outputRange: inputRange.map(x => {
                const d = x - Math.trunc(x);
                return d === 0.49 || d === 0.51 ? 0 : 1;
              }),
            });
            const translateX = position.interpolate({
              inputRange: inputRange,
              outputRange: inputRange.map(x => Math.round(x) * width),
            });
            const backgroundColor = position.interpolate({
              inputRange,
              outputRange: inputRange.map(
                x => props.navigationState.routes[Math.round(x)].color
              ),
            });
        
            return (
              <Animated.View
                style={[styles.container, { width, transform: [{ translateX }] }]}
              >
                <Animated.View
                  style={[
                    styles.indicator,
                    { backgroundColor, opacity, transform: [{ scale }] },
                  ]}
                />
              </Animated.View>
            );
          };
	}

	backToDashboard() {
		Actions.dashboard();
	}
}

const styles = StyleSheet.create({
	scene: {
		flex: 1,
	},
	buttonText: {
		color: "white",
    },
    tabbar: {
        backgroundColor: '#263238',
        overflow: 'hidden',
      },
      icon: {
          color: "white"
      }
});
