import React, { Component } from "react";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";
import TwitterCard from "../components/TwitterCard";

interface Props {
  navigation: any;
}
class Newsfeed extends Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
    // fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <TwitterCard
            name="Hambooboo"
            username="hamsandwich"
            time="2m"
            body="something asd asda sdasda ada  asdasd  asdasd ad asd a"
          ></TwitterCard>
          <TwitterCard
            name="Hambooboo"
            username="hamsandwich"
            time="2m"
            body="something"
          ></TwitterCard>
          <TwitterCard
            name="Hambooboo"
            username="hamsandwich"
            time="2m"
            body="something"
          ></TwitterCard>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Newsfeed;
