// app/templates.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text.primary,
  },
  templateCard: {
    backgroundColor: colors.ui.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  editButton: {
    padding: 4,
  },
  templateType: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  sleepInfo: {
    marginBottom: 16,
  },
  hoursText: {
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
  timeLabel: {
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
  addTemplateButton: {
    height: 80,
    backgroundColor: colors.ui.card,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
}); 
from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from './styles/colors';

// SVG Components to render the sleep cycle graph
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';

export default function TemplatesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Mock templates data
  const templates = [
    {
      id: 'restorative',
      title: 'Suggested for you',
      type: 'Restorative sleep',
      bedtime: '10:00 pm',
      wakeUpTime: '6:00 am',
      hours: 8,
    }
    
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
      </View>
    );,
    {
      id: 'weekend',
      title: 'Weekend',
      type: 'Deep sleep',
      bedtime: '12:00 am',
      wakeUpTime: '10:00 am',
      hours: 10,
    },
  ];
  
  const   const renderSleepCycleGraph = (template) => {
    // This is a simplified representation - in a real app, you'd use actual data
    const width = Dimensions.get('window').width - 80;
    const height = 100;
    
    // Generate a smooth curve path for the sleep cycle based on template type
    let path;
    
    if (template.type === 'Restorative sleep') {
      path = `
        M 0 ${height * 0.2}
        C ${width * 0.1} ${height * 0.7}, ${width * 0.2} ${height * 0.4}, ${width * 0.3} ${height * 0.5}
        C ${width * 0.4} ${height * 0.6}, ${width * 0.5} ${height * 0.9}, ${width * 0.7} ${height * 0.6}
        C ${width * 0.8} ${height * 0.4}, ${width * 0.9} ${height * 0.3}, ${width} ${height * 0.1}
      `;
    } else {
      path = `
        M 0 ${height * 0.3}
        C ${width * 0.1} ${height * 0.5}, ${width * 0.3} ${height * 0.8}, ${width * 0.5} ${height * 0.7}
        C ${width * 0.7} ${height * 0.6}, ${width * 0.8} ${height * 0.4}, ${width} ${height * 0.2}
      `;
    }
  }