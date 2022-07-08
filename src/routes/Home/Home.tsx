import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import type { Routes } from '../../Routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';
// import GlobalStyles from '../../styles/styles';

const setNavbar = async () => {
  await NavigationBar.setBackgroundColorAsync("#ffffff00");
}

// TODO: potentially look into deep linking (for shared lists)

export function Home({ navigation }: NativeStackScreenProps<Routes, 'Home'>): React.ReactElement {
  useEffect(() => {
    setNavbar();
  }, [])
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Todo', {id: 1})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
