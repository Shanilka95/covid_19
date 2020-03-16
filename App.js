import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from './src/Dashboard';
import Splash from './src/Spalsh';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}