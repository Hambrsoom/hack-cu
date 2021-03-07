import React, { Component } from "react";
import MapView, { Heatmap, Polygon } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { polygons } from "../Data/LocationDelimiters";
import axios from "axios";

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {LocationObject} from "expo-location";
import {generateUUID} from "../utilities/unique-id";
import * as SecureStore from 'expo-secure-store';
import { PROVIDER_GOOGLE } from "react-native-maps";

interface Props {
  navigation: any;
}

const FIVE_MINUTES_IN_MS = 1000*60*5;


export default class ZoneMap extends Component<Props> {
  state = {
    location: {coords: {latitude: 0, longitude: 0}},
		activeCases: [],
    region: undefined,
		errorMessage: '',
		showMap: false,
	};

  async componentDidMount() {
		let areaTableResponse = await axios.get(`http://192.168.2.248:5000/locations`);
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

  
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
        >
          {this.drawPolygons()}
        </MapView>
      </View>
    )
  }
  
  
  
  private drawPolygons(){
    return polygons.map((polygon, index) => (
        <View key={index}>
          <Polygon
            coordinates={polygon.coordinates}
            fillColor = {this.colorPicker(polygon.title)}
          />
        </View>
        ))
  }

  private goThroughPolygons(){
    polygons.forEach(polygon => {
      if(this.inside(this.state.location, polygon)){
        console.log(" I AM GONNA DIE!!")
      }
    })
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
        if (intersect) inside = !inside;
    }
    
    return inside;
  };

  private colorPicker(municipalityString: string){
    let result: any;
    //Query for the active case # in the region that matches the passed string
    result = this.state.activeCases.find((record) => record["category"] == municipalityString)
    //Pick a color based on that number
    if(result?.numberOfActiveCases && result?.numberOfActiveCases > 1000){
      return "#FF0000"
    }

    else if(result?.numberOfActiveCases && result?.numberOfActiveCases > 500){
      return "#FF8C00"
    }

    else {
      return "#00FF00"
    }
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
