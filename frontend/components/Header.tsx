import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function CustomHeader(props: {
  navigation: any;
  header: string;
}) {
  return (
    <View style={styles.header}>
      <Ionicons
        name="md-menu"
        size={32}
        color="white"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <Text style={styles.title}>{props.header}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 5,
    backgroundColor: '#778DFF',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
});
