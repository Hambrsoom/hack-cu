import React, { Component } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Heatmap from './screens/Heatmap';
import Zone from './screens/ZoneMap';
import Newsfeed from './screens/Newsfeed';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import PermissionPage from './screens/PermissionPage/PermissionPage';
import * as SecureStore from 'expo-secure-store';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#778DFF',
  },
};

export default class App extends Component {
  state = { firstTimeUser: true };

  async componentDidMount() {
    let hasPreviousSession = await SecureStore.getItemAsync('uuid');
    if (hasPreviousSession) {
      this.setState({ firsTimeUser: false });
    }
  }

  MainStackScreen() {
    return (
      <Drawer.Navigator initialRouteName="Heatmap">
        <Drawer.Screen name="Heatmap" component={Heatmap} />
        <Drawer.Screen name="Zonemap" component={Zone} />
        <Drawer.Screen name="Newsfeed" component={Newsfeed} />
      </Drawer.Navigator>
    );
  }

  render() {
    return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName={this.state.firstTimeUser ? 'Permission' : 'Heatmap'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Permission" component={PermissionPage} />
          <Stack.Screen name="Main" component={this.MainStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
