import React, { useState } from 'react';
import { View, Pressable, Text, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

export default function PasswordInput({
  label = 'Contraseña',
  error,
  value,
  onChangeText,
  placeholder = '••••••••',
}) {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.wrap}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secure}
          style={[styles.input, !!error && styles.inputError]}
          placeholderTextColor="#9AA0A6"
        />
        <Pressable onPress={() => setSecure(s => !s)} style={styles.toggle}>
          <Text style={styles.toggleText}>{secure ? 'Mostrar' : 'Ocultar'}</Text>
        </Pressable>
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 14 },
  label: { marginBottom: 6, color: '#334155', fontWeight: '600' },
  wrap: { position: 'relative', width: '100%' },
  input: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 12,
    paddingRight: 90,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#0F172A',
  },
  inputError: { borderColor: '#EF4444' },
  toggle: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  toggleText: { color: '#2563EB', fontWeight: '700' },
  error: { marginTop: 6, color: '#EF4444', fontSize: 12 },
});
