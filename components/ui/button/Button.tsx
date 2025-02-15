import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  style,
  titleStyle,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center', // Centers the button horizontally within its parent
    width: 200,          // Fixed width for the button
    paddingVertical: 12, // Vertical padding for height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20194D',
    borderRadius: 25,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,  // Use a value between 0 and 1 for proper opacity
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default CustomButton;
