// store/authStore.ts
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Role } from '@/types/User';

interface AuthState {
  token: string | null;
  role: Role | null;
  userId: number | null;
  nom: string | null;
  prenom: string | null;
  isLoaded: boolean;
  login: (token: string, role: Role, userId: number, nom: string, prenom: string) => Promise<void>;
  logout: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  userId: null,
  nom: null,
  prenom: null,
  isLoaded: false,

  login: async (token, role, userId, nom, prenom) => {
    await SecureStore.setItemAsync('accessToken', token);
    await SecureStore.setItemAsync('userRole', role);
    await SecureStore.setItemAsync('userId', String(userId));
    await SecureStore.setItemAsync('userNom', nom);
    await SecureStore.setItemAsync('userPrenom', prenom);
    set({ token, role, userId, nom, prenom, isLoaded: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('userRole');
    await SecureStore.deleteItemAsync('userId');
    await SecureStore.deleteItemAsync('userNom');
    await SecureStore.deleteItemAsync('userPrenom');
    set({ token: null, role: null, userId: null, nom: null, prenom: null });
  },

  loadFromStorage: async () => {
    const token = await SecureStore.getItemAsync('accessToken');
    const role = await SecureStore.getItemAsync('userRole') as Role | null;
    const userId = await SecureStore.getItemAsync('userId');
    const nom = await SecureStore.getItemAsync('userNom');
    const prenom = await SecureStore.getItemAsync('userPrenom');
    set({
      token,
      role,
      userId: userId ? parseInt(userId) : null,
      nom,
      prenom,
      isLoaded: true,
    });
  },
}));