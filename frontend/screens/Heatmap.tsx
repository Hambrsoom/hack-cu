import React, {Component} from "react";
import MapView, {WeightedLatLng, Heatmap as HeatmapRN} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {LocationObject} from "expo-location";
import axios from "axios";
import {generateUUID} from "../App";
import * as SecureStore from 'expo-secure-store';
import { PROVIDER_GOOGLE } from "react-native-maps";
import Points from "./heatMapPointsV2.json"

interface Props {
	navigation: any;
}

const FIVE_MINUTES_IN_MS = 1000*60*5;

class Heatmap extends Component<Props> {
	state = {
		location: {coords: {latitude: 0, longitude: 0}},
		region: undefined,
		errorMessage: '',
		showMap: false,
		heatMapPoints: []
	};

	async componentDidMount() {
		await this._getLocation();

		this.setState({
			heatMapPoints: this.getHeapMapPoints()
		})
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

	getHeapMapPoints(): WeightedLatLng[] {
		let point: WeightedLatLng = {latitude: 25.0, longitude: 35.0}

		fetch("heatMapPointsV2.json").then(r => console.log(r.json()));

		let points: WeightedLatLng[] = Points.points;

		Object.keys(Points.points).map((value, i) => ())

		JSON.parse(Points.points)

		return [point]
	}

	onLocationChanged = async (location: LocationObject) => {
		let region = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.1,
			longitudeDelta: 0.05,
		}

		// Check if location needs to be persisted again
		let currentTime: Date = new Date();
		let lastLocationUpdate = await SecureStore.getItemAsync('lastUpdated');

		if (lastLocationUpdate) {
			let lastPersistedTime = new Date(lastLocationUpdate);
			let locationNeedsToBePersistedAgain: boolean = (currentTime.getTime() - lastPersistedTime.getTime()) < FIVE_MINUTES_IN_MS;
			if (locationNeedsToBePersistedAgain) {
				await this.persistCurrentLocation(location, currentTime)
			}
		}else {
			await this.persistCurrentLocation(location, currentTime)
		}

		this.setState({
			location: location,
			region: region,
			showMap: true
		})
	}

	// Persist the current location so that it can be used in the heatmap
	async persistCurrentLocation(location: LocationObject, currentTime: Date) {
		let id = await SecureStore.getItemAsync('uuid');

		await SecureStore.setItemAsync('lastUpdated', currentTime.toUTCString());

		if(!id){
			await generateUUID();
			id = await SecureStore.getItemAsync('uuid');
		}
			await axios.post(`http://192.168.0.38:5000/updateLocation/${id}`,
				{
					location: location
				}
			)
		}

	showMap(show: any) {
		if (show) {
			return <MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				showsUserLocation={true}
				initialRegion={this.state.region}>
				<HeatmapRN
				points={this.state.heatMapPoints}
				radius={50}
				/>
			</MapView>
		}

		return <View />
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
