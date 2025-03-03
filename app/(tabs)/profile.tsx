import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/lib/styles/colors';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [userData, setUserData] = useState<any>(null);

  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  useEffect(() => {
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

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear onboarding flag but keep user preferences
              const jsonValue = await AsyncStorage.getItem('userData');
              if (jsonValue != null) {
                const data = JSON.parse(jsonValue);
                data.hasCompletedOnboarding = false;
                await AsyncStorage.setItem('userData', JSON.stringify(data));
              }

              // Navigate to onboarding
              router.replace('/onboarding');
            } catch (error) {
              console.error('Error during logout:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    value: boolean,
    onValueChange: (value: boolean) => void,
    description?: string
  ) => {
    return (
      <View style={styles.settingItem}>
        <View style={styles.settingItemLeft}>
          <Ionicons name={icon as any} size={22} color={colors.text.primary} />
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>{title}</Text>
            {description && (
              <Text style={styles.settingDescription}>{description}</Text>
            )}
          </View>
        </View>

        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.ui.cardHighlight, true: colors.primary.light }}
          thumbColor={colors.text.primary}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.screenTitle}>Profile</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={40} color={colors.text.secondary} />
          </View>

          <View style={styles.userTextContainer}>
            <Text style={styles.userName}>{userData?.name || 'User'}</Text>
            <Text style={styles.userEmail}>user@example.com</Text>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Ionicons name="create-outline" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Sleep Stats Summary */}
        <View style={styles.statsSummaryContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>7.5h</Text>
            <Text style={styles.statLabel}>Avg. Sleep</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Sleep Quality</Text>
          </View>

          <TouchableOpacity style={styles.viewStatsButton} onPress={() => router.push('/stats')}>
            <Text style={styles.viewStatsText}>View Sleep Stats</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>

          {renderSettingItem(
            'notifications-outline',
            'Notifications',
            notifications,
            setNotifications,
            'Receive reminders for bedtime and wake up'
          )}

          {renderSettingItem(
            'moon-outline',
            'Dark Mode',
            darkMode,
            setDarkMode,
            'Use dark theme throughout the app'
          )}

          {renderSettingItem(
            'volume-high-outline',
            'Sound Effects',
            soundEffects,
            setSoundEffects
          )}

          <TouchableOpacity style={styles.settingRow} onPress={() => { }}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="time-outline" size={22} color={colors.text.primary} />
              <Text style={styles.settingTitle}>Sleep Reminders</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow} onPress={() => { }}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="lock-closed-outline" size={22} color={colors.text.primary} />
              <Text style={styles.settingTitle}>Privacy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow} onPress={() => { }}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="help-circle-outline" size={22} color={colors.text.primary} />
              <Text style={styles.settingTitle}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow} onPress={() => { }}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="information-circle-outline" size={22} color={colors.text.primary} />
              <Text style={styles.settingTitle}>About</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={colors.functional.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
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
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ui.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.ui.cardHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  editProfileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.ui.cardHighlight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsSummaryContainer: {
    backgroundColor: colors.ui.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  viewStatsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: colors.ui.cardHighlight,
    borderRadius: 8,
  },
  viewStatsText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginRight: 4,
  },
  settingsContainer: {
    backgroundColor: colors.ui.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTextContainer: {
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 12,
  },
  settingDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.functional.error,
    marginLeft: 8,
  },
});