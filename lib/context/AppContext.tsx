// app/context/AppContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of our user data
interface UserData {
  name: string;
  bedtime: string;
  wakeupTime: string;
  sleepGoal: 'restorative' | 'deep' | 'lucid' | 'light';
  hasCompletedOnboarding: boolean;
}

// Define the shape of our templates
interface SleepTemplate {
  id: string;
  title: string;
  type: 'Restorative sleep' | 'Deep sleep' | 'Lucid dreams' | 'Light sleep';
  bedtime: string;
  wakeUpTime: string;
  hours: number;
}

// Define the shape of sleep data
interface SleepData {
  date: string;
  hours: number;
  quality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  bedtime: string;
  wakeupTime: string;
}

// Context type definition
interface AppContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  saveUserData: () => Promise<void>;

  templates: SleepTemplate[];
  addTemplate: (template: SleepTemplate) => void;
  updateTemplate: (id: string, template: Partial<SleepTemplate>) => void;
  deleteTemplate: (id: string) => void;

  sleepData: Record<string, SleepData>;
  addSleepData: (data: SleepData) => void;

  isSleepTracking: boolean;
  startSleepTracking: () => void;
  stopSleepTracking: () => void;
  sleepStartTime: Date | null;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  userData: null,
  setUserData: () => { },
  saveUserData: async () => { },

  templates: [],
  addTemplate: () => { },
  updateTemplate: () => { },
  deleteTemplate: () => { },

  sleepData: {},
  addSleepData: () => { },

  isSleepTracking: false,
  startSleepTracking: () => { },
  stopSleepTracking: () => { },
  sleepStartTime: null,
});

// Custom hook to use the app context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [templates, setTemplates] = useState<SleepTemplate[]>([]);
  const [sleepData, setSleepData] = useState<Record<string, SleepData>>({});
  const [isSleepTracking, setIsSleepTracking] = useState(false);
  const [sleepStartTime, setSleepStartTime] = useState<Date | null>(null);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load user data
        const userDataJson = await AsyncStorage.getItem('userData');
        if (userDataJson) {
          setUserData(JSON.parse(userDataJson));
        }

        // Load templates
        const templatesJson = await AsyncStorage.getItem('templates');
        if (templatesJson) {
          setTemplates(JSON.parse(templatesJson));
        }

        // Load sleep data
        const sleepDataJson = await AsyncStorage.getItem('sleepData');
        if (sleepDataJson) {
          setSleepData(JSON.parse(sleepDataJson));
        }

        // Check if sleep tracking is active
        const trackingJson = await AsyncStorage.getItem('sleepTracking');
        if (trackingJson) {
          const { isTracking, startTime } = JSON.parse(trackingJson);
          setIsSleepTracking(isTracking);
          if (isTracking && startTime) {
            setSleepStartTime(new Date(startTime));
          }
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadData();
  }, []);

  // Save user data to AsyncStorage
  const saveUserData = async () => {
    try {
      if (userData) {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Templates methods
  const addTemplate = (template: SleepTemplate) => {
    const newTemplates = [...templates, template];
    setTemplates(newTemplates);

    // Save to AsyncStorage
    try {
      AsyncStorage.setItem('templates', JSON.stringify(newTemplates));
    } catch (error) {
      console.error('Error saving templates:', error);
    }
  };

  const updateTemplate = (id: string, updatedData: Partial<SleepTemplate>) => {
    const newTemplates = templates.map(template =>
      template.id === id ? { ...template, ...updatedData } : template
    );
    setTemplates(newTemplates);

    // Save to AsyncStorage
    try {
      AsyncStorage.setItem('templates', JSON.stringify(newTemplates));
    } catch (error) {
      console.error('Error saving templates:', error);
    }
  };

  const deleteTemplate = (id: string) => {
    const newTemplates = templates.filter(template => template.id !== id);
    setTemplates(newTemplates);

    // Save to AsyncStorage
    try {
      AsyncStorage.setItem('templates', JSON.stringify(newTemplates));
    } catch (error) {
      console.error('Error saving templates:', error);
    }
  };

  // Sleep data methods
  const addSleepData = (data: SleepData) => {
    const newSleepData = { ...sleepData, [data.date]: data };
    setSleepData(newSleepData);

    // Save to AsyncStorage
    try {
      AsyncStorage.setItem('sleepData', JSON.stringify(newSleepData));
    } catch (error) {
      console.error('Error saving sleep data:', error);
    }
  };

  // Sleep tracking methods
  const startSleepTracking = () => {
    const now = new Date();
    setIsSleepTracking(true);
    setSleepStartTime(now);

    // Save tracking state to AsyncStorage
    try {
      AsyncStorage.setItem('sleepTracking', JSON.stringify({
        isTracking: true,
        startTime: now.toISOString(),
      }));
    } catch (error) {
      console.error('Error saving sleep tracking state:', error);
    }
  };

  const stopSleepTracking = () => {
    if (!sleepStartTime) return;

    const now = new Date();
    const startTime = sleepStartTime;

    // Calculate sleep duration in hours
    const durationMs = now.getTime() - startTime.getTime();
    const hours = durationMs / (1000 * 60 * 60);

    // Create new sleep record
    const today = new Date().toISOString().split('T')[0];

    // Determine sleep quality (simplified logic)
    let quality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    if (hours >= 8) quality = 'Excellent';
    else if (hours >= 7) quality = 'Good';
    else if (hours >= 6) quality = 'Fair';
    else quality = 'Poor';

    // Create sleep data entry
    const newSleepData: SleepData = {
      date: today,
      hours: Number(hours.toFixed(1)),
      quality,
      bedtime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      wakeupTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    addSleepData(newSleepData);

    // Reset tracking state
    setIsSleepTracking(false);
    setSleepStartTime(null);

    // Clear tracking state in AsyncStorage
    try {
      AsyncStorage.setItem('sleepTracking', JSON.stringify({
        isTracking: false,
        startTime: null,
      }));
    } catch (error) {
      console.error('Error clearing sleep tracking state:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        saveUserData,

        templates,
        addTemplate,
        updateTemplate,
        deleteTemplate,

        sleepData,
        addSleepData,

        isSleepTracking,
        startSleepTracking,
        stopSleepTracking,
        sleepStartTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};