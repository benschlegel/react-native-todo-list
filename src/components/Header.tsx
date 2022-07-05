import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../styles/styles';

interface Props {
  title: string;
}

const ICON_SIZE = 30;

export function Header({ title }: Props): React.ReactElement {
  return (
    <View style={styles.header}>
      <Ionicons name="chevron-back-outline" size={ICON_SIZE} color={GlobalStyles.complimentary} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

Header.defaultProps = {
  title: 'default',
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: GlobalStyles.primary,
    flexDirection: 'row',
  },
  text: {
    color: '#FFF',
    flex: 1,
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: -ICON_SIZE,
    // justifyContent: 'center',
  },
});
