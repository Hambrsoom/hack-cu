import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import TwitterCard from "../components/TwitterCard";

interface Props {
  navigation: any;
}
class Newsfeed extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TwitterCard
          name="Hambooboo"
          username="hamsandwich"
          time="2m"
          body="something"
        ></TwitterCard>
      </View>
    );
  }
}

export default Newsfeed;
