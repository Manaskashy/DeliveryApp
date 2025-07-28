import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import CartScreen from './(tabs)/CartScreen';
import HomeScreen from './(tabs)/HomeScreen';
import RestaurantsScreen from './(tabs)/RestaurantsScreen';
import SelectDishScreen from './(tabs)/SelectDishScreen';
import SignupScreen from './(tabs)/SignupScreen';

// Create a stack navigator
const Stack = createStackNavigator();

export default function RootLayout() {
  return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={SignupScreen} />
        <Stack.Screen name="Main" component={HomeScreen} />
        <Stack.Screen name="Shop" component={RestaurantsScreen} />
        <Stack.Screen name="Select" component={SelectDishScreen} />
         <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
  );
}