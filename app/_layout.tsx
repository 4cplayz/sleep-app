// app/_layout.tsx
import React, { useEffect } from 'react';
import { Slot, router, useSegments, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider } from '../lib/context/AppContext';

export default function RootLayout() {
  const segments = useSegments();
  const pathname = usePathname();

  useEffect(() => {
    const checkUserProgress = async () => {
      try {
        // Skip checks for certain routes
        if (
          pathname === '/welcome' ||
          pathname === '/questionnaire' ||
          pathname === '/onboarding'
        ) {
          return;
        }

        // First, check if user has seen welcome screen
        const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
          console.log('Redirecting to welcome screen');
          return router.replace('/welcome');
        }

        // Next, check if the user has completed the questionnaire
        const questionnaireData = await AsyncStorage.getItem('questionnaireData');
        if (!questionnaireData) {
          console.log('Redirecting to questionnaire');
          return router.replace('/questionnaire');
        }

        // Finally, check if the user has completed onboarding
        const jsonValue = await AsyncStorage.getItem('userData');
        const userData = jsonValue ? JSON.parse(jsonValue) : null;
        if (!userData || !userData.hasCompletedOnboarding) {
          console.log('Redirecting to onboarding');
          return router.replace('/onboarding');
        }

        // If all checks pass and we're at the root, send to index
        if (pathname === '/') {
          console.log('Redirecting to home tab');
          return router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Error checking user progress:', error);
        // If there's an error, fall back to welcome screen
        router.replace('/welcome');
      }
    };

    checkUserProgress();
  }, [pathname, segments]);

  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <Slot />
      </AppProvider>
    </SafeAreaProvider>
  );
}