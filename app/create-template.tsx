// app/create-template.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from './styles/colors';
import * as Haptics from 'expo-haptics';

export default function CreateTemplateScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [title, setTitle] = useState('');
  const [bedtime, setBedtime] = useState('10:00 pm');
  const [wakeupTime, setWakeupTime] = useState('6:00 am');
  const [sleepGoal, setSleepGoal] = useState('restorative');
  
  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Save template logic would go here
    console.log('Saving template:', { title, bedtime, wakeupTime, sleepGoal });
    router.back();
  };
  
  const calculateHours = () => {
    // This is a simplified calculation for the UI
    // In a real app, you'd want to handle time properly
    const bedHour = parseInt(bedtime.split(':')[0]);
    const wakeHour = parseInt(wakeupTime.split(':')[0]);
    
    let hours = wakeHour - bedHour;
    if (bedtime.includes('pm') && wakeupTime.includes('am')) {
      hours = 12 - bedHour + wakeHour;
    }
    
    return hours > 0 ? hours : 8; // Fallback to 8 hours if calculation fails
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Create your template</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a name for this template"
              placeholderTextColor={colors.text.muted}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Bedtime and Wake-Up Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bedtime and Wake-Up Time</Text>
            <View style={styles.timeContainer}>
              <View style={styles.timeBlock}>
                <Ionicons name="moon-outline" size={20} color={colors.text.secondary} />
                <Text style={styles.timeLabel}>Bedtime</Text>
                <TouchableOpacity style={styles.timeSelector}>
                  <Text style={styles.timeValue}>{bedtime}</Text>
                  <Ionicons name="chevron-down" size={16} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.timeBlock}>
                <Ionicons name="sunny-outline" size={20} color={colors.text.secondary} />
                <Text style={styles.timeLabel}>Wake-Up Time</Text>
                <TouchableOpacity style={styles.timeSelector}>
                  <Text style={styles.timeValue}>{wakeupTime}</Text>
                  <Ionicons name="chevron-down" size={16} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.hoursText}>{calculateHours()} hours of sleep</Text>
          </View>

          {/* Sleep Goal */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Choose your sleep goal</Text>
            <View style={styles.sleepGoalContainer}>
              <TouchableOpacity
                style={[
                  styles.sleepGoalOption,
                  sleepGoal === 'restorative' && styles.selectedGoal
                ]}
                onPress={() => setSleepGoal('restorative')}
              >
                <View style={styles.radioButton}>
                  {sleepGoal === 'restorative' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.sleepGoalText}>Restorative Sleep</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.sleepGoalOption,
                  sleepGoal === 'deep' && styles.selectedGoal
                ]}
                onPress={() => setSleepGoal('deep')}
              >
                <View style={styles.radioButton}>
                  {sleepGoal === 'deep' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.sleepGoalText}>Deep sleep</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.sleepGoalOption,
                  sleepGoal === 'lucid' && styles.selectedGoal
                ]}
                onPress={() => setSleepGoal('lucid')}
              >
                <View style={styles.radioButton}>
                  {sleepGoal === 'lucid' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.sleepGoalText}>Lucid dreams</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.sleepGoalOption,
                  sleepGoal === 'light' && styles.selectedGoal
                ]}
                onPress={() => setSleepGoal('light')}
              >
                <View style={styles.radioButton}>
                  {sleepGoal === 'light' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.sleepGoalText}>Light sleep</Text>
              </TouchableOpacity>
            </View>

            {sleepGoal === 'restorative' && (
              <View style={styles.goalDescription}>
                <Ionicons name="flash" size={18} color={colors.primary.light} />
                <Text style={styles.goalDescriptionText}>
                  Restorative sleep enhances energy and focus for the next day.
                </Text>
              </View>
            )}

            {/* Volume Control Graph (placeholder) */}
            <View style={styles.volumeContainer}>
              <Text style={styles.volumeLabel}>Volume</Text>
              <View style={styles.volumeGraphContainer}>
                {/* This would be replaced with an actual interactive graph */}
                <View style={styles.volumeGraph}>
                  <View style={styles.volumeLine} />
                </View>
                <View style={styles.volumeLevels}>
                  <Text style={styles.volumeLevelText}>High</Text>
                  <Text style={styles.volumeLevelText}>Medium</Text>
                  <Text style={styles.volumeLevelText}>Low</Text>
                  <Text style={styles.volumeLevelText}>Mute</Text>
                </View>
                <View style={styles.timeLine}>
                  <Text style={styles.timeLineText}>10pm</Text>
                  <Text style={styles.timeLineText}>2am</Text>
                  <Text style={styles.timeLineText}>6am</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
  },
  backButton: {
    padding: 4,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  saveButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.primary.light,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.ui.card,
    borderRadius: 12,
    padding: 16,
    color: colors.text.primary,
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.ui.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  timeBlock: {
    alignItems: 'center',
    width: '48%',
  },
  timeLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginVertical: 4,
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timeValue: {
    fontSize: 16,
    color: colors.text.primary,
    marginRight: 4,
  },
  hoursText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 8,
    textAlign: 'center',
  },
  sleepGoalContainer: {
    marginBottom: 16,
  },
  sleepGoalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedGoal: {
    opacity: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary.light,
  },
  sleepGoalText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  goalDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  goalDescriptionText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.primary.light,
    flex: 1,
  },
  volumeContainer: {
    marginTop: 16,
  },
  volumeLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  volumeGraphContainer: {
    backgroundColor: colors.ui.card,
    borderRadius: 12,
    padding: 16,
    height: 150,
  },
  volumeGraph: {
    height: 80,
    position: 'relative',
  },
  volumeLine: {
    height: 2,
    backgroundColor: colors.primary.light,
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
  },
  volumeLevels: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  volumeLevelText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  timeLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeLineText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});