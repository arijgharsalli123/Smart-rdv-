// types/Priority.ts
// 📦 Types TypeScript pour le Sprint 2

import { PriorityColors } from '../constants/Colors';

// Les 4 niveaux de priorité possibles
export type PriorityLabel = 'FAIBLE' | 'MODÉRÉ' | 'URGENT' | 'CRITIQUE';

// Score numérique 1 à 4
export type PriorityScore = 1 | 2 | 3 | 4;

// Résultat complet retourné par l'IA
export interface IAResult {
  score: PriorityScore;
  label: PriorityLabel;
  confiance: number;
  recommendation: string;
}

// Un rendez-vous avec son score IA (pour le Dashboard Médecin)
export interface AppointmentWithPriority {
  id: string;
  patientName: string;
  time: string;           // ex: "09:00"
  motif: string;          // ex: "Douleur thoracique"
  priority: IAResult;
}

// Fonction utilitaire — récupère les couleurs d'une priorité
export function getPriorityStyle(label: PriorityLabel) {
  return PriorityColors[label];
}

// Fonction utilitaire — convertit le score numérique en label
export function scorToLabel(score: PriorityScore): PriorityLabel {
  const map: Record<PriorityScore, PriorityLabel> = {
    1: 'FAIBLE',
    2: 'MODÉRÉ',
    3: 'URGENT',
    4: 'CRITIQUE',
  };
  return map[score];
}