import { registerRootComponent } from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';

function App(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
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
export default App();
