import React from "react";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import Heatmap from "./screens/Heatmap";
import Zone from "./screens/ZoneMap";
import Newsfeed from "./screens/Newsfeed";
import PermissionPage from "./screens/PermissionPage/PermissionPage";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {View, StyleSheet} from "react-native";

const Drawer = createDrawerNavigator();

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#778DFF",
	},
};

export default function App() {
	return (
		<NavigationContainer theme={MyTheme}>
			<Drawer.Navigator initialRouteName="Permission">
				<Drawer.Screen name="Permission" component={PermissionPage}/>
				<Drawer.Screen name="Heatmap" component={Heatmap}/>
				<Drawer.Screen name="Zone" component={Zone}/>
				<Drawer.Screen name="Newsfeed" component={Newsfeed}/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
}



