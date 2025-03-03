// DynamicMultiStepForm.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import FormInput from '../ui/input/input';
import DropdownMenu from '../ui/dropdown/Dropdown';
import RadioButtonGroup from '../ui/button/RadioButton';
import CustomButton from '../ui/button/Button';

// Option type for dropdown and radio questions
export type Option = {
  label: string;
  value: string;
};

// Extend your Question type with a type field and extra props
export type Question = {
  id: string;
  label: string;
  type: 'input' | 'dropdown' | 'radio';
  placeholder?: string;           // For input questions
  options?: Option[];             // For dropdown or radio questions
  defaultValue?: string;          // For dropdown/radio default selected value
};

export type Section = {
  title: string;
  questions: Question[];
};

export type DynamicMultiStepFormProps = {
  sections: Section[];
  onSubmit?: (formData: { [key: string]: string }) => void;
};

const DynamicMultiStepForm: React.FC<DynamicMultiStepFormProps> = ({ sections, onSubmit }) => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  // Shared value for fade animation
  const animation = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animation.value,
    transform: [{ translateX: (1 - animation.value) * 20 }],
  }));

  // Handler to update the form data state
  const handleInputChange = (questionId: string, value: string) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
  };

  const nextSection = () => {
    setCurrentSection(prev => prev + 1);
  };

  // Fade out the current section then move to the next one
  const fadeOut = () => {
    animation.value = withTiming(0, { duration: 300 }, finished => {
      if (finished) {
        runOnJS(nextSection)();
      }
    });
  };

  useEffect(() => {
    animation.value = withTiming(1, { duration: 300 });
  }, [currentSection]);

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      fadeOut();
    } else {
      onSubmit ? onSubmit(formData) : console.log('Form Submitted:', formData);
    }
  };

  const currentSectionData = sections[currentSection] || { title: '', questions: [] };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.formContainer, animatedStyle]}>
        <Text style={styles.sectionTitle}>{currentSectionData.title}</Text>
        <View style={styles.questionsContainer}>
          {currentSectionData.questions.map((question: Question) => {
            // Render different components based on the question type:
            switch (question.type) {
              case 'input':
                return (
                  <FormInput
                    key={question.id}
                    label={question.label}
                    placeholder={question.placeholder || ''}
                    value={formData[question.id] || ''}
                    onChangeText={(text: string) => handleInputChange(question.id, text)}
                  />
                );
              case 'dropdown':
                return (
                  <View key={question.id} style={styles.componentContainer}>
                    <Text style={styles.questionLabel}>{question.label}</Text>
                    <DropdownMenu
                      items={question.options || []}
                      title={question.defaultValue || 'Select an option'}
                      onSelect={(item) => handleInputChange(question.id, item.value)}
                    />
                  </View>
                );
              case 'radio':
                return (
                  <View key={question.id} style={styles.componentContainer}>
                    <Text style={styles.questionLabel}>{question.label}</Text>
                    <RadioButtonGroup
                      width="100%"
                      items={question.options || []}
                      defaultValue={question.defaultValue || ''}
                      onValueChange={(value: string) => handleInputChange(question.id, value)}
                    />
                  </View>
                );
              default:
                return null;
            }
          })}
        </View>
      </Animated.View>
      <CustomButton
        title={currentSection === sections.length - 1 ? 'Submit' : 'Next'}
        onPress={handleNext}
        style={styles.button}
        titleStyle={styles.buttonText}
      />
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
    flex: 1,
    // Keep the title at the top
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Italiana-Regular',
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
    marginBottom: 20,
  },
  questionsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    gap: 20,
  },
  questionLabel: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  componentContainer: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default DynamicMultiStepForm;
