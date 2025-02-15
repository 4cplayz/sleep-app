// RootLayout.tsx
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Asset } from 'expo-asset';
import { Stack } from 'expo-router';
import { PaperProvider, DefaultTheme } from 'react-native-paper';

const preloadAssets = async (): Promise<void> => {
  try {
    console.log("Preloading assets...");
    const images = [
      require('@/assets/images/Main-Background.png'),
      require('@/assets/images/Home-Background.png'),
    ];
    const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync());
    await Promise.all(cacheImages);
    console.log("Assets preloaded");
  } catch (error) {
    console.error("Error preloading assets:", error);
  }
};

export default function RootLayout() {
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);

  useEffect(() => {
    preloadAssets()
      .then(() => {
        console.log("Setting assetsLoaded to true");
        setAssetsLoaded(true);
      })
      .catch((error) => {
        console.error("Preloading failed:", error);
        setAssetsLoaded(true); // Optionally set to true so the app doesn't get stuck
      });
  }, []);

  if (!assetsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent', // Ensures our background is transparent
    },
  };

  return (
    <PaperProvider theme={customTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
