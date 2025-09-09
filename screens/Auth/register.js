import React, { useState } from 'react';
import { View, Text, Pressable, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useAuth } from '../../auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../../components/TextInput';
import PasswordInput from '../../components/PasswordInput';
import PrimaryButton from '../../components/PrimaryButton';

export default function Register() {
  const { signUp } = useAuth();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Ingresa tu nombre';
    if (!email.trim()) e.email = 'Ingresa tu correo';
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Correo inválido';
    if (!pwd) e.pwd = 'Ingresa una contraseña';
    else if (pwd.length < 6) e.pwd = 'Mínimo 6 caracteres';
    if (pwd2 !== pwd) e.pwd2 = 'Las contraseñas no coinciden';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      await signUp({ name, email, password: pwd });
      Alert.alert('Listo', 'Cuenta creada');
      navigation.reset({ index: 0, routes: [{ name: 'Inicio' }] });
    } catch (err) {
      Alert.alert('Error', err.message || 'No se pudo crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding' })} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Regístrate para continuar</Text>

        <View style={{ height: 24 }} />

        <AppTextInput
          label="Nombre"
          placeholder="Tu nombre"
          value={name}
          onChangeText={setName}
          error={errors.name}
          returnKeyType="next"
        />

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
          value={pwd}
          onChangeText={setPwd}
          error={errors.pwd}
        />

        <PasswordInput
          label="Repite la contraseña"
          value={pwd2}
          onChangeText={setPwd2}
          error={errors.pwd2}
        />

        <PrimaryButton title="Crear cuenta" onPress={onSubmit} loading={loading} />

        <View style={{ height: 8 }} />
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.muted}>
            ¿Ya tienes cuenta? <Text style={styles.linkInline}>Inicia sesión</Text>
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
