// app/(tabs)/calendar.tsx
import React, { useState } from 'react';
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
import { colors } from '@/app/styles/colors';

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // Mock sleep data
  const sleepData = {
    '2025-03-01': { hours: 7.5, quality: 'Good' },
    '2025-03-02': { hours: 8.2, quality: 'Excellent' },
    '2025-03-03': { hours: 6.5, quality: 'Fair' },
    '2025-03-04': { hours: 7.0, quality: 'Good' },
    '2025-03-05': { hours: 7.8, quality: 'Good' },
  };
  
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };
  
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };
  
  const handleDateSelect = (day) => {
    const newDate = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(newDate);
  };
  
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  const getSleepQualityColor = (quality) => {
    switch (quality) {
      case 'Excellent':
        return colors.functional.success;
      case 'Good':
        return colors.primary.light;
      case 'Fair':
        return colors.functional.warning;
      case 'Poor':
        return colors.functional.error;
      default:
        return colors.text.muted;
    }
  };
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayOfMonth = getFirstDayOfMonth(selectedMonth, selectedYear);
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Render day names
    dayNames.forEach((name, index) => {
      days.push(
        <View key={`day-name-${index}`} style={styles.dayNameCell}>
          <Text style={styles.dayNameText}>{name}</Text>
        </View>
      );
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyCell} />);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const dateString = formatDate(date);
      const isToday = dateString === formatDate(new Date());
      const isSelected = dateString === formatDate(selectedDate);
      const hasSleepData = sleepData[dateString] !== undefined;
      
      days.push(
        <TouchableOpacity
          key={`day-${day}`}
          style={[
            styles.dayCell,
            isSelected && styles.selectedDayCell,
          ]}
          onPress={() => handleDateSelect(day)}
        >
          <Text style={[
            styles.dayText,
            isToday && styles.todayText,
            isSelected && styles.selectedDayText,
          ]}>
            {day}
          </Text>
          
          {hasSleepData && (
            <View
              style={[
                styles.sleepIndicator,
                { backgroundColor: getSleepQualityColor(sleepData[dateString].quality) }
              ]}
            />
          )}
        </TouchableOpacity>
      );
    }
    
    return <View style={styles.calendarGrid}>{days}</View>;
  };
  
  const renderSelectedDateInfo = () => {
    const dateString = formatDate(selectedDate);
    const data = sleepData[dateString];
    
    if (!data) {
      return (
        <View style={styles.noDataContainer}>
          <Ionicons name="moon-outline" size={48} color={colors.text.muted} />
          <Text style={styles.noDataText}>No sleep data for this date</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.sleepDataContainer}>
        <View style={styles.sleepDataHeader}>
          <Text style={styles.dateText}>
            {selectedDate.toDateString()}
          </Text>
          <View style={[
            styles.qualityBadge,
            { backgroundColor: getSleepQualityColor(data.quality) }
          ]}>
            <Text style={styles.qualityText}>{data.quality}</Text>
          </View>
        </View>
        
        <View style={styles.sleepMetricsContainer}>
          <View style={styles.sleepMetric}>
            <Ionicons name="time-outline" size={24} color={colors.text.secondary} />
            <Text style={styles.metricValue}>{data.hours} hours</Text>
            <Text style={styles.metricLabel}>Total Sleep</Text>
          </View>
          
          <View style={styles.sleepMetric}>
            <Ionicons name="bed-outline" size={24} color={colors.text.secondary} />
            <Text style={styles.metricValue}>11:30 PM</Text>
            <Text style={styles.metricLabel}>Bedtime</Text>
          </View>
          
          <View style={styles.sleepMetric}>
            <Ionicons name="sunny-outline" size={24} color={colors.text.secondary} />
            <Text style={styles.metricValue}>7:00 AM</Text>
            <Text style={styles.metricLabel}>Wake up</Text>
          </View>
        </View>
      </View>
    );
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.screenTitle}>Sleep Calendar</Text>
      
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        
        <Text style={styles.monthYearText}>
          {new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })} {selectedYear}
        </Text>
        
        <TouchableOpacity onPress={handleNextMonth}>
          <Ionicons name="chevron-forward" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.calendarContainer}>
          {renderCalendar()}
        </View>
        
        <View style={styles.selectedDateContainer}>
          {renderSelectedDateInfo()}
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
  screenTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  calendarContainer: {
    backgroundColor: colors.ui.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 24,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayNameCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  emptyCell: {
    width: '14.28%',
    aspectRatio: 1,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectedDayCell: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  todayText: {
    color: colors.primary.light,
    fontWeight: '700',
  },
  selectedDayText: {
    fontWeight: '700',
  },
  sleepIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: 6,
  },
  selectedDateContainer: {
    backgroundColor: colors.ui.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  noDataContainer: {
    alignItems: 'center',
    padding: 24,
  },
  noDataText: {
    fontSize: 16,
    color: colors.text.muted,
    marginTop: 12,
  },
  sleepDataContainer: {
    padding: 8,
  },
  sleepDataHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  qualityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  qualityText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.primary,
  },
  sleepMetricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sleepMetric: {
    alignItems: 'center',
    width: '30%',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginVertical: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});