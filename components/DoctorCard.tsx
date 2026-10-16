// components/DoctorCard.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Doctor } from '@/types/Doctor';

interface Props {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: Props) {
  const router = useRouter();

  const stars = '⭐'.repeat(Math.round(doctor.notation));

  return (
    <TouchableOpacity
      onPress={() => router.push(`/(patient)/doctor/${doctor.id}` as any)}
      style={{
        backgroundColor: '#ffffff', borderRadius: 16,
        padding: 16, marginBottom: 12,
        borderWidth: 1, borderColor: '#e5e7eb',
        shadowColor: '#000', shadowOpacity: 0.06,
        shadowRadius: 6, elevation: 3,
        flexDirection: 'row', alignItems: 'center',
      }}
    >
      {/* Avatar */}
      <View style={{
        width: 58, height: 58, borderRadius: 29,
        backgroundColor: '#dbeafe',
        justifyContent: 'center', alignItems: 'center',
        marginRight: 14,
      }}>
        <Text style={{ fontSize: 26 }}>👨‍⚕️</Text>
      </View>

      {/* Infos */}
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 15, fontWeight: 'bold', color: '#1f2937'
        }}>
          Dr. {doctor.prenom} {doctor.nom}
        </Text>
        <Text style={{ fontSize: 13, color: '#3b82f6',
          fontWeight: '600', marginTop: 2 }}>
          {doctor.specialite}
        </Text>
        <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 3 }}>
          📍 {doctor.ville}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Text style={{ fontSize: 11 }}>{stars}</Text>
          <Text style={{ fontSize: 11, color: '#6b7280', marginLeft: 4 }}>
            ({doctor.notation.toFixed(1)}) · {doctor.nbAvis} avis
          </Text>
        </View>
      </View>

      {/* Badge disponibilité */}
      <View style={{
        backgroundColor: doctor.disponible ? '#dcfce7' : '#fee2e2',
        borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6,
      }}>
        <Text style={{
          fontSize: 11, fontWeight: 'bold',
          color: doctor.disponible ? '#16a34a' : '#dc2626',
        }}>
          {doctor.disponible ? '✓ Dispo' : '✗ Indispo'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}