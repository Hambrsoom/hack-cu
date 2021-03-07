import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { Location, Permissions } from "expo";

interface Props {
  navigation: any;
}
class Newsfeed extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Newsfeed</Text>
        <Button
          title="Go to Heatmap"
          onPress={() => this.props.navigation.navigate("Heatmap")}
        />
      </View>
    );
  }
}

export default Newsfeed;
