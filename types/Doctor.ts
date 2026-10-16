// types/Doctor.ts
export interface Doctor {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
  ville: string;
  adresseCabinet?: string;
  notation: number;
  nbAvis: number;
  disponible: boolean;
  photo?: string;
}

export interface Creneau {
  id: number;
  medecinId: number;
  dateDisp: string;    // format: "2025-04-10"
  heureDebut: string;  // format: "09:00"
  heureFin: string;    // format: "09:30"
  dureeMinutes: number;
  estDispo: boolean;
}