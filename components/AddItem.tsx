import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  addItem: (text: string) => void;
}

export function AddItem({ addItem }: Props): React.ReactElement {
  const [text, setText] = useState('');
  const inputField = useRef<null | TextInput>(null);

  const onTextChange = (newText: string): void => setText(newText);

  const submitInput = (inputText: string): void => {
    setText('');
    inputField?.current?.clear();
    addItem(inputText);
  };

  return (
    <View>
      <TextInput placeholder="Add Item..." style={styles.input} onChangeText={onTextChange} ref={inputField} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          submitInput(text);
        }}>
        <Text style={styles.buttonText}>
          <Ionicons name="add-circle" size={20} />
          Add Item
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
  },
  buttonText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});
