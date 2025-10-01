import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'jobbee.hasSeenOnboarding';

export const getOnboardingSeen = () => AsyncStorage.getItem(KEY);
export const setOnboardingSeen = () => AsyncStorage.setItem(KEY, '1');
export const resetOnboarding = () => AsyncStorage.removeItem(KEY); 
