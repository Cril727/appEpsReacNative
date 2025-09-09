import React, { useState } from 'react';
import { View, Text, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import PasswordInput from '../../components/PasswordInput';
import PrimaryButton from '../../components/PrimaryButton';
import TextInput from '../../components/TextInput';



export default function Login() {
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
      // Lógica real de auth aquí (API / Firebase / etc.)
      await new Promise(r => setTimeout(r, 900));
      Alert.alert('Login', 'Sesión iniciada correctamente');
    } catch (err) {
      Alert.alert('Error', 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <View style={{ height: 24 }} />

        <TextInput
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

        <Pressable onPress={() => Alert.alert('Recuperar', 'Función de recuperar contraseña')}>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </Pressable>

        <View style={{ height: 8 }} />

        <Pressable onPress={() => Alert.alert('Registro', 'Ir a registro')}>
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
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  subtitle: { marginTop: 6, fontSize: 14, color: '#475569' },
  link: { marginTop: 16, color: '#2563EB', fontWeight: '600' },
  linkInline: { color: '#2563EB', fontWeight: '700' },
  muted: { color: '#64748B' },
});
