import React, { Component } from "react";
import MapView, { Heatmap, Polygon } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { locations } from "../Data/data";

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
          {
            locations.map(marker => (
              <Polygon fillColor = {'#0067B3'} coordinates = {locations}/>

              // <Circle center={{latitude: marker.latitude, longitude: marker.longitude}} radius= {550}
              // fillColor = {'#A3BE80'} />
            ))
          }



          {/* <Heatmap points={locations} /> */}

          {/* {
        locations.map(marker => (
          <Marker
          coordinate = {{latitude: marker.latitude,
            longitude: marker.longitude}}
          >
          <CustomMarker item = {marker}/>
          </Marker>
        ))
      } */}

        </MapView>
      </View>
    )
  }

  // private drawPolygons(){
  //   this.polygons.forEach((polygon) => {
  //     <Polygon
  //       coordinates = {polygon}
  //       fillColor="Orange"
  //     />
  //   })
  // }
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
