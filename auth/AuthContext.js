// auth/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Opcional: restaurar sesión
  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('@currentUser');
      if (raw) setUser(JSON.parse(raw));
    })();
  }, []);

  const signUp = async ({ name, email, password }) => {
    const usersRaw = await AsyncStorage.getItem('@users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('El correo ya está registrado');
    }

    const newUser = { name, email, password };
    users.push(newUser);
    await AsyncStorage.setItem('@users', JSON.stringify(users));
    // login automático tras registro:
    await AsyncStorage.setItem('@currentUser', JSON.stringify({ name, email }));
    setUser({ name, email });
  };

  const signIn = async ({ email, password }) => {
    const usersRaw = await AsyncStorage.getItem('@users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error('Credenciales inválidas');
    await AsyncStorage.setItem('@currentUser', JSON.stringify({ name: found.name, email: found.email }));
    setUser({ name: found.name, email: found.email });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
