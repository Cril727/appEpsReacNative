import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';


export default function PrimaryButton({ title, onPress, disabled, loading, style }) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !isDisabled && styles.buttonPressed,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
    >
      {loading ? <ActivityIndicator /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },
  buttonPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  buttonDisabled: { backgroundColor: '#93C5FD' },
  text: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});
