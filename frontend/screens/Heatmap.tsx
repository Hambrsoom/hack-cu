import React, { Component } from "react";
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

interface Props {
  navigation: any;
}
class Heatmap extends Component<Props> {
  state = {
    location: {},
    errorMessage: ''
  };

  UNSAFE_componentWillMount() {
    this._getLocation();
  }

  _getLocation = async() => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted'){
      console.log("Permission Not Granted");
    }

    this.setState({
      errorMessage: 'Permission Not Granted'
    })

    const location = await Location.getCurrentPositionAsync();

    this.setState({
      location
    })
    console.log(this.state.location);
  }



  render() {
    return (
      <View style={styles.container}>
        <MapView 
          style={styles.map}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: -73.6763872,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}>
            <Marker
              coordinate={{
                latitude: 45.5372949,
                longitude: -73.6763872
              }}
              style={{width: 26, height: 28}}
              image ={require('../assets/current-location.png')}
              title ="You are here"
            ></Marker>

          </MapView>
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
