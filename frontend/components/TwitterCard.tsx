import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function TwitterCard(props: {
  name: string;
  screenName: string;
  time: string;
  body: string;
  img: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={styles.imgHeader} source={{ uri: props.img }} />
        <View>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.name}>{props.name}</Text>
              <Text style={styles.muted}>@{props.screenName}</Text>
            </View>
            <Text style={styles.muted}>{props.time}</Text>
          </View>
          <Text style={styles.body}>{props.body}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 1,
    padding: 20,
  },
  cardContainer: {
    flexDirection: "row",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imgHeader: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  muted: {
    fontSize: 12,
    color: "#6B6B6B",
  },

  body: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 250,
  },
  name: {
    fontWeight: "700",
  },
});
