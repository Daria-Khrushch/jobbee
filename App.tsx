import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from './src/lib/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        const docRef = await addDoc(collection(db, 'test'), {
          platform: 'android',
          createdAt: serverTimestamp(),
        });
        console.log('✅ Firestore ok, doc id:', docRef.id);
      } catch (e) {
        console.error('❌ Firestore test error:', e);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Firebase smoke test…</Text>
    </View>
  );
}
