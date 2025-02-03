import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

const BACKGROUND_IMAGE = require('@/assets/images/Main-Background.png');

const MainScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Italiana-Regular': require('@/assets/fonts/Italiana-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#fff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.center}>
        <Text style={styles.title}>Aurore</Text>
          <Text style={styles.subtitle}>Transformez votre {'\n'} sommeil</Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NextScreen')}>
            <Text style={styles.buttonText}>Commencer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    height: 250,
    justifyContent: 'space-between',
    alignItems: "center"
  },
  title: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Italiana-Regular',
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    color: '#ddd',
    marginVertical: 10,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
    shadowRadius: 2,
  },
  button: {
    marginTop: 20,
    paddingInline: 60,
    backgroundColor: '#20194D',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default MainScreen;
