import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './RootStack';
import BootSplash from 'react-native-bootsplash';

export default function AppNavigator() {
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    if (navReady) {
      setTimeout(() => BootSplash.hide({ fade: true }), 0);
    }
  }, [navReady]);

  return (
    <NavigationContainer onReady={() => setNavReady(true)}>
      <RootStack />
    </NavigationContainer>
  );
}
