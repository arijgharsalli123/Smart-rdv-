// types/Appointment.ts
export type AppointmentStatus = 'en_attente' | 'confirme' | 'annule' | 'termine';
export type PriorityScore = 'FAIBLE' | 'MODERE' | 'URGENT' | 'CRITIQUE';

export interface Appointment {
  id: number;
  patientId: number;
  medecinId: number;
  creneauId: number;
  dateRdv: string;
  heure: string;
  statut: AppointmentStatus;
  scorePriorite?: PriorityScore;
  motif: string;
  createdAt: string;
  // Données enrichies pour l'affichage
  medecinNom?: string;
  medecinSpecialite?: string;
}

export interface BookingRequest {
  patientId: number;
  medecinId: number;
  creneauId: number;
  motif: string;
}