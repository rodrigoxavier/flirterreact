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
} from "react-native";
import { Actions } from "react-native-router-flux";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

var { height, width } = Dimensions.get("window");

const FirstRoute = () => <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />;
const SecondRoute = () => <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />;

type Props = {};
export default class Tabs extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			deviceWidth: width,
			deviceHeight: height,
			index: 0,
			routes: [{ key: "first", title: "First" }, { key: "second", title: "Second" }],
		};
	}

	render() {
		return (
			<TabView
				navigationState={this.state}
				renderScene={SceneMap({
					first: FirstRoute,
					second: SecondRoute,
				})}
				onIndexChange={index => this.setState({ index })}
				initialLayout={{ width: Dimensions.get("window").width }}
			/>
		);
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
});
