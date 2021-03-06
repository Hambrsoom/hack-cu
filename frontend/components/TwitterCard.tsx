import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function TwitterCard(props: {
  name: string;
  username: string;
  time: string;
  body: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.imgHeader}
          source={{ uri: "https://via.placeholder.com/150" }}
        />
        <View>
          <View style={styles.cardHeader}>
            <Text>{props.name}</Text>
            <Text>@{props.username}</Text>
            <Text>{props.time}</Text>
          </View>
          <View>
            <Text>{props.body}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cardContainer: {
    borderRadius: 6,
    elevation: 5,
    padding: 20,
    width: "90%",
    flexDirection: "row",
  },
  cardHeader: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  imgHeader: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
});
