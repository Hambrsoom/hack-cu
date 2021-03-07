import React, { Component } from "react";
import MapView, { Heatmap, Polygon } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { polygons } from "../Data/LocationDelimiters";

interface Props {
  navigation: any;
}
const { width, height } = Dimensions.get('window');



export default class ZoneMap extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 24.83073230,
            longitude: 67.10113298,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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
          />
        </View>
        ))
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
