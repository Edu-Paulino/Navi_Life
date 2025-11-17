import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

interface CheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onPress: () => void;
  error?: string;
}

export default function Checkbox({ label, checked, onPress, error }: CheckboxProps) {
  return (
    <View>
      <Pressable style={styles.container} onPress={onPress}>
        <View style={[styles.box, checked && styles.boxChecked, error ? styles.boxError : null]}>
          {checked && <Check size={16} color={Colors.white} />}
        </View>
        <View style={styles.labelContainer}>{label}</View>
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  boxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  boxError: {
    borderColor: Colors.accent.red,
  },
  labelContainer: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.accent.red,
    marginTop: 4,
  },
});
