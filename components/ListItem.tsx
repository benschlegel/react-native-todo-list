/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import type { ShopItem } from '../types';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';

interface Props {
  item: {
    id: string;
    text: string;
  };
  deleteItem: (item: ShopItem) => void; //pass function from App.tsx
}

const ItemHeight = 65; //Height of single item

const { width: ScreenWidth } = Dimensions.get('window'); //gets window dimensions from react-native

const DeleteXThreshold = -ScreenWidth * 0.3; //defines how much you have to swipe to delete task

export function ListItem({ item, deleteItem }: Props): React.ReactElement {
  const translateX = useSharedValue(0); //shared between reanimated and js
  const itemHeight = useSharedValue(ItemHeight); //Changed when task is deleted
  const marginVertical = useSharedValue(6); //Changed when task is deleted
  const taskOpacity = useSharedValue(1); //1 if visible, 0 if not, changes opacity to 0 on delete

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
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);

        //undefined: default user config, callback: when animation is finished
        taskOpacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(deleteItem)(item); //run on JS instead of UI thread
          }
        });
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

  //When item gets deleted, change height to adjust
  const reanimatedTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: taskOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.taskContainer, reanimatedTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, reanimatedIconContainerStyle]}>
        <Ionicons name={'trash-outline'} size={ItemHeight * 0.4} color={'red'} />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, reanimatedStyle]}>
          <Text style={styles.taskTitle}>{item.text}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    alignItems: 'center',
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