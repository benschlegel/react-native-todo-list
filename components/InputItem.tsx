/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  addItem: (text: string) => void;
}

export function InputItem({ addItem }: Props): React.ReactElement {
  const [text, setText] = useState('');
  const inputField = useRef<null | TextInput>(null);

  const onTextChange = (newText: string): void => setText(newText);

  const submitInput = (inputText: string): void => {
    setText('');
    inputField?.current?.clear();
    addItem(inputText);
  };

  return (
    <View style={styles.bottom}>
      <TextInput
        placeholder="Add Item..."
        placeholderTextColor="#FFF"
        style={styles.input}
        onChangeText={onTextChange}
        ref={inputField}
        onSubmitEditing={() => {
          if (text.trim() !== '') submitInput(text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  bottom: {
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    flex: 0.1,
    backgroundColor: '#322775',
    justifyContent: 'flex-end',
  },
});
