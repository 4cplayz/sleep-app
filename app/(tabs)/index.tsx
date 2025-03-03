// app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/lib/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

// SVG Components to render the sleep cycle graph
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [userData, setUserData] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Remove the checkOnboarding call and just load user data
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue != null) {
        setUserData(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 3);
  };

  // Rest of your component code...
  
  // The existing code is kept for all the UI and functionality
  const getDaysOfWeek = () => {
    const today = new Date();
    const days = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const isToday = i === 0;
      days.push({
        day: formatDay(date),
        date: date.getDate(),
        isToday,
      });
    }

    return days;
  };

  const renderSleepCycleGraph = () => {
    // This is a simplified representation - in a real app, you'd use actual data
    const width = Dimensions.get('window').width - 80;
    const height = 120;

    // Generate a smooth curve path for the sleep cycle
    // In a real app, you'd use actual sleep data points
    const path = `
      M 0 ${height * 0.2}
      C ${width * 0.1} ${height * 0.7}, ${width * 0.2} ${height * 0.4}, ${width * 0.3} ${height * 0.5}
      C ${width * 0.4} ${height * 0.6}, ${width * 0.5} ${height * 0.9}, ${width * 0.7} ${height * 0.6}
      C ${width * 0.8} ${height * 0.4}, ${width * 0.9} ${height * 0.3}, ${width} ${height * 0.1}
    `;

    return (
      <View style={styles.graphContainer}>
        <Svg width={width} height={height}>
          {/* Sleep stage lines */}
          <Line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke={colors.chart.awake} strokeWidth="1" strokeOpacity="0.5" />
          <SvgText x="5" y={height * 0.25 - 5} fill={colors.chart.awake} fontSize="12">Awake</SvgText>

          <Line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke={colors.chart.rem} strokeWidth="1" strokeOpacity="0.5" />
          <SvgText x="5" y={height * 0.5 - 5} fill={colors.chart.rem} fontSize="12">REM</SvgText>

          <Line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke={colors.chart.light} strokeWidth="1" strokeOpacity="0.5" />
          <SvgText x="5" y={height * 0.75 - 5} fill={colors.chart.light} fontSize="12">Light</SvgText>

          <Line x1="0" y1={height * 0.95} x2={width} y2={height * 0.95} stroke={colors.chart.deep} strokeWidth="1" strokeOpacity="0.5" />
          <SvgText x="5" y={height * 0.95 - 5} fill={colors.chart.deep} fontSize="12">Deep</SvgText>

          {/* Sleep cycle curve */}
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
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appName}>Aurore sleep</Text>

          <TouchableOpacity style={styles.editButton} onPress={() => router.push('/templates')}>
            <Ionicons name="create-outline" size={18} color={colors.text.secondary} />
            <Text style={styles.editButtonText}>Edit sleep cycle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.suggestedCard}>
          <Text style={styles.sectionTitle}>Suggested for you</Text>
          <Text style={styles.sleepTypeText}>
            {userData?.sleepGoal === 'restorative' ? 'Restorative sleep' :
              userData?.sleepGoal === 'deep' ? 'Deep sleep' :
                userData?.sleepGoal === 'lucid' ? 'Lucid dreams' : 'Light sleep'}
          </Text>

          <View style={styles.sleepTimeInfo}>
            <Text style={styles.sleepHoursText}>8 hours of sleep</Text>

            <View style={styles.timeInfo}>
              <View style={styles.timeBlock}>
                <Ionicons name="moon-outline" size={16} color={colors.text.secondary} />
                <Text style={styles.timeText}>Bedtime</Text>
                <Text style={styles.timeValue}>{userData?.bedtime || '10:00 pm'}</Text>
              </View>

              <View style={styles.timeBlock}>
                <Ionicons name="sunny-outline" size={16} color={colors.text.secondary} />
                <Text style={styles.timeText}>Wake-Up Time</Text>
                <Text style={styles.timeValue}>{userData?.wakeupTime || '6:00 am'}</Text>
              </View>
            </View>
          </View>

          {renderSleepCycleGraph()}
        </View>

        {/* Calendar Section */}
        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>Calendar</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.daysScrollView}
            contentContainerStyle={styles.daysContainer}
          >
            {getDaysOfWeek().map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayItem,
                  item.isToday && styles.currentDayItem,
                ]}
                onPress={() => { }}
              >
                <Text
                  style={[
                    styles.dayText,
                    item.isToday && styles.currentDayText,
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    item.isToday && styles.currentDateText,
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sounds Section */}
        <View style={styles.soundsSection}>
          <Text style={styles.sectionTitle}>Sounds</Text>

          <View style={styles.soundCategories}>
            <TouchableOpacity
              style={[styles.categoryButton, styles.activeCategory]}
              onPress={() => { }}
            >
              <Ionicons name="person" size={22} color={colors.text.primary} />
              <Text style={styles.categoryText}>For you</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => { }}
            >
              <Ionicons name="star" size={22} color={colors.text.secondary} />
              <Text style={styles.categoryText}>Aurore's best</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => { }}
            >
              <Ionicons name="cloud" size={22} color={colors.text.secondary} />
              <Text style={styles.categoryText}>Ambiance</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  header: {
    marginTop: 10,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text.primary,
  },
  appName: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  suggestedCard: {
    backgroundColor: colors.ui.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  sleepTypeText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  sleepTimeInfo: {
    marginBottom: 16,
  },
  sleepHoursText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeBlock: {
    alignItems: 'center',
    width: '48%',
  },
  timeText: {
    fontSize: 12,
    color: colors.text.secondary,
    marginVertical: 4,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  graphContainer: {
    marginTop: 12,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  timeLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  calendarSection: {
    marginBottom: 24,
  },
  daysScrollView: {
    marginTop: 12,
  },
  daysContainer: {
    paddingRight: 20,
  },
  dayItem: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: colors.ui.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  currentDayItem: {
    backgroundColor: colors.primary.light,
  },
  dayText: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  currentDayText: {
    color: colors.text.primary,
  },
  currentDateText: {
    color: colors.text.primary,
  },
  soundsSection: {
    marginBottom: 24,
  },
  soundCategories: {
    flexDirection: 'row',
    marginTop: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  activeCategory: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  categoryText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 6,
  },
});