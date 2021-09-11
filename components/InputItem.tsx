/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

interface Props {
  addItem: (text: string) => void;
}

export function InputItem({ addItem }: Props): React.ReactElement {
  //changeNavigationBarColor('#80b3ff', true, true); //crashes

  const [text, setText] = useState('');
  const inputField = useRef<null | TextInput>(null);

  const onTextChange = (newText: string): void => setText(newText);

  const submitInput = (inputText: string): void => {
    setText('');
    inputField?.current?.clear();
    addItem(inputText);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.containerBottom}>
      <Ionicons name={'chevron-forward-outline'} size={28} color={'#c2bad8'} style={styles.icon} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add Item..."
          placeholderTextColor="#c2bad8"
          style={styles.input}
          onChangeText={onTextChange}
          ref={inputField}
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
    marginTop: 6,
    alignSelf: 'center',
  },
  input: {
    marginLeft: 5,
    height: 60,
    paddingBottom: 30,
    fontSize: 16,
    color: '#c2bad8',
  },
  inputContainer: {
    height: 50,
    flex: 1,
    marginBottom: 8,
    marginRight: 25,
    marginTop: 15,
    marginLeft: 6,
    // borderRadius: 8,
    // borderColor: '#FFF',
    // borderWidth: 2,
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
