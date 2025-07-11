import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../../screens/signIn/SignIn';
import SignUp from '../../screens/signUp/SignUp';
import Questionaire from '../../screens/questioniare/Questioniare';


const Stack = createNativeStackNavigator();

const AppNavigator = ({theme}) => {


  return (
    <NavigationContainer
    theme={theme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Questionaire" component={Questionaire} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;


export const lightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    text:'black',
    primary: '#007AFF',
    card: '#f2f2f2',
    border: '#ccc',
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    background: '#000000',
    text: 'white',
    primary: '#0A84FF',
    // card: '#1c1c1e',
    border: '#333',
  },
};

