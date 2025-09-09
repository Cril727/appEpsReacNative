import React, { useState } from 'react';
import { View, Text, Pressable, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import { useAuth } from '../../auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../../components/TextInput';
import PasswordInput from '../../components/PasswordInput';
import PrimaryButton from '../../components/PrimaryButton';

export default function Login() {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: undefined, password: undefined });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Ingresa tu correo';
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Correo inválido';
    if (!password) e.password = 'Ingresa tu contraseña';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      await signIn({ email, password });
      navigation.reset({ index: 0, routes: [{ name: 'Inicio' }] });
    } catch (err) {
      Alert.alert('Error', err.message || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding' })} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <View style={{ height: 24 }} />

        <AppTextInput
          label="Correo"
          placeholder="tu@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          returnKeyType="next"
        />

        <PasswordInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />

        <PrimaryButton title="Entrar" onPress={onSubmit} loading={loading} />

        <View style={{ height: 8 }} />
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.muted}>
            ¿No tienes cuenta? <Text style={styles.linkInline}>Crea una</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC',
  },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  subtitle: { marginTop: 6, fontSize: 14, color: '#475569' },
  linkInline: { color: '#2563EB', fontWeight: '700' },
  muted: { color: '#64748B' },
});
