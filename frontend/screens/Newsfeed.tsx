import React, { Component } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import TwitterCard from '../components/TwitterCard';

interface Props {
  navigation: any;
}
class Newsfeed extends Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      refreshing: false,
      data: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  _onRefresh = () => {
    this.fetchData();
  };

  fetchData() {
    this.setState({ refreshing: true });
    fetch('http://192.168.2.248:5000/newsfeed')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ...this.state, data });
        this.setState({ refreshing: false });
      });
  }

  render() {
    let cards: any = [];
    if (this.state.data) {
      this.state.data.tweets.forEach((tweet: any) => {
        cards.push(
          <TwitterCard
            name={tweet.name}
            screenName={tweet.screen_name}
            time={tweet.created_at}
            body={tweet.body}
            img={tweet.image}
          ></TwitterCard>
        );
      });

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
            {cards}
          </ScrollView>
        </SafeAreaView>
      );
    }
    return <View></View>;
  }
}

export default Newsfeed;
