import React, { Component } from 'react';
import MapView, { Polygon } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { polygons } from '../Data/LocationDelimiters';
import axios from 'axios';
import CustomHeader from '../components/Header';

interface Props {
  navigation: any;
}

export default class ZoneMap extends Component<Props> {
  state = {
    activeCases: [],
  };

  async componentDidMount() {
    let areaTableResponse = await axios.get(`http://localhost:5000/locations`);
    const ActiveCaseNumbers = areaTableResponse.data;
    this.setState({ activeCases: ActiveCaseNumbers });
  }

  render() {
    return (
      <View style={{ height: '100%', width: '100%' }}>
        <CustomHeader
          navigation={this.props.navigation}
          header="Zonemap"
        ></CustomHeader>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 45.4973197413792,
              longitude: -73.5788368061184,
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}
          >
            {this.drawPolygons()}
          </MapView>
        </View>
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
