import React from "react";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import Heatmap from "./screens/Heatmap";
import Newsfeed from "./screens/Newsfeed";
import {createDrawerNavigator} from "@react-navigation/drawer";
import PermissionPage from "./screens/PermissionPage/PermissionPage";
import {View, StyleSheet} from "react-native";

const Drawer = createDrawerNavigator();

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#778DFF",
	},
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function App() {
	function getHomePage() {
		return <NavigationContainer theme={MyTheme}>
			<Drawer.Navigator initialRouteName="Permission">
				<Drawer.Screen name="Permission" component={PermissionPage}/>
				<Drawer.Screen name="Heatmap" component={Heatmap}/>
				<Drawer.Screen name="Newsfeed" component={Newsfeed}/>
			</Drawer.Navigator>
		</NavigationContainer>;
	}

	return (
		<View style={styles.container}>
			{/*<PermissionPage/>*/}
			{getHomePage()}
		</View>
	);
}



