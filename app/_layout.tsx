// app/_layout.tsx
import React, { useEffect } from 'react';
import { Slot, router, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider } from './context/AppContext';

export default function RootLayout() {
  const pathname = usePathname();

  // Check if the user has completed onboarding and redirect accordingly
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        // Skip this check for the onboarding route itself
        if (pathname === '/onboarding') return;

        const jsonValue = await AsyncStorage.getItem('userData');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;

        // If this is the first app launch or user hasn't completed onboarding, redirect to onboarding
        if (!data || !data.hasCompletedOnboarding) {
          router.replace('/onboarding');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    checkOnboarding();
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