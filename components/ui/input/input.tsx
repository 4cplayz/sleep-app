// FormInput.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  containerStyle?: object;
  labelStyle?: object;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  containerStyle,
  labelStyle,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={styles.input}
        {...textInputProps}
        // Optional: customize placeholder text color if needed
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    color: '#ddd',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: '#fff', // This makes the input text white
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
  },
});

export default FormInput;
