import React, { Component } from "react";
import MapView, { Polygon } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

interface Props {
  navigation: any;
}

export default class Zone extends Component<Props> {
  //Defining our zones
  polygons = [
    [
      { latitude: 25.774, longitude: -80.19 },
      { latitude: 18.466, longitude: -66.118 },
      { latitude: 32.321, longitude: -64.757 },
      { latitude: 25.774, longitude: -80.19 }
    ],
    [
      { latitude: -25.774, longitude: 80.19 },
      { latitude: -18.466, longitude: 66.118 },
      { latitude: -32.321, longitude: 64.757 },
      { latitude: -25.774, longitude: 80.19 }
    ],
  ]


  //Class methods
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} />
        <Polygon
        coordinates = {[
          { latitude: 25, longitude: 25 },
          { latitude: 25, longitude: -25 },
          { latitude: -25, longitude: 25 },
          { latitude: 25, longitude: 25 }

        ]}
        fillColor="#FFA500"
      />
        {/* {this.drawPolygons()} */}
      </View>
    );
  }

  private drawPolygons(){
    this.polygons.forEach((polygon) => {
      <Polygon
        coordinates = {polygon}
        fillColor="Orange"
      />
    })
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
