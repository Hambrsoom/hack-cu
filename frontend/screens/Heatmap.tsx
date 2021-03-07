import React, { Component } from "react";
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

interface Props {
  navigation: any;
}
class Heatmap extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} />
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
