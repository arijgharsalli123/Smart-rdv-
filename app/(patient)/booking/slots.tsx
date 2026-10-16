// app/(patient)/booking/slots.tsx
import { useEffect, useState } from 'react';
import {
  View, Text, ScrollView,
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { fakeDoctorService } from '@/services/fakeData';
import { Creneau } from '@/types/Doctor';

export default function SlotsScreen() {
  const router = useRouter();
  const { doctorId, doctorNom, doctorPrenom, specialite } = useLocalSearchParams();
  const [creneaux, setCreneaux] = useState<Creneau[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Creneau | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fakeDoctorService.getCreneaux(Number(doctorId));
        setCreneaux(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [doctorId]);

  // Grouper par date
  const grouped = creneaux.reduce((acc, c) => {
    if (!acc[c.dateDisp]) acc[c.dateDisp] = [];
    acc[c.dateDisp].push(c);
    return acc;
  }, {} as Record<string, Creneau[]>);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long'
    });
  };

  const handleNext = () => {
    if (!selected) return;
    router.push(`/(patient)/booking/motif?doctorId=${doctorId}&doctorNom=${doctorNom}&doctorPrenom=${doctorPrenom}&specialite=${specialite}&creneauId=${selected.id}&date=${selected.dateDisp}&heure=${selected.heureDebut}` as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>

      {/* ── Header ── */}
      <View style={{
        backgroundColor: '#1e3a8a', paddingTop: 56,
        paddingBottom: 24, paddingHorizontal: 20,
      }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginBottom: 12 }}
        >
          <Text style={{ color: '#93c5fd', fontSize: 14 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
          📅 Créneaux disponibles
        </Text>
        <Text style={{ color: '#93c5fd', fontSize: 13, marginTop: 4 }}>
          Dr. {doctorPrenom} {doctorNom} · {specialite}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator color="#1e3a8a" size="large"
          style={{ marginTop: 60 }} />
      ) : creneaux.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <Text style={{ fontSize: 48 }}>📅</Text>
          <Text style={{ fontSize: 16, color: '#6b7280', marginTop: 12 }}>
            Aucun créneau disponible
          </Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ padding: 16 }}>
            {Object.entries(grouped).map(([date, slots]) => (
              <View key={date} style={{ marginBottom: 20 }}>
                {/* Date */}
                <View style={{
                  backgroundColor: '#dbeafe', borderRadius: 10,
                  paddingHorizontal: 14, paddingVertical: 8,
                  marginBottom: 10, alignSelf: 'flex-start',
                }}>
                  <Text style={{ color: '#1e3a8a', fontWeight: 'bold',
                    fontSize: 13, textTransform: 'capitalize' }}>
                    📆 {formatDate(date)}
                  </Text>
                </View>

                {/* Créneaux */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                  {slots.map((slot) => (
                    <TouchableOpacity
                      key={slot.id}
                      onPress={() => setSelected(slot)}
                      style={{
                        backgroundColor: selected?.id === slot.id
                          ? '#1e3a8a' : '#ffffff',
                        borderRadius: 12, paddingHorizontal: 18,
                        paddingVertical: 12,
                        borderWidth: 2,
                        borderColor: selected?.id === slot.id
                          ? '#1e3a8a' : '#e5e7eb',
                        alignItems: 'center',
                        minWidth: 90,
                      }}
                    >
                      <Text style={{
                        color: selected?.id === slot.id ? '#fff' : '#1f2937',
                        fontWeight: 'bold', fontSize: 15,
                      }}>
                        {slot.heureDebut}
                      </Text>
                      <Text style={{
                        color: selected?.id === slot.id ? '#bfdbfe' : '#6b7280',
                        fontSize: 11, marginTop: 2,
                      }}>
                        {slot.dureeMinutes} min
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      )}

      {/* ── Bouton Suivant fixe en bas ── */}
      {selected && (
        <View style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          backgroundColor: '#fff', padding: 16,
          borderTopWidth: 1, borderTopColor: '#e5e7eb',
        }}>
          <View style={{
            backgroundColor: '#eff6ff', borderRadius: 10,
            padding: 10, marginBottom: 10,
          }}>
            <Text style={{ color: '#1e3a8a', fontSize: 13, textAlign: 'center' }}>
              ✅ Créneau sélectionné :{' '}
              <Text style={{ fontWeight: 'bold' }}>
                {formatDate(selected.dateDisp)} à {selected.heureDebut}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: '#1e3a8a', borderRadius: 14,
              padding: 16, alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
              Continuer →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}