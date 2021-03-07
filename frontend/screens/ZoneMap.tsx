import React, { Component } from "react";
import MapView, { Heatmap, Polygon } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { polygons } from "../Data/LocationDelimiters";
import axios from "axios";


interface Props {
  navigation: any;
}
const { width, height } = Dimensions.get('window');



export default class ZoneMap extends Component<Props> {
  state = {
		activeCases: []
	};

  async componentDidMount() {
    console.log("hello croissant")
		let areaTableResponse = await axios.get(`http://192.168.50.146:5000/locations`);
    const ActiveCaseNumbers = areaTableResponse.data;
    this.setState({activeCases: ActiveCaseNumbers})
    console.log(areaTableResponse)
	}

  
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
            fillColor = {this.colorPicker(polygon.title)}
          />
        </View>
        ))
  }

  private colorPicker(municipalityString: string){
    console.log(this.state.activeCases)
    let result: any;
    //Query for the active case # in the region that matches the passed string
    result = this.state.activeCases.find((record) => record["category"] == municipalityString)
    //Pick a color based on that number
    if( result?.numberOfActiveCases && result?.numberOfActiveCases > 1000){
      return "#FF0000"
    }

    else if( result?.numberOfActiveCases && result?.numberOfActiveCases > 500){
      return "#FF8C00"
    }

    else{
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
