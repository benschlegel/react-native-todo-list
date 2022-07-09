import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Alert, Platform, Text } from 'react-native';
import { Header } from '../../components/Header';
import { ListItem } from '../../components/ListItem';
import { Input } from '../../components/Input';
import type { Item } from '../../types';
import uuid from 'uuidv4';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import GlobalStyles from '../../styles/styles';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';
import { Ionicons } from '@expo/vector-icons';


import LottieView from 'lottie-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../../Routes';

const setNavbar = async () => {
  //TODO: use global theme or fix transparency
  // TODO: aliases (e.g. @components)
  // https://docs.expo.dev/versions/v44.0.0/sdk/navigation-bar/
  await NavigationBar.setBackgroundColorAsync(GlobalStyles.secondary)
}

export function TodoItem({ route, navigation }: NativeStackScreenProps<Routes, 'Todo'>): React.ReactElement {
  const {id} = route.params;
  useLayoutEffect(() => {
    setNavbar();
    navigation.setOptions({
      title: "Shopping List",
      headerLeft: () => (
        <Ionicons name="chevron-back-outline" size={32} color={GlobalStyles.complimentary} onPress={() => navigation.goBack()}/>
      ),
    })
  }, [])

  const [items, setItems] = useState<Item[]>([
    { id: uuid(), text: 'Milk' },
    { id: uuid(), text: 'Apl' },
    { id: uuid(), text: 'Eg' },
    { id: uuid(), text: 'Bread' },
  ]);

  const scrollRef = useRef(null);

  //Use useCallback()? idk
  const deleteItem = (item: Item): void => {
    setItems((prevItems: Item[]): Item[] => {
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


  return (

<GestureHandlerRootView  style={styles.container}>
          <StatusBar translucent={true} style="light" backgroundColor={GlobalStyles.primary} />
          {/* sets actual background color */}
          <View style={{backgroundColor: GlobalStyles.white2, flex: 1}} >
            {/* used to be Header component */}
          <View style={{height: Platform.OS === 'android' ? Constants.statusBarHeight + 50 : 0}} />
          {items.length > 0 ? (
            <>
            <ScrollView ref={scrollRef} style={{ flex: 1, marginTop: 12 }}>
              {items.map((item: Item) => (
                <ListItem key={item.id} simultaneousHandlers={scrollRef} item={item} deleteItem={deleteItem}/>
              ))}
            </ScrollView>

            </>
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
                source={require('../../../assets/lottie/astronaut.json')}
                autoPlay
                loop
                speed={0.4}
              />
            </View>
          )}
          <Input addItem={addItem} />
          </View>
          </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //Needed for status bar color on ios, actual bar color set on view above
    backgroundColor: GlobalStyles.primary,
    // paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : Constants.statusBarHeight - 15,
  }
});
