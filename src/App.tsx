import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@amazon-devices/react-navigation__native';
import { createStackNavigator } from '@amazon-devices/react-navigation__stack';
import { LandingScreen, VideoDetailScreen, VideoPlaybackScreen } from './screens';

export const App = () => {
  const Stack = createStackNavigator();

  const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#232F3E",
        text: "white",
    },
  };

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LandingScreen' component={LandingScreen}/>
        <Stack.Screen name='VideoDetailScreen' component={VideoDetailScreen}/>
        <Stack.Screen name='VideoPlaybackScreen' component={VideoPlaybackScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
