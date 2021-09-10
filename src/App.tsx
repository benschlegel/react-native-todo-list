import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Alert, Platform } from 'react-native';
import { Header } from '../components/Header';
import { ListItem } from '../components/ListItem';
import { AddItem } from '../components/AddItem';
import type { ShopItem } from '../types';
import uuid from 'uuidv4';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-navigation';

function App(): React.ReactElement {
  const [items, setItems] = useState<ShopItem[]>([
    { id: uuid(), text: 'Milk' },
    { id: uuid(), text: 'Apl' },
    { id: uuid(), text: 'Eg' },
    { id: uuid(), text: 'Toe' },
  ]);

  const deleteItem = (id: string): void => {
    setItems((prevItems): ShopItem[] => {
      return prevItems.filter((item: ShopItem) => item.id !== id);
    });
  };

  const addItem = (text: string): void => {
    if (text.trim() === '') {
      Alert.alert('Error', 'Please enter an item', [{ text: 'ok' }]);
    } else {
      text = text.trim();
      setItems((prevItems): ShopItem[] => {
        return [{ id: uuid(), text }, ...prevItems]; //text <=> text: text, ...prevItems appends items that were in list before
      });
    }
  };

  //SafeAreaView Spaces out content below status bar
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#231d44" translucent={true} style="light" />
        <Header title="Shopping List" />
        <AddItem addItem={addItem} />
        <FlatList data={items} renderItem={({ item }) => <ListItem item={item} deleteItem={deleteItem} />} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
});

registerRootComponent(App);
export default App;
