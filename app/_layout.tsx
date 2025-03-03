// app/_layout.tsx
import React, { useEffect } from 'react';
import { Slot, router, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider } from './context/AppContext';

export default function RootLayout() {
  const pathname = usePathname();

  // Check user progress and redirect accordingly
  useEffect(() => {
    const checkUserProgress = async () => {
      try {
        // Skip checks for these routes
        if (pathname === '/welcome' || pathname === '/questionnaire' || pathname === '/onboarding') {
          return;
        }

        // First, check if user has seen welcome screen
        const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
          return router.replace('/welcome');
        }

        // Next, check if the user has completed the questionnaire
        const questionnaireData = await AsyncStorage.getItem('questionnaireData');
        if (!questionnaireData) {
          return router.replace('/questionnaire');
        }

        // Finally, check if the user has completed onboarding
        const jsonValue = await AsyncStorage.getItem('userData');
        const userData = jsonValue ? JSON.parse(jsonValue) : null;
        if (!userData || !userData.hasCompletedOnboarding) {
          return router.replace('/onboarding');
        }
      } catch (error) {
        console.error('Error checking user progress:', error);
        // If there's an error, fall back to welcome screen
        router.replace('/welcome');
      }
    };

    checkUserProgress();
  }, [pathname]);

  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <Slot />
      </AppProvider>
    </SafeAreaProvider>
  );
}