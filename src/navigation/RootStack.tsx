import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defaultStackOptions } from './options';
import type { RootStackParamList } from './types';
import { getOnboardingSeen, setOnboardingSeen } from '../storage/onboarding';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomePlaceholder() {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text>Jobbee Home</Text>
    </View>
  );
}

export default function RootStack() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    (async () => {
      const seen = await getOnboardingSeen();
      setShowOnboarding(!seen);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    // Пока решаем стартовый экран — пусть остаётся bootsplash (ничего не рисуем)
    return null;
  }

  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      {showOnboarding ? (
        <Stack.Screen name="Onboarding">
          {() => (
            <OnboardingScreen
              onDone={async () => {
                await setOnboardingSeen();
                setShowOnboarding(false);
              }}
            />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Home" component={HomePlaceholder} />
      )}
    </Stack.Navigator>
  );
}
