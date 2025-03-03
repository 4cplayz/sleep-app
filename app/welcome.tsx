// app/welcome.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/lib/styles/colors';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleStart = async () => {
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Set flag that user has seen welcome screen
    try {
      await AsyncStorage.setItem('hasSeenWelcome', 'true');
      // Navigate to questionnaire
      router.replace('/questionnaire');
    } catch (error) {
      console.error('Error saving welcome status:', error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.titleMain}>Aurore</Text>
        <Text style={styles.titleSub}>sleep</Text>

        <Text style={styles.description}>
          Discover better sleep through personalized sleep tracking and soundscapes
        </Text>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleMain: {
    fontSize: 64,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
  },
  titleSub: {
    fontSize: 48,
    fontWeight: '300',
    color: colors.primary.light,
    textAlign: 'center',
    marginBottom: 30,
  },
  description: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: colors.primary.light,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
});