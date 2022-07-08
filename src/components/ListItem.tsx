/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { Gesture, GestureDetector, PanGestureHandlerProps } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import type { Item } from '../types';
import GlobalStyles from '../styles/styles';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, runOnJS, FadeIn, ZoomIn, ZoomInDown, ZoomInUp, ZoomInEasyUp, SlideInRight, BounceInRight, Layout, SlideOutLeft } from 'react-native-reanimated';

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  item: {
    id: string;
    text: string;
  };
  deleteItem: (item: Item) => void; //pass function from App.tsx
}

const ItemHeight = 65; //Height of single item

const { width: ScreenWidth } = Dimensions.get('window'); //gets window dimensions from react-native

const DeleteXThreshold = -ScreenWidth * 0.3; //defines how much you have to swipe to delete task

export function ListItem({ item, deleteItem, simultaneousHandlers }: Props): React.ReactElement {
  const translateX = useSharedValue(0); //shared between reanimated and js
  const itemHeight = useSharedValue(ItemHeight); //Changed when task is deleted
  const marginVertical = useSharedValue(6); //Changed when task is deleted
  const taskOpacity = useSharedValue(1); //1 if visible, 0 if not, changes opacity to 0 on delete
  const iconOpacity = useSharedValue(0); //1 if visible, 0 if not, changes opacity to 0 on delete

  const deleteCallback = useCallback(() => {
    console.log("deleting...")
    runOnJS(deleteItem)(item); //run on JS instead of UI thread
  }, [])

  //Defines gesture for task (updated for GestureHandler 2)
  const panGesture = Gesture.Pan()
  .onUpdate((event) => {
      //Update value while active to use on End
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      //Fires when task is released, either reset task or delete it according to threshold
      const willBeDismissed: boolean = translateX.value < DeleteXThreshold;
      if (willBeDismissed) {
        translateX.value = withTiming(-ScreenWidth);

        //undefined: default user config, callback: when animation is finished
        taskOpacity.value = withTiming(0, undefined, (isFinished) => {
          iconOpacity.value = withTiming(0, { duration: 50 });
          if (isFinished) {
            // TODO: animate shadow disapearing
            runOnJS(deleteItem)(item); //run on JS instead of UI thread
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    })
    .simultaneousWithExternalGesture(simultaneousHandlers)
    //Handles scrollview


  //Animates the x value of task
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const reanimatedIconContainerStyle = useAnimatedStyle(() => {
    iconOpacity.value = withTiming(translateX.value < DeleteXThreshold ? 0.85 : 0);
    return {
      opacity: iconOpacity.value,
      transform: [{ translateX: translateX.value + ScreenWidth }],
      backgroundColor: GlobalStyles.secondary,
      borderBottomEndRadius: 12,
      borderTopEndRadius: 12,
    };
  });

  //When item gets deleted, change height to adjust
  const reanimatedTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: taskOpacity.value,
    };
  });

  // TODO: fix simultaneousHandlers for scrollview
  // TODO: apply layoutanimation in app.tsx loop
  const combinedGesture = Gesture.Simultaneous(panGesture)

  return (
    <Animated.View style={[styles.taskContainer, reanimatedTaskContainerStyle]} entering={SlideInRight.delay(100).duration(250).springify().damping(1000).mass(2).stiffness(1000)} layout={Layout} exiting={SlideOutLeft.duration(250).springify().damping(1000).mass(2).stiffness(1000)}>
      <Animated.View style={[styles.iconContainer, reanimatedIconContainerStyle]}>
        <Ionicons name={'trash-outline'} size={ItemHeight * 0.4} color={GlobalStyles.complimentary} />
      </Animated.View>

      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={[styles.task, reanimatedStyle]}>
          <Text adjustsFontSizeToFit style={styles.taskTitle}>
            {item.text}
          </Text>
      </Animated.View>
      </GestureDetector>
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
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowRadius: 10,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: ItemHeight,
    minWidth: ScreenWidth * 1.08,
    paddingStart: 60,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
