/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TextInput, Keyboard, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../styles/styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';

//Props being passed to component
interface Props {
  addItem: (text: string) => void;
}

//Main component
export function Input({ addItem }: Props): React.ReactElement {
  const [text, setText] = useState(''); //Text in input field
  const [isMaximized, setIsMaximized] = useState(false); //If input field is expanded or not
  const inputField = useRef<null | TextInput>(null); //Reference to inputField component (useful for e.g. focusing component)
  const inputExpandAnimation = useSharedValue(0);
  //Used to smoothly interpolate rotation of icon/view
  const minimizeIconRotation = useDerivedValue(() => {
    return interpolate(inputExpandAnimation.value, [0, 360], [0, 360]);
  });

  //When component is loaded, add listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsMaximized(true);
      inputExpandAnimation.value = withTiming(90);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsMaximized(false);
      inputExpandAnimation.value = withTiming(0);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [inputExpandAnimation]);

  const onTextChange = (newText: string): void => setText(newText);

  const submitInput = (inputText: string): void => {
    setText('');
    inputField?.current?.focus();
    inputField?.current?.clear();
    addItem(inputText);
  };

  //Changes rotation of icon/view according to minimizeIconRotation
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: minimizeIconRotation.value + 'deg',
        },
      ],
    };
  });

  //Changes to expand with keyboard or remove it
  const toggleInputSize = (): void => {
    if (isMaximized) {
      inputExpandAnimation.value = withTiming(0);
      setIsMaximized(false);
      Keyboard.dismiss();
    } else {
      inputExpandAnimation.value = withTiming(90);
      setIsMaximized(true);
      inputField?.current?.focus();
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.containerBottom}>
      <Animated.View style={[styles.icon, animationStyle]}>
        <Ionicons
          name={'chevron-forward-outline'}
          size={28}
          color={GlobalStyles.complimentary}
          onPress={toggleInputSize}
          style={{ transform: [{ scale: 1.35 }] }}
        />
      </Animated.View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add Item..."
          selectionColor={GlobalStyles.complimentary}
          placeholderTextColor="#FFF"
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
    borderBottomColor: GlobalStyles.complimentary,
    color: '#FFF',
    borderBottomWidth: 3,
    borderRadius: 2,
    opacity: 0.75,
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
    backgroundColor: GlobalStyles.secondary,
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    flexDirection: 'row',
  },
});
