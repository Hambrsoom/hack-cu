import React, {Component} from "react";
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {LocationObject, LocationOptions} from "expo-location";

interface Props {
	navigation: any;
}


class Heatmap extends Component<Props> {
	state = {
		location: {coords: {latitude: 0, longitude: 0}},
		region: undefined,
		errorMessage: '',
		showMap: false,
	};

	async componentDidMount() {
		console.log("component will mount")
		await this._getLocation();
	}

	_getLocation = async () => {
		const {status} = await Permissions.askAsync(Permissions.LOCATION);

		if (status !== 'granted') {
			console.log("Permission Not Granted");
		}

		this.setState({
			errorMessage: 'Permission Not Granted'
		})

		Location.watchPositionAsync({}, this.onLocationChanged);
	}

	onLocationChanged = (location: LocationObject) => {
		let region = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.1,
			longitudeDelta: 0.05,
		}

		this.setState({
			location: location,
			region: region,
			showMap: true
		})
	}

	showMap(show: any) {
		if (show) {
			return <MapView
				style={styles.map}
				showsUserLocation={true}
				initialRegion={this.state.region}>
			</MapView>
		}

		return <View></View>
	}

	render() {
		return (
			<View style={styles.container}>
				{this.showMap(this.state.showMap)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20
	},
	map: {
		width: "95%",
		height: "100%",
	},
});

export default Heatmap;
