// app/sounds.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/app/styles/colors';

// Mock data for sound categories
const SOUND_CATEGORIES = [
  { id: 'for-you', title: 'For you', icon: 'person' },
  { id: 'aurores-best', title: "Aurore's best", icon: 'star' },
  { id: 'ambiance', title: 'Ambiance', icon: 'cloud' },
  { id: 'frequencies', title: 'Frequencies', icon: 'pulse' },
  { id: 'my-favorites', title: 'My favourites', icon: 'heart' },
];

// Mock data for sounds
const SOUNDS_DATA = [
  { id: '1', title: 'Rainy forest', duration: '2h 45m', category: 'for-you' },
  { id: '2', title: 'Ocean waves', duration: '1h 45m', category: 'for-you' },
  { id: '3', title: 'Snow storm', duration: '1h 45m', category: 'for-you' },
  { id: '4', title: 'Rainy forest', duration: '2h 45m', category: 'aurores-best' },
  { id: '5', title: 'Ocean waves', duration: '1h 45m', category: 'aurores-best' },
  { id: '6', title: 'Snow storm', duration: '1h 45m', category: 'aurores-best' },
  { id: '7', title: 'Rainy forest', duration: '2h 45m', category: 'ambiance' },
  { id: '8', title: 'Ocean waves', duration: '1h 45m', category: 'ambiance' },
  { id: '9', title: 'Snow storm', duration: '1h 45m', category: 'ambiance' },
  { id: '10', title: 'Rainy forest', duration: '2h 45m', category: 'frequencies' },
  { id: '11', title: 'Ocean waves', duration: '1h 45m', category: 'frequencies' },
  { id: '12', title: 'Snow storm', duration: '1h 45m', category: 'frequencies' },
  { id: '13', title: 'Rainy forest', duration: '2h 45m', category: 'my-favorites' },
  { id: '14', title: 'Ocean waves', duration: '1h 45m', category: 'my-favorites' },
  { id: '15', title: 'Snow storm', duration: '1h 45m', category: 'my-favorites' },
];

export default function SoundsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('for-you');
  
  const filteredSounds = SOUNDS_DATA.filter(
    sound => sound.category === selectedCategory
  );
  
  const renderSoundItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.soundCard}
      onPress={() => console.log(`Playing ${item.title}`)}
    >
      <View style={styles.soundImagePlaceholder}>
        <Text style={styles.imagePlaceholderText}>image</Text>
      </View>
      <Text style={styles.soundTitle}>{item.title}</Text>
      <Text style={styles.soundDuration}>{item.duration}</Text>
    </TouchableOpacity>
  );
  
  const renderCategorySection = (category) => {
    const isActive = selectedCategory === category.id;
    
    return (
      <View key={category.id} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <TouchableOpacity onPress={() => console.log(`View all ${category.title}`)}>
            <Ionicons name="chevron-forward" size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={filteredSounds}
          renderItem={renderSoundItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.soundsListContainer}
        />
      </View>
    );
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.screenTitle}>Sounds</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {SOUND_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.id;
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                isActive && styles.activeCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons
                name={category.icon}
                size={20}
                color={isActive ? colors.text.primary : colors.text.secondary}
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  isActive && styles.activeCategoryText,
                ]}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCategorySection(
          SOUND_CATEGORIES.find(cat => cat.id === selectedCategory)
        )}
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
  categoriesContainer: {
    paddingRight: 20,
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    borderRadius: 20,
  },
  activeCategoryButton: {
    backgroundColor: colors.primary.light,
  },
  categoryButtonText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 8,
  },
  activeCategoryText: {
    color: colors.text.primary,
  },
  content: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  soundsListContainer: {
    paddingRight: 20,
  },
  soundCard: {
    width: 120,
    marginRight: 12,
  },
  soundImagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: colors.ui.card,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  soundTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  soundDuration: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});