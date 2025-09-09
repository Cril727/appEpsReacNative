import React from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet } from 'react-native';

export default function AppTextInput({ label, error, style, ...rest }) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputWrap}>
        <RNTextInput
          {...rest}
          style={[styles.input, style, !!error && styles.inputError]}
          placeholderTextColor="#9AA0A6"
        />
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 14 },
  label: { marginBottom: 6, color: '#334155', fontWeight: '600' },
  inputWrap: { position: 'relative', width: '100%' },
  input: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#0F172A',
  },
  inputError: { borderColor: '#EF4444' },
  error: { marginTop: 6, color: '#EF4444', fontSize: 12 },
});
