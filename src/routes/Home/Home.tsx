import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import type { Routes } from '../../Routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export function Home({ navigation }: NativeStackScreenProps<Routes, 'Home'>): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Todo')}
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
