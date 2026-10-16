// app/(medecin)/dashboard.tsx

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, PriorityColors } from '@/constants/Colors';
import { AppointmentWithPriority, PriorityLabel } from '@/types/Priority';
import PriorityBadge from '@/components/PriorityBadge';
import { useRouter } from 'expo-router'; // Ajoute cette ligne avec les autres imports
// ─────────────────────────────────────────────
// FAUSSES DONNÉES — simuler des RDV du jour
// ─────────────────────────────────────────────
export const FAKE_APPOINTMENTS: AppointmentWithPriority[] = [
  {
    id: '1',
    patientName: 'Ben Youssef Sami',
    time: '09:00',
    motif: 'Douleur thoracique + essoufflement',
    priority: {
      score: 4, label: 'CRITIQUE',
      confiance: 92,
      recommendation: '🟥 URGENCE - Consultation immédiate',
    },
  },
  {
    id: '2',
    patientName: 'Trabelsi Fatma',
    time: '09:30',
    motif: 'Fièvre élevée + maux de tête',
    priority: {
      score: 3, label: 'URGENT',
      confiance: 85,
      recommendation: '🟧 URGENT - Consultation dans les 12h',
    },
  },
  {
    id: '3',
    patientName: 'Khlifi Mohamed',
    time: '10:00',
    motif: 'Douleur abdominale modérée',
    priority: {
      score: 2, label: 'MODÉRÉ',
      confiance: 78,
      recommendation: '🟨 MODÉRÉ - Consultation dans les 48h',
    },
  },
  {
    id: '4',
    patientName: 'Chaabane Leila',
    time: '10:30',
    motif: 'Consultation de routine',
    priority: {
      score: 1, label: 'FAIBLE',
      confiance: 88,
      recommendation: '🟩 FAIBLE - Consultation non urgente',
    },
  },
  {
    id: '5',
    patientName: 'Gharbi Youssef',
    time: '11:00',
    motif: 'Vertiges + confusion',
    priority: {
      score: 4, label: 'CRITIQUE',
      confiance: 95,
      recommendation: '🟥 URGENCE - Consultation immédiate',
    },
  },
  {
    id: '6',
    patientName: 'Mansour Ines',
    time: '11:30',
    motif: 'Contrôle tension artérielle',
    priority: {
      score: 2, label: 'MODÉRÉ',
      confiance: 71,
      recommendation: '🟨 MODÉRÉ - Consultation dans les 48h',
    },
  },
];

// ─────────────────────────────────────────────
// COMPOSANT CARTE RDV
// ─────────────────────────────────────────────
function AppointmentCard({
  appointment,
  onPress,
}: {
  appointment: AppointmentWithPriority;
  onPress: () => void;
}) {
  const colors = PriorityColors[appointment.priority.label as PriorityLabel];

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: colors.border }]}
      onPress={onPress}
    >
      {/* Ligne heure + badge */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTime}>🕐 {appointment.time}</Text>
        <PriorityBadge label={appointment.priority.label as PriorityLabel} />
      </View>

      {/* Nom patient */}
      <Text style={styles.cardName}>{appointment.patientName}</Text>

      {/* Motif */}
      <Text style={styles.cardMotif}>{appointment.motif}</Text>

      {/* Confiance IA */}
      <Text style={styles.cardConfiance}>
        🤖 Confiance IA : {appointment.priority.confiance}%
      </Text>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// ÉCRAN PRINCIPAL DASHBOARD MÉDECIN
