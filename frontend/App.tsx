import React, {Component} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Heatmap from './screens/Heatmap';
import Newsfeed from './screens/Newsfeed';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PermissionPage from './screens/PermissionPage/PermissionPage';
import * as SecureStore from 'expo-secure-store';

const Drawer = createDrawerNavigator();

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#778DFF',
	},
};

export default class App extends Component {
	state = {firstTimeUser: true}

  async componentDidMount() {
    let hasPreviousSession = await SecureStore.getItemAsync('uuid');
    if(hasPreviousSession){
      this.setState({firsTimeUser: false})
    }
  }

	render() {
		return <NavigationContainer theme={MyTheme}>
			<Drawer.Navigator initialRouteName={this.state.firstTimeUser ? "Permission" : "Heatmap"}>
				<Drawer.Screen name="Permission" component={PermissionPage}/>
				<Drawer.Screen name="Heatmap" component={Heatmap}/>
				<Drawer.Screen name="Newsfeed" component={Newsfeed}/>
			</Drawer.Navigator>
		</NavigationContainer>
	}
}



