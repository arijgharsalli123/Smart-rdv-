// app/(patient)/doctor/[id].tsx
import { useEffect, useState } from 'react';
import {
  View, Text, ScrollView,
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { fakeDoctorService } from '@/services/fakeData';
import { Doctor } from '@/types/Doctor';

export default function DoctorProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const doc = await fakeDoctorService.getDoctorById(Number(id));
        setDoctor(doc);
      } catch (e) {
        router.back();
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="#1e3a8a" size="large" />
    </View>
  );

  if (!doctor) return null;

  const stars = '⭐'.repeat(Math.round(doctor.notation));

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#f3f4f6' }}
      showsVerticalScrollIndicator={false}>
      {/* ── Header bleu ── */}
      <View style={{
        backgroundColor: '#1e3a8a', paddingTop: 56,
        paddingBottom: 36, alignItems: 'center',
        paddingHorizontal: 20,
      }}>
        {/* Bouton retour */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: 'absolute', top: 52, left: 18,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6,
          }}
        >
          <Text style={{ color: 'white', fontSize: 14 }}>← Retour</Text>
        </TouchableOpacity>

        {/* Avatar */}
        <View style={{
          width: 90, height: 90, borderRadius: 45,
          backgroundColor: '#dbeafe', justifyContent: 'center',
          alignItems: 'center', marginBottom: 14,
          borderWidth: 3, borderColor: '#ffffff',
        }}>
          <Text style={{ fontSize: 42 }}>👨‍⚕️</Text>
        </View>

        <Text style={{
          color: '#ffffff', fontSize: 22,
          fontWeight: 'bold', textAlign: 'center'
        }}>
          Dr. {doctor.prenom} {doctor.nom}
        </Text>
        <Text style={{ color: '#93c5fd', fontSize: 15, marginTop: 4 }}>
          {doctor.specialite}
        </Text>

        {/* Badge disponible */}
        <View style={{
          backgroundColor: doctor.disponible ? '#dcfce7' : '#fee2e2',
          borderRadius: 20, paddingHorizontal: 16,
          paddingVertical: 6, marginTop: 10,
        }}>
          <Text style={{
            color: doctor.disponible ? '#16a34a' : '#dc2626',
            fontWeight: 'bold', fontSize: 13,
          }}>
            {doctor.disponible ? '✓ Accepte de nouveaux patients' : '✗ Indisponible'}
          </Text>
        </View>
      </View>

      <View style={{ padding: 20 }}>

        {/* ── Infos rapides ── */}
        <View style={{
          backgroundColor: '#ffffff', borderRadius: 16,
          padding: 18, marginBottom: 16,
          borderWidth: 1, borderColor: '#e5e7eb',
        }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold',
            color: '#1f2937', marginBottom: 14 }}>
            Informations
          </Text>

          {[
            { icon: '📍', label: 'Ville', value: doctor.ville },
            { icon: '🏥', label: 'Cabinet', value: doctor.adresseCabinet || 'Non renseigné' },
            { icon: '⭐', label: 'Note', value: `${stars} (${doctor.notation.toFixed(1)}/5)` },
            { icon: '💬', label: 'Avis', value: `${doctor.nbAvis} patients` },
          ].map((item, i) => (
            <View key={i} style={{
              flexDirection: 'row', alignItems: 'flex-start',
              marginBottom: 12,
            }}>
              <Text style={{ fontSize: 18, marginRight: 10, width: 26 }}>
                {item.icon}
              </Text>
              <View>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>
                  {item.label}
                </Text>
                <Text style={{ fontSize: 14, color: '#1f2937',
                  fontWeight: '500', marginTop: 1 }}>
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── À propos ── */}
        <View style={{
          backgroundColor: '#ffffff', borderRadius: 16,
          padding: 18, marginBottom: 16,
          borderWidth: 1, borderColor: '#e5e7eb',
        }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold',
            color: '#1f2937', marginBottom: 10 }}>
            À propos
          </Text>
          <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 22 }}>
            Dr. {doctor.prenom} {doctor.nom} est spécialiste en{' '}
            <Text style={{ fontWeight: 'bold' }}>{doctor.specialite}</Text> basé(e)
            à {doctor.ville}. Avec {doctor.nbAvis} patients satisfaits et
            une note de {doctor.notation.toFixed(1)}/5, il/elle offre
            des consultations de qualité.
          </Text>
        </View>

        {/* ── Bouton Prendre RDV ── */}
        {doctor.disponible && (
          <TouchableOpacity
            onPress={() => router.push(`/(patient)/booking/slots?doctorId=${doctor.id}&doctorNom=${doctor.nom}&doctorPrenom=${doctor.prenom}&specialite=${doctor.specialite}` as any)}
            style={{
              backgroundColor: '#1e3a8a', borderRadius: 16,
              padding: 18, alignItems: 'center',
              shadowColor: '#1e3a8a', shadowOpacity: 0.3,
              shadowRadius: 8, elevation: 4,
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 17,
              fontWeight: 'bold' }}>
              📅 Prendre un rendez-vous
            </Text>
            <Text style={{ color: '#bfdbfe', fontSize: 12, marginTop: 4 }}>
              Voir les créneaux disponibles
            </Text>
          </TouchableOpacity>
        )}
        
        {!doctor.disponible && (
          <View style={{
            backgroundColor: '#fee2e2', borderRadius: 16,
            padding: 18, alignItems: 'center',
          }}>
            <Text style={{ color: '#dc2626', fontSize: 15,
              fontWeight: 'bold' }}>
              ✗ Ce médecin n'est pas disponible
            </Text>
          </View>
        )}

      </View>
    </ScrollView>
  );
}