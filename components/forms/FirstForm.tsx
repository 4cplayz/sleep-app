import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

// Define types for questions and sections
type Question = {
  id: string;
  question: string;
  placeholder: string;
};

type Section = {
  title: string;
  questions: Question[];
};

// Define your form sections with questions
const sections: Section[] = [
  {
    title: 'Section 1',
    questions: [
      {
        id: 'q1',
        question: 'How many hours do you sleep on average?',
        placeholder: 'Enter hours',
      },
      {
        id: 'q2',
        question: 'Do you have trouble falling asleep?',
        placeholder: 'Yes/No',
      },
    ],
  },
  {
    title: 'Section 2',
    questions: [
      {
        id: 'q3',
        question: 'Do you use any sleep aids?',
        placeholder: 'Enter answer',
      },
      {
        id: 'q4',
        question: 'How would you rate your sleep quality?',
        placeholder: 'Rate 1-10',
      },
    ],
  },
  {
    title: 'Section 3',
    questions: [
      {
        id: 'q3',
        question: 'Do you use any sleep aids?',
        placeholder: 'Enter answer',
      },
      {
        id: 'q4',
        question: 'How would you rate your sleep quality?',
        placeholder: 'Rate 1-10',
      },
    ],
  },
];

const MultiStepForm: React.FC = () => {
  // State for current section and form data
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  // Shared value for the fade animation (opacity)
  const animation = useSharedValue(1);

  // Animated style that uses the shared value
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animation.value,
    transform: [{ translateX: (1 - animation.value) * 20 }],
  }));

  // Update form data as the user types
  const handleInputChange = (questionId: string, value: string) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
  };

  // Stable function to update the section state, called via runOnJS
  const nextSection = () => {
    setCurrentSection(prev => prev + 1);
  };

  // Fade-out animation that updates the state when complete
  const fadeOut = () => {
    animation.value = withTiming(0, { duration: 300 }, finished => {
      if (finished) {
        // Use runOnJS with a stable function reference
        runOnJS(nextSection)();
      }
    });
  };

  // When the section changes, fade in the new content
  useEffect(() => {
    animation.value = withTiming(1, { duration: 300 });
  }, [currentSection]);

  // Handle Next/Submit button press
  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      fadeOut();
    } else {
      console.log('Form Submitted:', formData);
      // Optionally, navigate to another screen or display a success message
    }
  };

  const currentSectionData = sections[currentSection] || { title: '', questions: [] };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.formContainer, animatedStyle]}>
        <Text style={styles.title}>{currentSectionData.title}</Text>
        {currentSectionData.questions.map((question: Question) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.question}</Text>
            <TextInput
              style={styles.input}
              placeholder={question.placeholder}
              onChangeText={(text: string) => handleInputChange(question.id, text)}
              value={formData[question.id] || ''}
            />
          </View>
        ))}
      </Animated.View>
      {/* Button centered at the bottom */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentSection === sections.length - 1 ? 'Submit' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 50,
    justifyContent: 'space-between',
  },
  formContainer: {
    alignItems: 'flex-start', // Align content to the left
    gap: 40, // Spacing between elements (note: gap may not work in all React Native versions)
  },
  title: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Italiana-Regular',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
  },
  questionContainer: {
    width: '100%', // Ensure proper alignment
    alignItems: 'flex-start',
    marginBottom: 15, // Spacing between questions
  },
  questionText: {
    textAlign: 'left',
    fontSize: 20,
    color: '#ddd',
    marginVertical: 5,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
    shadowRadius: 2,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  button: {
    alignSelf: 'center', // Centers the button horizontally within its parent
    width: 200,               // Fixed width for the button
    paddingVertical: 12,      // Vertical padding for height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20194D',
    borderRadius: 25,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,       // Use a value between 0 and 1 for proper opacity
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default MultiStepForm;
