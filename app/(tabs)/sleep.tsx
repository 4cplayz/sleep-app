// app/sleep.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/lib/styles/colors';
import * as Haptics from 'expo-haptics';

// SVG Components to render the sleep volume graph
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';

export default function SleepScreen() {
  const insets = useSafeAreaInsets();
  const [isSleepModeActive, setIsSleepModeActive] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null);

  // Mock templates data
  const templates = [
    {
      id: 'restorative',
      title: 'Restorative Sleep',
      bedtime: '10:00 pm',
      wakeUpTime: '6:00 am',
      hours: 8,
    },
    {
      id: 'weekend',
      title: 'Weekend',
      bedtime: '12:00 am',
      wakeUpTime: '10:00 am',
      hours: 10,
    },
  ];

  // Mock sound categories
  const soundCategories = [
    { id: 'for-you', title: 'For you', icon: 'person' },
    { id: 'aurores-best', title: "Aurore's best", icon: 'star' },
    { id: 'ambiance', title: 'Ambiance', icon: 'cloud' },
  ];

  // Mock sounds
  const sounds = [
    { id: 'waves', title: 'Waves', category: 'for-you' },
    { id: 'rain', title: 'Rain', category: 'for-you' },
    { id: 'waves2', title: 'Waves', category: 'aurores-best' },
    { id: 'rain2', title: 'Rain', category: 'aurores-best' },
    { id: 'waves3', title: 'Waves', category: 'ambiance' },
    { id: 'rain3', title: 'Rain', category: 'ambiance' },
  ];

  useEffect(() => {
    // Initialize with first template
    if (templates.length > 0 && !selectedTemplate) {
      setSelectedTemplate(templates[0]);
    }

    // Initialize with a sound
    if (sounds.length > 0 && !selectedSound) {
      setSelectedSound(sounds[0]);
    }
  }, []);

  const toggleSleepMode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsSleepModeActive(!isSleepModeActive);
  };

  const renderVolumeGraph = () => {
    // This is a simplified representation - in a real app, you'd use actual data
    const width = Dimensions.get('window').width - 80;
    const height = 100;

    // Generate a path for the volume graph
    const path = `
      M 0 ${height * 0.5}
      L ${width * 0.2} ${height * 0.2}
      L ${width * 0.4} ${height * 0.5}
      L ${width * 0.6} ${height * 0.2}
      L ${width * 0.8} ${height * 0.4}
      L ${width} ${height * 0.6}
    `;

    return (
      <View style={styles.graphContainer}>
        <View style={styles.volumeLabels}>
          <Text style={styles.volumeLabel}>High</Text>
          <Text style={styles.volumeLabel}>Medium</Text>
          <Text style={styles.volumeLabel}>Low</Text>
          <Text style={styles.volumeLabel}>Mute</Text>
        </View>

        <Svg width={width} height={height}>
          {/* Horizontal reference lines */}
          <Line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke={colors.text.muted} strokeWidth="1" strokeOpacity="0.3" />
          <Line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke={colors.text.muted} strokeWidth="1" strokeOpacity="0.3" />
          <Line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke={colors.text.muted} strokeWidth="1" strokeOpacity="0.3" />

          {/* Volume curve */}
          <Path
            d={path}
            stroke={colors.chart.line}
            strokeWidth="3"
            fill="none"
          />
        </Svg>

        <View style={styles.timeLabels}>
          <Text style={styles.timeLabel}>10pm</Text>
          <Text style={styles.timeLabel}>2am</Text>
          <Text style={styles.timeLabel}>6am</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Plan your sleep</Text>

        {/* Calendar Days */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.daysScrollView}
        >
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayItem,
                index === 2 && styles.selectedDayItem, // Wednesday selected for demo
              ]}
            >
              <Text style={[
                styles.dayText,
                index === 2 && styles.selectedDayText,
              ]}>
                {day}
              </Text>
              <Text style={[
                styles.dateText,
                index === 2 && styles.selectedDateText,
              ]}>
                {5 + index}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.todayText}>Today</Text>

        {/* Template Selection */}
        <TouchableOpacity style={styles.selectionRow} onPress={() => {/* Navigate to templates */ }}>
          <Text style={styles.selectionLabel}>Choose a template</Text>
          <Ionicons name="chevron-forward" size={22} color={colors.text.secondary} />
        </TouchableOpacity>

        {/* Sound Selection */}
        <View style={styles.soundSelectionContainer}>
          <TouchableOpacity
            style={[styles.selectionRow, styles.soundSelection]}
            onPress={() => {/* Expand sound selection */ }}
          >
            <Text style={styles.selectionLabel}>Choose your sound</Text>
            <Ionicons name="chevron-down" size={22} color={colors.text.secondary} />
          </TouchableOpacity>

          {/* Sound Categories */}
          <View style={styles.soundCategories}>
            {soundCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  category.id === 'for-you' && styles.activeCategoryButton,
                ]}
              >
                <Ionicons
                  name={category.icon}
                  size={18}
                  color={category.id === 'for-you' ? colors.text.primary : colors.text.secondary}
                />
                <Text style={[
                  styles.categoryText,
                  category.id === 'for-you' && styles.activeCategoryText,
                ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sound Grid */}
          <View style={styles.soundGrid}>
            {sounds
              .filter(sound => sound.category === 'for-you')
              .map((sound) => (
                <TouchableOpacity
                  key={sound.id}
                  style={[
                    styles.soundButton,
                    selectedSound?.id === sound.id && styles.selectedSoundButton,
                  ]}
                  onPress={() => setSelectedSound(sound)}
                >
                  <Text style={[
                    styles.soundButtonText,
                    selectedSound?.id === sound.id && styles.selectedSoundText,
                  ]}>
                    {sound.title}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {/* Volume Graph */}
        {renderVolumeGraph()}

        {/* Alarm Setting */}
        <TouchableOpacity style={styles.alarmRow}>
          <View style={styles.alarmLeft}>
            <Ionicons name="alarm-outline" size={22} color={colors.text.secondary} />
            <Text style={styles.alarmText}>Set alarm</Text>
          </View>
          <View style={styles.alarmRight}>
            <Text style={styles.alarmSoundText}>Choose a sound</Text>
            <Ionicons name="chevron-down" size={18} color={colors.text.secondary} />
          </View>
        </TouchableOpacity>

        {/* Setup Button */}
        <TouchableOpacity style={styles.setupButton} onPress={toggleSleepMode}>
          <Text style={styles.setupButtonText}>
            {isSleepModeActive ? 'Stop Sleep Mode' : 'Set Up'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
    padding: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 24,
  },
  daysScrollView: {
    marginBottom: 12,
  },
  dayItem: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.ui.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedDayItem: {
    backgroundColor: colors.primary.light,
  },
  dayText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  selectedDayText: {
    color: colors.text.primary,
  },
  selectedDateText: {
    color: colors.text.primary,
  },
  todayText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.ui.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  selectionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
  soundSelectionContainer: {
    marginBottom: 16,
  },
  soundSelection: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
  },
  soundCategories: {
    flexDirection: 'row',
    backgroundColor: colors.ui.card,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 12,
  },
  activeCategoryButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  categoryText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  activeCategoryText: {
    color: colors.text.primary,
  },
  soundGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.ui.card,
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  soundButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ui.cardHighlight,
    margin: '1.65%',
    borderRadius: 8,
  },
  selectedSoundButton: {
    backgroundColor: colors.primary.light,
  },
  soundButtonText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  selectedSoundText: {
    color: colors.text.primary,
  },
  graphContainer: {
    flexDirection: 'row',
    backgroundColor: colors.ui.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  volumeLabels: {
    width: 60,
    justifyContent: 'space-between',
    marginRight: 8,
  },
  volumeLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  timeLabels: {
    position: 'absolute',
    bottom: 4,
    left: 76,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  alarmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.ui.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  alarmLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alarmText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginLeft: 8,
  },
  alarmRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alarmSoundText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginRight: 4,
  },
  setupButton: {
    backgroundColor: colors.primary.light,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  setupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
});