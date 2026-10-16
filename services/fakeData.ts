// services/fakeData.ts
import { Doctor, Creneau } from '@/types/Doctor';
import { Appointment } from '@/types/Appointment';
import { AuthResponse,Role } from '@/types/User';

// ─── FAKE USERS ──────────────────────────────────────────────
// Dans ton fakeAuthService, trouve le tableau des utilisateurs
// et ajoute ces 2 comptes :
 export const fakeUsers = [
  {
    email: 'patient@test.com',
    password: 'test123',
    token: 'fake-token-patient',
    role: 'PATIENT' ,
    id: 1,
    nom: 'Ben Ali',
    prenom: 'Mohamed',
  },
  // ✅ NOUVEAU : compte médecin
  {
    email: 'medecin@test.com',
    password: 'test123',
    token: 'fake-token-medecin',
    role: 'MEDECIN',
    id: 2,
    nom: 'Durand',
    prenom: 'Dr. Sophie',
  },
  // ✅ NOUVEAU : compte admin
  {
    email: 'admin@test.com',
    password: 'test123',
    token: 'fake-token-admin',
    role: 'ADMIN',
    id: 3,
    nom: 'Admin',
    prenom: 'Super',
  },
];

// ─── FAKE DOCTORS ─────────────────────────────────────────────
export const fakeDoctors: Doctor[] = [
  { id: 1, nom: 'Martin', prenom: 'Pierre', specialite: 'Cardiologue',
    ville: 'Tunis', notation: 4.5, nbAvis: 120, disponible: true,
    adresseCabinet: 'Av. Habib Bourguiba, Tunis' },
  { id: 2, nom: 'Fatma', prenom: 'Ben Salah', specialite: 'Généraliste',
    ville: 'Sfax', notation: 4.8, nbAvis: 200, disponible: true,
    adresseCabinet: 'Rue de la République, Sfax' },
  { id: 3, nom: 'Karim', prenom: 'Dridi', specialite: 'Pédiatre',
    ville: 'Tunis', notation: 4.2, nbAvis: 85, disponible: false,
    adresseCabinet: 'Cité El Menzah, Tunis' },
  { id: 4, nom: 'Leila', prenom: 'Boughanmi', specialite: 'Dermatologue',
    ville: 'Sousse', notation: 4.7, nbAvis: 95, disponible: true,
    adresseCabinet: 'Centre Ville, Sousse' },
  { id: 5, nom: 'Sami', prenom: 'Chebbi', specialite: 'Ophtalmologue',
    ville: 'Tunis', notation: 4.0, nbAvis: 60, disponible: true,
    adresseCabinet: 'La Marsa, Tunis' },
  { id: 6, nom: 'Nadia', prenom: 'Hamdi', specialite: 'Cardiologue',
    ville: 'Monastir', notation: 4.6, nbAvis: 110, disponible: true,
    adresseCabinet: 'Av. du 7 Novembre, Monastir' },
];

// ─── FAKE CRENEAUX ─────────────────────────────────────────────
export const fakeCreneaux: Creneau[] = [
  { id: 1, medecinId: 1, dateDisp: '2025-04-05', heureDebut: '09:00',
    heureFin: '09:30', dureeMinutes: 30, estDispo: true },
  { id: 2, medecinId: 1, dateDisp: '2025-04-05', heureDebut: '09:30',
    heureFin: '10:00', dureeMinutes: 30, estDispo: true },
  { id: 3, medecinId: 1, dateDisp: '2025-04-05', heureDebut: '10:00',
    heureFin: '10:30', dureeMinutes: 30, estDispo: false },
  { id: 4, medecinId: 1, dateDisp: '2025-04-06', heureDebut: '14:00',
    heureFin: '14:30', dureeMinutes: 30, estDispo: true },
  { id: 5, medecinId: 2, dateDisp: '2025-04-05', heureDebut: '08:00',
    heureFin: '08:30', dureeMinutes: 30, estDispo: true },
  { id: 6, medecinId: 2, dateDisp: '2025-04-05', heureDebut: '11:00',
    heureFin: '11:30', dureeMinutes: 30, estDispo: true },
];

