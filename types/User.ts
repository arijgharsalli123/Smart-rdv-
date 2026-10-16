// types/User.ts
export type Role = 'PATIENT' | 'MEDECIN' | 'ADMIN';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  role: Role;
  actif: boolean;
}

export interface Patient extends User {
  age?: number;
  allergies?: string;
  antecedents?: string;
  groupeSanguin?: string;
}
export interface Medecin extends User {
  specialite: string;
  ville: string;
  adresseCabinet: string;
  telephoneCabinet: string;
  emailCabinet: string;
  horaires: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  telephone?: string;
  age?: number;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  role: Role;
  id: number;
  nom: string;
  prenom: string;
}