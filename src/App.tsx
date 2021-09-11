import { registerRootComponent } from 'expo';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Alert, Platform } from 'react-native';
import { Header } from '../components/Header';
import { ListItem } from '../components/ListItem';
import { AddItem } from '../components/AddItem';
import type { ShopItem } from '../types';
import uuid from 'uuidv4';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

function App(): React.ReactElement {
  const [items, setItems] = useState<ShopItem[]>([
    { id: uuid(), text: 'Milk' },
    { id: uuid(), text: 'Apl' },
    { id: uuid(), text: 'Eg' },
    { id: uuid(), text: 'Toe' },
  ]);

  const scrollRef = useRef(null);

  //Use useCallback()? idk
  const deleteItem = (item: ShopItem): void => {
    setItems((prevItems): ShopItem[] => {
      return prevItems.filter((newItem: ShopItem) => newItem.id !== item.id);
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
        <StatusBar backgroundColor="darkslateblue" translucent={true} style="light" />
        <Header title="Shopping List" />
        <AddItem addItem={addItem} />
        <ScrollView ref={scrollRef} style={{ flex: 1 }}>
          {items.map((item) => (
            <ListItem key={item.id} simultaneousHandlers={scrollRef} item={item} deleteItem={deleteItem} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
});

registerRootComponent(App);
export default App;
