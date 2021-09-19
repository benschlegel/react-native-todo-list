/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { registerRootComponent } from 'expo';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Alert, Platform, Text } from 'react-native';
import { Header } from '../components/Header';
import { ListItem } from '../components/ListItem';
import { Input } from '../components/Input';
import type { Item } from '../types';
import uuid from 'uuidv4';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import GlobalStyles from '../styles/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import LottieView from 'lottie-react-native';

function App(): React.ReactElement {
  const [items, setItems] = useState<Item[]>([
    { id: uuid(), text: 'Milk' },
    { id: uuid(), text: 'Apl' },
    { id: uuid(), text: 'Eg' },
    { id: uuid(), text: 'Toe' },
  ]);

  const scrollRef = useRef(null);

  //Use useCallback()? idk
  const deleteItem = (item: Item): void => {
    setItems((prevItems): Item[] => {
      return prevItems.filter((newItem: Item) => newItem.id !== item.id);
    });
  };

  const addItem = (text: string): void => {
    if (text.trim() === '') {
      Alert.alert('Error', 'Please enter an item', [{ text: 'ok' }]);
    } else {
      text = text.trim();
      setItems((prevItems: Item[]): Item[] => {
        return [{ id: uuid(), text }, ...prevItems]; //text <=> text: text, ...prevItems appends items that were in list before
      });
    }
  };

  //SafeAreaView Spaces out content below status bar
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
        <View style={styles.container}>
          <StatusBar translucent={true} style="light" backgroundColor={GlobalStyles.primary} />
          <Header title="Shopping List" />
          {items.length > 0 ? (
            <ScrollView ref={scrollRef} style={{ flex: 1, marginTop: 12 }}>
              {items.map((item) => (
                <ListItem key={item.id} simultaneousHandlers={scrollRef} item={item} deleteItem={deleteItem} />
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                opacity: 0.75,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 60,
                  fontSize: 22,
                  fontWeight: '600',
                  opacity: 0.8,
                  letterSpacing: 2,
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                Nothing here, add new items
              </Text>
              <LottieView
                style={{ width: '98%', aspectRatio: 1, marginTop: 20 }}
                source={require('../assets/lottie/astronaut.json')}
                autoPlay
                loop
                speed={0.4}
              />
            </View>
          )}
          <Input addItem={addItem} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
