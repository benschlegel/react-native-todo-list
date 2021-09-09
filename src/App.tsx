import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import uuid from 'uuidv4';

function App(): React.ReactElement {
  const [count, setCount] = useState(6);

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <Text>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});

registerRootComponent(App);
export default App;
