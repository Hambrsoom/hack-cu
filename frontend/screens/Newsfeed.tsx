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

  async componentDidMount() {
    await this.fetchData();
  }

  _onRefresh = async () => {
    await this.fetchData();
  };

  async fetchData() {
    this.setState({ refreshing: true });
    await fetch('http://localhost:5000/newsfeed')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ...this.state, data });
        this.setState({ refreshing: false });
      });
  }

  render() {
    let cards: any = [];
    if (this.state.data) {
      this.state.data.tweets.forEach((tweet: any, index: number) => {
        let date = this.timeSince(new Date(tweet.created_at));
        cards.push(
          <View key={index}>
            <TwitterCard
              name={tweet.name}
              screenName={tweet.screen_name}
              time={date}
              body={tweet.body}
              img={tweet.image}
            />
          </View>
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

  timeSince(timeStamp: Date): string {
    var now = new Date(),
      secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if (secondsPast < 60) {
      return Math.round(secondsPast) + 's ago';
    }
    if (secondsPast < 3600) {
      return secondsPast + 'm';
    }
    if (secondsPast <= 86400) {
      return secondsPast + 'h';
    }
    return secondsPast + 's';
  }
}

export default Newsfeed;