// ─────────────────────────────────────────────
export default function DashboardMedecin() {
  const [filtre, setFiltre] = useState<'TOUS' | PriorityLabel>('TOUS');

  // Trier par priorité décroissante (CRITIQUE en premier)
  const rdvTries = [...FAKE_APPOINTMENTS].sort(
    (a, b) => b.priority.score - a.priority.score
  );

  // Filtrer selon le filtre sélectionné
  const rdvFiltres = filtre === 'TOUS'
    ? rdvTries
    : rdvTries.filter(rdv => rdv.priority.label === filtre);

  // Compter les urgences
  const nbCritique = FAKE_APPOINTMENTS.filter(
    r => r.priority.label === 'CRITIQUE'
  ).length;
  const nbUrgent = FAKE_APPOINTMENTS.filter(
    r => r.priority.label === 'URGENT'
  ).length;
  const router = useRouter(); // Hook pour la navigation
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* ── HEADER ───────────────────────────── */}
        <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>👨‍⚕️ Bonjour Docteur</Text>
              <Text style={styles.date}>
                {new Date().toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </Text>
            </View>
  
          <View style={styles.headerActions}>
          {/* Bouton Notifications existant */}
          <TouchableOpacity style={styles.notifBtn}>
            <Text style={styles.notifText}>🔔</Text>
            {nbCritique > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{nbCritique}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* NOUVEAU : Bouton Déconnexion */}
          <TouchableOpacity 
            style={styles.logoutBtn} 
            onPress={() => {
              // Si tu utilises expo-router :
              // router.replace('/login'); 
              console.log('Déconnexion...');
              router.replace('/(auth)/login'); // Redirige vers l'écran de login après déconnexion
            }}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>
        {/* ── STATS DU JOUR ────────────────────── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {FAKE_APPOINTMENTS.length}
            </Text>
            <Text style={styles.statLabel}>RDV aujourd'hui</Text>
          </View>

          <View style={[styles.statCard, styles.statCardDanger]}>
            <Text style={[styles.statNumber, { color: '#FF3B30' }]}>
              🚨 {nbCritique}
            </Text>
            <Text style={styles.statLabel}>Critique</Text>
          </View>

          <View style={[styles.statCard, styles.statCardWarning]}>
            <Text style={[styles.statNumber, { color: '#FF9500' }]}>
              ⚠️ {nbUrgent}
            </Text>
            <Text style={styles.statLabel}>Urgent</Text>
          </View>
        </View>

        {/* ── FILTRES ──────────────────────────── */}
        <Text style={styles.sectionTitle}>🗓️ Planning du jour</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtresRow}
        >
          {(['TOUS', 'CRITIQUE', 'URGENT', 'MODÉRÉ', 'FAIBLE'] as const).map(f => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filtreBtn,
                filtre === f && styles.filtreBtnSelected,
                f !== 'TOUS' && { borderColor: PriorityColors[f as PriorityLabel]?.border },
                filtre === f && f !== 'TOUS' && {
                  backgroundColor: PriorityColors[f as PriorityLabel]?.background,
                },
              ]}
              onPress={() => setFiltre(f)}
            >
              <Text style={[
                styles.filtreBtnText,
                filtre === f && styles.filtreBtnTextSelected,
                filtre === f && f !== 'TOUS' && {
                  color: PriorityColors[f as PriorityLabel]?.text,
                },
              ]}>
                {f === 'TOUS' ? '📋 Tous' : `${PriorityColors[f as PriorityLabel]?.emoji} ${f}`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── LISTE RDV TRIÉS ──────────────────── */}
        {rdvFiltres.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              Aucun rendez-vous pour ce filtre
            </Text>
          </View>
        ) : (
          rdvFiltres.map(rdv => (
            <AppointmentCard
              key={rdv.id}
              appointment={rdv}
              onPress={() => console.log('RDV sélectionné:', rdv.patientName)}
            />
          ))
        )}
  

      </ScrollView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15, 
  },
  logoutBtn: {
    backgroundColor: '#F2F2F7',
    padding: 8,
    borderRadius: 10,
  },
  logoutIcon: { // <--- C'est cette clé qui manquait !
    fontSize: 20,
  },
  container:          { flex: 1, backgroundColor: AppColors.secondary },
  content:            { padding: 16, paddingBottom: 40 },

  header:             { flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: 20 },
  greeting:           { fontSize: 20, fontWeight: '800', color: AppColors.dark },
  date:               { fontSize: 13, color: AppColors.gray, marginTop: 2,
                        textTransform: 'capitalize' },
  notifBtn:           { position: 'relative' },
  notifText:          { fontSize: 28 },
  notifBadge:         { position: 'absolute', top: -4, right: -4,
                        backgroundColor: '#FF3B30', borderRadius: 10,
                        width: 18, height: 18, justifyContent: 'center',
                        alignItems: 'center' },
  notifBadgeText:     { color: '#fff', fontSize: 10, fontWeight: '700' },

  statsRow:           { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard:           { flex: 1, backgroundColor: AppColors.white,
                        borderRadius: 14, padding: 14, alignItems: 'center',
                        shadowColor: '#000', shadowOpacity: 0.05,
                        shadowRadius: 4, elevation: 2 },
  statCardDanger:     { borderTopWidth: 3, borderTopColor: '#FF3B30' },
  statCardWarning:    { borderTopWidth: 3, borderTopColor: '#FF9500' },
  statNumber:         { fontSize: 22, fontWeight: '800', color: AppColors.dark },
  statLabel:          { fontSize: 11, color: AppColors.gray,
                        marginTop: 4, textAlign: 'center' },

  sectionTitle:       { fontSize: 17, fontWeight: '700',
                        color: AppColors.dark, marginBottom: 12 },

  filtresRow:         { marginBottom: 16 },
  filtreBtn:          { paddingHorizontal: 14, paddingVertical: 8,
                        borderRadius: 20, borderWidth: 1.5,
                        borderColor: AppColors.border,
                        backgroundColor: AppColors.white,
                        marginRight: 8 },
  filtreBtnSelected:  { backgroundColor: AppColors.primary,
                        borderColor: AppColors.primary },
  filtreBtnText:      { fontSize: 13, fontWeight: '600',
                        color: AppColors.gray },
  filtreBtnTextSelected: { color: AppColors.white },

  card:               { backgroundColor: AppColors.white, borderRadius: 14,
                        padding: 16, marginBottom: 12,
                        borderLeftWidth: 5,
                        shadowColor: '#000', shadowOpacity: 0.06,
                        shadowRadius: 6, elevation: 3 },
  cardHeader:         { flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: 8 },
  cardTime:           { fontSize: 14, fontWeight: '700', color: AppColors.gray },
  cardName:           { fontSize: 17, fontWeight: '700',
                        color: AppColors.dark, marginBottom: 4 },
  cardMotif:          { fontSize: 13, color: AppColors.gray, marginBottom: 6 },
  cardConfiance:      { fontSize: 12, color: AppColors.gray, fontStyle: 'italic' },

  emptyBox:           { padding: 40, alignItems: 'center' },
  emptyText:          { fontSize: 15, color: AppColors.gray },
});