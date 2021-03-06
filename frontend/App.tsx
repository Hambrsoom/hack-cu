import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Heatmap from "./screens/Heatmap";
import Newsfeed from "./screens/Newsfeed";
import { createDrawerNavigator } from "@react-navigation/drawer";

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
      <Drawer.Navigator initialRouteName="Heatmap">
        <Drawer.Screen name="Heatmap" component={Heatmap} />
        <Drawer.Screen name="Newsfeed" component={Newsfeed} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
