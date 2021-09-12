/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Keyboard, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';
import SystemNavigationBar from 'react-native-system-navigation-bar';

interface Props {
  addItem: (text: string) => void;
}

export function InputItem({ addItem }: Props): React.ReactElement {
  const [text, setText] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const inputField = useRef<null | TextInput>(null);
  const animation = useSharedValue(0);
  const minimizeIconRotation = useDerivedValue(() => {
    return interpolate(animation.value, [0, 360], [0, 360]);
  });

  const onTextChange = (newText: string): void => setText(newText);

  const submitInput = (inputText: string): void => {
    setText('');
    inputField?.current?.focus();
    inputField?.current?.clear();
    addItem(inputText);
  };

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: minimizeIconRotation.value + 'deg',
        },
      ],
    };
  });

  const minimizePressed = (): void => {
    console.log('pressed');
    if (isMaximized) {
      animation.value = withTiming(0);
      Keyboard.dismiss();
    } else {
      animation.value = withTiming(90);
      inputField?.current?.focus();
      setIsMaximized(true);
    }
  };

  const onKeyboardDidHide = (event: Event): void => {
    //console.log('keyboard gone');
    animation.value = withTiming(0);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.containerBottom}>
      <Animated.View style={[styles.icon, animationStyle]}>
        <Ionicons name={'chevron-forward-outline'} size={28} color={'#c2bad8'} onPress={minimizePressed} />
      </Animated.View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add Item..."
          selectionColor={'#c2bad8'}
          placeholderTextColor="#c2bad8"
          onFocus={() => {
            Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
            animation.value = withTiming(90);
            setIsMaximized(true);
          }}
          onBlur={() => {
            //on focus loss
            animation.value = withTiming(0);
            setIsMaximized(false);
            Keyboard.removeAllListeners('keyboardDidHide');
          }}
          style={styles.input}
          onChangeText={onTextChange}
          ref={inputField}
          blurOnSubmit={false}
          onSubmitEditing={() => {
            if (text.trim() !== '') submitInput(text);
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 8,
    alignSelf: 'center',
  },
  input: {
    marginLeft: 5,
    fontSize: 16,
    paddingBottom: 2,
    borderBottomColor: '#c2bad8',
    color: '#c2bad8',
    borderBottomWidth: 2,
    borderRadius: 2,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 8,
    marginRight: 25,
    marginTop: 15,
    marginLeft: 6,
    //borderColor: '#FFF',
    //borderWidth: 2,
    //borderRadius: 8,
  },
  containerBottom: {
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    overflow: 'hidden',
    flex: 0.1,
    backgroundColor: '#322775',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    flexDirection: 'row',
  },
});
