// app/questionnaire.tsx
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import DynamicMultiStepForm from '@/components/forms/DynamicMultiStepForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKGROUND_IMAGE = require('@/assets/images/Home-Background.png');

// Define the form sections and questions
const sections = [
  {
    title: "Personal Info",
    questions: [
      {
        id: "name",
        label: "Your Name",
        type: "input",
        placeholder: "Enter your name",
      },
      {
        id: "age",
        label: "Your Age",
        type: "input",
        placeholder: "Enter your age",
      },
    ],
  },
  {
    title: "Sleep Habits",
    questions: [
      {
        id: "bedtime",
        label: "What time do you usually go to bed?",
        type: "dropdown",
        defaultValue: "Choose time",
        options: [
          { label: "9:00 PM", value: "9:00 pm" },
          { label: "10:00 PM", value: "10:00 pm" },
          { label: "11:00 PM", value: "11:00 pm" },
          { label: "12:00 AM", value: "12:00 am" },
        ],
      },
      {
        id: "wakeupTime",
        label: "What time do you usually wake up?",
        type: "dropdown",
        defaultValue: "Choose time",
        options: [
          { label: "5:00 AM", value: "5:00 am" },
          { label: "6:00 AM", value: "6:00 am" },
          { label: "7:00 AM", value: "7:00 am" },
          { label: "8:00 AM", value: "8:00 am" },
        ],
      },
    ],
  },
  {
    title: "Sleep Challenges",
    questions: [
      {
        id: "difficulty",
        label: "Do you have difficulty falling asleep?",
        type: "radio",
        defaultValue: "sometimes",
        options: [
          { label: "Yes, regularly", value: "yes" },
          { label: "Sometimes", value: "sometimes" },
          { label: "Rarely", value: "rarely" },
        ],
      },
      {
        id: "wakeUp",
        label: "Do you wake up during the night?",
        type: "radio",
        defaultValue: "sometimes",
        options: [
          { label: "Multiple times", value: "multiple" },
          { label: "Sometimes", value: "sometimes" },
          { label: "Rarely", value: "rarely" },
        ],
      },
    ],
  },
  {
    title: "Sleep Goal",
    questions: [
      {
        id: "sleepGoal",
        label: "What's your primary sleep goal?",
        type: "radio",
        defaultValue: "restorative",
        options: [
          { label: "Restorative Sleep", value: "restorative" },
          { label: "Deep Sleep", value: "deep" },
          { label: "Lucid Dreams", value: "lucid" },
          { label: "Light Sleep", value: "light" },
        ],
      },
    ],
  },
];

export default function QuestionnaireScreen() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      // Save questionnaire data to AsyncStorage
      await AsyncStorage.setItem('questionnaireData', JSON.stringify(formData));

      // Create user data from questionnaire responses
      const userData = {
        name: formData.name || 'User',
        bedtime: formData.bedtime || '10:00 pm',
        wakeupTime: formData.wakeupTime || '6:00 am',
        sleepGoal: formData.sleepGoal || 'restorative',
        hasCompletedOnboarding: true
      };

      // Save user data to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Navigate to the tab layout directly instead of root
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving questionnaire data:', error);
    }
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <DynamicMultiStepForm
        sections={sections}
        onSubmit={handleSubmit}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "#101131"
  },
});