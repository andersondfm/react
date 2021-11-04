import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Splash } from '../lotties/Splash';
import Login from '../screens/Login';
import AuthRoutes from './tab.routes';
import Pessoas from '../screens/Pessoas';
import NovaPessoa from '../screens/NovaPessoa';

const Stack = createNativeStackNavigator();

function StackNavigator(){
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={AuthRoutes} />
            <Stack.Screen name="Pessoas" component={Pessoas} />
            <Stack.Screen name="NovaPessoa" component={NovaPessoa} />
            <Stack.Screen name="Splash" component={Splash} />
        </Stack.Navigator>
    )
}

function AppRoutes(){
    return(
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}
export default AppRoutes;