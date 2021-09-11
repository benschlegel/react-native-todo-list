/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface Props {
  item: {
    id: string;
    text: string;
  };
  deleteItem: (id: string) => void;
}

export function ListItem({ item, deleteItem }: Props): React.ReactElement {
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      //TODO
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <View style={styles.taskContainer}>
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
  },
  task: {
    width: '90%',
    height: 70,
    marginVertical: 8,
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
});
