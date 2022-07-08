/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { registerRootComponent } from 'expo';
import React from 'react';
import type { Routes } from './Routes';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodoItem } from './routes/TodoItem/TodoItem';
import { Home } from './routes/Home/Home';
import GlobalStyles from './styles/styles';
import { Ionicons } from '@expo/vector-icons';
import type { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';


const Stack = createNativeStackNavigator<Routes>();


function App(): React.ReactElement {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.primary,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#FFF',
          fontSize: 23,
        }
      }}>


        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Todo" component={TodoItem} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

registerRootComponent(App);
export default App;
