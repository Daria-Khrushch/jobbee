// src/screens/OnboardingPro.tsx
import React, { useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Slide = {
  key: string;
  title: string;
  subtitle?: string;
  text: string;
  image: any;
};

const slides: Slide[] = [
  {
    key: 'welcome',
    title: 'Welcome to',
    subtitle: 'Jobbee',
    text: 'We are here to make your life easier by connecting you with top-notch service providers for all your home needs.',
    image: require('../../assets/onboarding/1.png'),
  },
  {
    key: 'convenience',
    title: 'Enjoy the',
    subtitle: 'Convenience',
    text: 'Access home services whenever and wherever you need them.',
    image: require('../../assets/onboarding/2.png'),
  },
  {
    key: 'reliable',
    title: 'Efficient',
    subtitle: 'A Reliable Service',
    text: 'Discover a network of trusted professionals ready to tackle any task, ensuring your home is always in tip-top shape.',
    image: require('../../assets/onboarding/3.png'),
  },
];

export default function OnboardingPro({ onDone }: { onDone: () => void }) {
  const ref = useRef<PagerView>(null);
  const [index, setIndex] = useState(0);
  const next = () =>
    index < slides.length - 1 ? ref.current?.setPage(index + 1) : onDone();

  return (
    <SafeAreaView style={s.wrap} edges={['top', 'bottom']}>
      <PagerView
        ref={ref}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={e => setIndex(e.nativeEvent.position)}
      >
        {slides.map(sli => (
          <View style={s.page} key={sli.key}>
            <Image source={sli.image} style={s.img} resizeMode="contain" />
            <Text style={s.title}>
              {sli.title} <Text style={s.subtitle}>{sli.subtitle}</Text>
            </Text>
            <Text style={s.body}>{sli.text}</Text>
          </View>
        ))}
      </PagerView>

      <View style={s.dots}>
        {slides.map((_, i) => (
          <View key={i} style={[s.dot, i === index && s.dotActive]} />
        ))}
      </View>

      <View style={s.btns}>
        <TouchableOpacity onPress={onDone} style={s.ghost}>
          <Text style={s.ghostText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={next} style={s.primary}>
          <Text style={s.primaryText}>
            {index === slides.length - 1 ? 'Start' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 20, backgroundColor: '#fff' },
  page: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  img: {
    width: '80%',
    height: '50%',
  },
  title: { fontSize: 18, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#fbbf20' },
  body: { color: '#525252', textAlign: 'center' },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#e3d8afff' },
  dotActive: { backgroundColor: '#fbbf20', width: 16 },
  btns: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#785136',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  ghost: {
    borderWidth: 1,
    borderColor: '#b59c76',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  ghostText: { color: '#785136', fontWeight: '700' },
});
