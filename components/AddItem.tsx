/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  addItem: (text: string) => void;
}

export function AddItem({ addItem }: Props): React.ReactElement {
  const [text, setText] = useState('');

  const onTextChange = (newText: string): void => setText(newText);

  return (
    <View>
      <TextInput placeholder="Add Item..." style={styles.input} onChangeText={onTextChange} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setText('');
          addItem(text);
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
