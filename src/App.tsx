/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { registerRootComponent } from 'expo';
import React from 'react';
import type { Routes } from './Routes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodoItem } from './routes/TodoItem/TodoItem';
import { Home } from './routes/Home/Home';


const Stack = createNativeStackNavigator<Routes>();


function App(): React.ReactElement {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Todo" component={TodoItem} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

registerRootComponent(App);
export default App;