// ─── FAKE APPOINTMENTS ─────────────────────────────────────────
export const fakeAppointments: Appointment[] = [
  { id: 1, patientId: 1, medecinId: 1, creneauId: 3,
    dateRdv: '2025-04-05', heure: '10:00', statut: 'confirme',
    motif: 'Douleur thoracique', createdAt: '2025-03-25T10:00:00',
    medecinNom: 'Dr. Martin', medecinSpecialite: 'Cardiologue' },
];

// ─── FAKE API FUNCTIONS ────────────────────────────────────────
// Ces fonctions simulent exactement les appels HTTP

// Simule un délai réseau (300ms)
const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

export const fakeAuthService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    await delay();
    const user = fakeUsers.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Email ou mot de passe incorrect');
    return {
      token: `fake-jwt-token-${user.id}-${Date.now()}`,
      refreshToken: `fake-refresh-${user.id}`,
      role: user.role as Role,
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
    };
  },

  async register(data: {
    nom: string; prenom: string; email: string;
    password: string; telephone?: string;
  }): Promise<AuthResponse> {
    await delay(500);
    const exists = fakeUsers.find(u => u.email === data.email);
    if (exists) throw new Error('Cet email est déjà utilisé');
    const newUser = { id: fakeUsers.length + 1, role: 'PATIENT' as Role, nom: data.nom, prenom: data.prenom, email: data.email, password: data.password, token: `fake-token-${Date.now()}` };
    fakeUsers.push(newUser);
    return {
      token: `fake-jwt-token-${newUser.id}-${Date.now()}`,
      refreshToken: `fake-refresh-${newUser.id}`,
      role: 'PATIENT',
      id: newUser.id,
      nom: newUser.nom,
      prenom: newUser.prenom,
    };
  },
};

export const fakeDoctorService = {
  async searchDoctors(filters: {
    specialite?: string; ville?: string; notation_min?: number;
  }): Promise<Doctor[]> {
    await delay();
    let results = [...fakeDoctors];
    if (filters.specialite)
      results = results.filter(d =>
        d.specialite.toLowerCase().includes(filters.specialite!.toLowerCase()));
    if (filters.ville)
      results = results.filter(d =>
        d.ville.toLowerCase().includes(filters.ville!.toLowerCase()));
    if (filters.notation_min)
      results = results.filter(d => d.notation >= filters.notation_min!);
    return results;
  },

  async getDoctorById(id: number): Promise<Doctor> {
    await delay();
    const doctor = fakeDoctors.find(d => d.id === id);
    if (!doctor) throw new Error('Médecin non trouvé');
    return doctor;
  },

  async getCreneaux(doctorId: number): Promise<Creneau[]> {
    await delay();
    return fakeCreneaux.filter(c => c.medecinId === doctorId && c.estDispo);
  },
};

export const fakeAppointmentService = {
  async createAppointment(data: {
    patientId: number; medecinId: number;
    creneauId: number; motif: string;
  }): Promise<Appointment> {
    await delay(600);
    const creneau = fakeCreneaux.find(c => c.id === data.creneauId);
    if (!creneau || !creneau.estDispo)
      throw new Error('Ce créneau n\'est plus disponible');
    creneau.estDispo = false; // Marquer comme réservé
    const newRdv: Appointment = {
      id: fakeAppointments.length + 1,
      ...data,
      dateRdv: creneau.dateDisp,
      heure: creneau.heureDebut,
      statut: 'en_attente',
      createdAt: new Date().toISOString(),
    };
    fakeAppointments.push(newRdv);
    return newRdv;
  },

  async getMyAppointments(patientId: number): Promise<Appointment[]> {
    await delay();
    return fakeAppointments.filter(a => a.patientId === patientId);
  },
};