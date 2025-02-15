// RadioButtonGroup.tsx (Updated snippet)
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface RadioButtonGroupProps {
  items: { label: string; value: string }[];
  defaultValue: string;
  width?: number;
  onValueChange?: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ items, defaultValue, width = 250, onValueChange }) => {
  const [value, setValue] = React.useState(defaultValue || (items.length > 0 ? items[0].value : ''));

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <RadioButton.Group onValueChange={handleValueChange} value={value}>
      {items.map(item => (
        <View key={item.value} style={[styles.wrapper, { width }]}>
          <RadioButton.Item
            label={item.label}
            value={item.value}
            contentStyle={styles.itemContent}
            labelStyle={styles.label}
          />
        </View>
      ))}
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 99999,
    overflow: 'hidden',
    marginVertical: 0,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
  },
  itemContent: {
    backgroundColor: 'transparent',
  },
  label: {
    color: '#fff',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
  },
});

export default RadioButtonGroup;
