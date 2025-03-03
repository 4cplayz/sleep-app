// app/_layout.tsx
import React, { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider } from '../lib/context/AppContext';

// This component handles the navigation logic but only after the initial render
function NavigationHandler() {
  const segments = useSegments();
  const router = useRouter();
  
  useEffect(() => {
    // This function runs on mount to determine the correct initial screen
    const checkUserProgress = async () => {
      try {
        // Skip navigation logic for specific screens
        if (segments[0] === 'welcome' || segments[0] === 'questionnaire' || segments[0] === 'onboarding') {
          return;
        }

        // For development: Uncomment to reset AsyncStorage
        // await AsyncStorage.multiRemove(['hasSeenWelcome', 'questionnaireData', 'userData']);
        // console.log('AsyncStorage reset for development');

        const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
          router.replace('/welcome');
          return;
        }

        const questionnaireData = await AsyncStorage.getItem('questionnaireData');
        if (!questionnaireData) {
          router.replace('/questionnaire');
          return;
        }

        const userData = await AsyncStorage.getItem('userData');
        const parsedUserData = userData ? JSON.parse(userData) : null;
        if (!parsedUserData || !parsedUserData.hasCompletedOnboarding) {
          router.replace('/onboarding');
          return;
        }

        // If all checks pass and we're at the root, navigate to tabs
        if (segments.length === 0 || segments[0] === '' || segments[0] === 'index') {
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Error checking user progress:', error);
        router.replace('/welcome');
      }
    };

    // We need to ensure the layout is fully mounted before navigating
    const timer = setTimeout(() => {
      checkUserProgress();
    }, 0);

    return () => clearTimeout(timer);
  }, [router, segments]);

  return null;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <Slot />
        <NavigationHandler />
      </AppProvider>
    </SafeAreaProvider>
  );
}