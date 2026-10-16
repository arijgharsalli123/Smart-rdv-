// app/(patient)/appointments.tsx
import { useEffect, useState } from 'react';
import {
  View, Text, ScrollView,
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { fakeAppointmentService } from '@/services/fakeData';
import { Appointment } from '@/types/Appointment';

const STATUS_CONFIG = {
  en_attente: { label: 'En attente', color: '#ca8a04', bg: '#fef9c3', icon: '⏳' },
  confirme:   { label: 'Confirmé',   color: '#16a34a', bg: '#dcfce7', icon: '✅' },
  annule:     { label: 'Annulé',     color: '#dc2626', bg: '#fee2e2', icon: '❌' },
  termine:    { label: 'Terminé',    color: '#6b7280', bg: '#f3f4f6', icon: '🏁' },
};

export default function AppointmentsScreen() {
  const router = useRouter();
  const { userId } = useAuthStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fakeAppointmentService.getMyAppointments(userId!);
        setAppointments(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>

      {/* ── Header ── */}
      <View style={{
        backgroundColor: '#1e3a8a', paddingTop: 56,
        paddingBottom: 24, paddingHorizontal: 20,
      }}>
        <TouchableOpacity onPress={() => router.back()}
          style={{ marginBottom: 12 }}>
          <Text style={{ color: '#93c5fd', fontSize: 14 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
          📅 Mes Rendez-vous
        </Text>
        <Text style={{ color: '#93c5fd', fontSize: 13, marginTop: 4 }}>
          Historique et prochains RDV
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator color="#1e3a8a" size="large"
          style={{ marginTop: 60 }} />
      ) : appointments.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 80, padding: 20 }}>
          <Text style={{ fontSize: 56 }}>📅</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold',
            color: '#1f2937', marginTop: 16 }}>
            Aucun rendez-vous
          </Text>
          <Text style={{ color: '#6b7280', textAlign: 'center',
            marginTop: 8, fontSize: 14 }}>
            Vous n'avez pas encore de rendez-vous.{'\n'}
            Prenez votre premier RDV !
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(patient)/search' as any)}
            style={{
              backgroundColor: '#1e3a8a', borderRadius: 14,
              paddingHorizontal: 28, paddingVertical: 14,
              marginTop: 24,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
              🔍 Trouver un médecin
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: 13, color: '#6b7280', marginBottom: 14 }}>
            {appointments.length} rendez-vous trouvé(s)
          </Text>

          {appointments.map((appt) => {
            const status = STATUS_CONFIG[appt.statut];
            return (
              <View
                key={appt.id}
                style={{
                  backgroundColor: '#fff', borderRadius: 16,
                  padding: 18, marginBottom: 14,
                  borderWidth: 1, borderColor: '#e5e7eb',
                  shadowColor: '#000', shadowOpacity: 0.05,
                  shadowRadius: 6, elevation: 2,
                }}
              >
                {/* Status badge */}
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: 14,
                }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold',
                    color: '#1f2937' }}>
                    {appt.medecinNom || `Dr. #${appt.medecinId}`}
                  </Text>
                  <View style={{
                    backgroundColor: status.bg, borderRadius: 8,
                    paddingHorizontal: 10, paddingVertical: 4,
                  }}>
                    <Text style={{ color: status.color,
                      fontWeight: 'bold', fontSize: 12 }}>
                      {status.icon} {status.label}
                    </Text>
                  </View>
                </View>

                {/* Infos */}
                {[
                  { icon: '🩺', value: appt.medecinSpecialite || 'Spécialité' },
                  { icon: '📅', value: appt.dateRdv },
                  { icon: '🕐', value: appt.heure },
                  { icon: '📝', value: appt.motif },
                ].map((item, i) => (
                  <View key={i} style={{
                    flexDirection: 'row', alignItems: 'center',
                    marginBottom: 6,
                  }}>
                    <Text style={{ fontSize: 14, marginRight: 8, width: 22 }}>
                      {item.icon}
                    </Text>
                    <Text style={{ fontSize: 13, color: '#4b5563', flex: 1 }}>
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}