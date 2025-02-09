// app/index.tsx
import MultiStepForm from '@/components/card/FirstForm';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

const BACKGROUND_IMAGE = require('@/assets/images/Home-Background.png');

export default function HomeScreen() {
  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.background}>
      <MultiStepForm />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
