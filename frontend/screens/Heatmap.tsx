import React, { Component } from "react";
import { Text, View, Button } from "react-native";

interface Props {
  navigation: any;
}
class Heatmap extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>HeatMap</Text>
        <Button
          title="Go to Newsfeed"
          onPress={() => this.props.navigation.navigate("Newsfeed")}
        />
      </View>
    );
  }
}

export default Heatmap;
