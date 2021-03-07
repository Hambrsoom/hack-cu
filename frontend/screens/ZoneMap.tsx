import React, {Component} from "react";

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {LocationObject} from "expo-location";
import * as SecureStore from 'expo-secure-store';

import MapView, {Polygon} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import {polygons} from '../Data/LocationDelimiters';
import axios from 'axios';
import CustomHeader from '../components/Header';

interface Props {
	navigation: any;
}

export default class ZoneMap extends Component<Props> {
	state = {
		location: {coords: {latitude: 0, longitude: 0}},
		activeCases: [],
		region: undefined,
		errorMessage: '',
		showMap: false,
		smsSent: false
	};

	async componentDidMount() {
		await this._getLocation();
		let areaTableResponse = await axios.get(`http://192.168.0.38:5000/locations`);
		const ActiveCaseNumbers = areaTableResponse.data;
		this.setState({activeCases: ActiveCaseNumbers})
	}

	_getLocation = async () => {
		const {status} = await Permissions.askAsync(Permissions.LOCATION);

		if (status !== 'granted') {
			console.log("Permission Not Granted");
		}

		this.setState({
			errorMessage: 'Permission Not Granted'
		})

		await Location.watchPositionAsync({}, this.onLocationChanged);
	}


	onLocationChanged = async (location: LocationObject) => {
		let region = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.1,
			longitudeDelta: 0.05,
		}

		await this.goThroughPolygons(location)

		this.setState({
			location: location,
			region: region,
			showMap: true
		})

	}


	render() {
		return (
			<View style={{height: '100%', width: '100%'}}>
				<CustomHeader
					navigation={this.props.navigation}
					header="Zonemap"
				/>
				<MapView
					style={styles.map}
					initialRegion={this.state.region}
					showsUserLocation={true}
				>
					{this.drawPolygons()}
				</MapView>
			</View>
		);
	}

	private drawPolygons() {
		return polygons.map((polygon, index) => (
			<View key={index}>
				<Polygon
					coordinates={polygon.coordinates}
					strokeColor={'rgba(255,0,0,0.0)'}
					fillColor={this.colorPicker(polygon.title)}
					geodesic={true}
				/>
			</View>
		));
	}

	goThroughPolygons = async (location: LocationObject) => {
		console.log("Go through polygones ", location)

		for (let polygon of polygons) {
			let currentLoc = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			}

			if (this.inside(currentLoc, polygon.coordinates)) {
				let uuid = await SecureStore.getItemAsync('uuid');

				if (uuid && !this.state.smsSent) {
					console.log("send message")
					await axios.get(`http://192.168.0.38:5000/sendMessage/${uuid}`);
					this.setState({smsSent: true})
				}
			}
		}
	}

	public inside(point: any, polygon: any) {
		// ray-casting algorithm based on
		// https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
		var x = point.latitude, y = point.longitude;
		var inside = false;
		for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
			var xi = polygon[i].latitude, yi = polygon[i].longitude;
			var xj = polygon[j].latitude, yj = polygon[j].longitude;
			var intersect = ((yi > y) != (yj > y))
				&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
			if (intersect) inside = true;
		}

		return inside;
	};

	private colorPicker(municipalityString: string) {
		let result: any;
		//Query for the active case # in the region that matches the passed string
		result = this.state.activeCases.find(
			(record) => record['category'] == municipalityString
		);
		//Pick a color based on that number
		if (result?.numberOfActiveCases && result?.numberOfActiveCases > 1000) {
			return 'rgba(255,0,0,0.25)';
		} else if (
			result?.numberOfActiveCases &&
			result?.numberOfActiveCases > 500
		) {
			return 'rgba(255,140,0,0.25)';
		} else {
			return 'rgba(0,255,0,0.25)';
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		width: '100%',
		height: '100%',
	},
});
