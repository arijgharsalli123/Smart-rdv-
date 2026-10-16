// app/(medecin)/appointments.tsx
import React from 'react';
import {
  View, Text, StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, PriorityColors } from '@/constants/Colors';
import { PriorityLabel } from '@/types/Priority';
import PriorityBadge from '@/components/PriorityBadge';
import { FAKE_APPOINTMENTS } from './dashboard';

export default function AppointmentsList() {
  const rdvTries = [...FAKE_APPOINTMENTS].sort(
    (a, b) => b.priority.score - a.priority.score
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 Tous les RDV</Text>
        <Text style={styles.sub}>{rdvTries.length} rendez-vous</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {rdvTries.map(rdv => {
          const colors = PriorityColors[rdv.priority.label as PriorityLabel];
          return (
            <View key={rdv.id}
              style={[styles.card, { borderLeftColor: colors.border }]}>
              <View style={styles.cardTop}>
                <Text style={styles.time}>🕐 {rdv.time}</Text>
                <PriorityBadge
                  label={rdv.priority.label as PriorityLabel} />
              </View>
              <Text style={styles.name}>{rdv.patientName}</Text>
              <Text style={styles.motif}>{rdv.motif}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.secondary },
  header:    { padding: 20, backgroundColor: AppColors.white,
               borderBottomWidth: 1, borderBottomColor: AppColors.border },
  title:     { fontSize: 22, fontWeight: '800', color: AppColors.dark },
  sub:       { fontSize: 13, color: AppColors.gray, marginTop: 2 },
  content:   { padding: 16, paddingBottom: 40 },
  card:      { backgroundColor: AppColors.white, borderRadius: 14,
               padding: 16, marginBottom: 10, borderLeftWidth: 5,
               elevation: 2 },
  cardTop:   { flexDirection: 'row', justifyContent: 'space-between',
               marginBottom: 6 },
  time:      { fontSize: 13, color: AppColors.gray, fontWeight: '700' },
  name:      { fontSize: 16, fontWeight: '700', color: AppColors.dark },
  motif:     { fontSize: 13, color: AppColors.gray, marginTop: 2 },
});