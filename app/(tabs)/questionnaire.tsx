// app/index.ts
import DynamicMultiStepForm from '@/components/forms/DynamicMultiStepForm';
import MultiStepForm from '@/components/forms/FirstForm';
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BACKGROUND_IMAGE = require('@/assets/images/Home-Background.png');

const sections = [
  {
    title: "Infos perso",
    questions: [
      {
        id: "nom",
        label: "Nom",
        type: "input",
        placeholder: "Votre nom",
      },
      {
        id: "age",
        label: "Âge",
        type: "input",
        placeholder: "Votre âge",
      },
    ],
  },
  {
    title: "Habitudes",
    questions: [
      {
        id: "coucher",
        label: "Coucher ?",
        type: "dropdown",
        defaultValue: "Choisir heure",
        options: [
          { label: "21:00", value: "21:00" },
          { label: "22:00", value: "22:00" },
          { label: "23:00", value: "23:00" },
        ],
      },
      {
        id: "reveil",
        label: "Réveil ?",
        type: "dropdown",
        defaultValue: "Choisir heure",
        options: [
          { label: "06:00", value: "06:00" },
          { label: "07:00", value: "07:00" },
          { label: "08:00", value: "08:00" },
        ],
      },
    ],
  },
  {
    title: "Défis",
    questions: [
      {
        id: "difficultes",
        label: "Dodo difficile ?",
        type: "radio",
        defaultValue: "non",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
          { label: "Parfois", value: "parfois" },
        ],
      },
      {
        id: "nuit",
        label: "Nuit éveillé ?",
        type: "radio",
        defaultValue: "jamais",
        options: [
          { label: "Chaque nuit", value: "chaque_nuit" },
          { label: "Occasionnel", value: "occasionnel" },
          { label: "Jamais", value: "jamais" },
        ],
      },
    ],
  },
  {
    title: "Sons",
    questions: [
      {
        id: "sons_utilisation",
        label: "Sons pour dormir ?",
        type: "radio",
        defaultValue: "oui",
        options: [
          { label: "Oui", value: "oui" },
          { label: "Parfois", value: "parfois" },
          { label: "Jamais", value: "jamais" },
        ],
      },
      {
        id: "sons_type",
        label: "Sons relaxants ?",
        type: "radio",
        defaultValue: "statique",
        options: [
          { label: "Statique", value: "statique" },
          { label: "Immersif", value: "immersif" },
          { label: "Guidé", value: "guide" },
        ],
      },
    ],
  },
];




export default function HomeScreen() {
  return (
<ImageBackground
  source={BACKGROUND_IMAGE}
  style={styles.background}
  imageStyle={{ resizeMode: 'cover' }}
>
  <DynamicMultiStepForm sections={sections} />
</ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // change to cover if you want it to fill the screen
    // Removed justifyContent and alignItems
    backgroundColor: "#101131"
  },
});
