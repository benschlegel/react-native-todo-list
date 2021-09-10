import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
}

export function Header({ title }: Props): React.ReactElement {
  return (
    <View style={styles.header}>
      <Ionicons name="chevron-back-outline" size={30} color="#c2bad8" />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

Header.defaultProps = {
  title: 'default',
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue',
    flexDirection: 'row',
  },
  text: {
    color: '#FFF',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
