/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props {
  item: {
    id: string;
    text: string;
  };
  deleteItem: (id: string) => void; //pass function from App.tsx
}

const ItemHeight = 65; //Height of single item

const { width: ScreenWidth } = Dimensions.get('window'); //gets window dimensions from react-native

const DeleteXThreshold = -ScreenWidth * 0.35; //defines how much you have to swipe to delete task

export function ListItem({ item, deleteItem }: Props): React.ReactElement {
  const translateX = useSharedValue(0); //shared between reanimated and js

  //Defines gesture for task
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      //Update value while active to use on End
      translateX.value = event.translationX;
    },
    onEnd: () => {
      //Fires when task is released, either reset task or delete it according to threshold
      const willBeDismissed: boolean = translateX.value < DeleteXThreshold;
      if (willBeDismissed) {
        translateX.value = withTiming(-ScreenWidth);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  //Animates the x value of task
  const reanimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const reanimatedIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < DeleteXThreshold ? 1 : 0);
    return { opacity };
  });

  return (
    <View style={styles.taskContainer}>
      <Animated.View style={[styles.iconContainer, reanimatedIconContainerStyle]}>
        <Ionicons name={'trash-outline'} size={ItemHeight * 0.4} color={'red'} />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, reanimatedStyle]}>
          <Text style={styles.taskTitle}>{item.text}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 6,
  },
  task: {
    width: '90%',
    height: ItemHeight,
    paddingLeft: 20,
    backgroundColor: 'white',
    //Android shadow, kinda wonky
    elevation: 2,
    borderRadius: 10,
    justifyContent: 'center',
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: ItemHeight,
    width: ItemHeight,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
