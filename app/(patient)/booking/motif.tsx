// app/(patient)/booking/motif.tsx
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const MOTIFS_RAPIDES = [
  '🤒 Fièvre et douleurs', '❤️ Consultation cardiaque',
  '🦷 Douleur dentaire', '👁️ Problème vision',
  '🦴 Douleur articulaire', '💊 Renouvellement ordonnance',
  '🧪 Résultats d\'analyses', '🔄 Suivi régulier',
];

export default function MotifScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [motif, setMotif] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!motif.trim()) {
      setError('Veuillez indiquer le motif de consultation');
      return;
    }
    if (motif.trim().length < 5) {
      setError('Motif trop court (minimum 5 caractères)');
      return;
    }
    router.push(`/(patient)/booking/summary?${new URLSearchParams({
      ...params as any,
      motif: motif.trim(),
    }).toString()}` as any);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f3f4f6' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
          📝 Motif de consultation
        </Text>
        <Text style={{ color: '#93c5fd', fontSize: 13, marginTop: 4 }}>
          Dr. {params.doctorPrenom} {params.doctorNom}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        {/* Info RDV */}
        <View style={{
          backgroundColor: '#dbeafe', borderRadius: 12,
          padding: 14, marginBottom: 20, flexDirection: 'row',
        }}>
          <Text style={{ fontSize: 24, marginRight: 10 }}>📅</Text>
          <View>
            <Text style={{ color: '#1e3a8a', fontWeight: 'bold', fontSize: 14 }}>
              {params.date} à {params.heure}
            </Text>
            <Text style={{ color: '#3b82f6', fontSize: 12, marginTop: 2 }}>
              {params.specialite}
            </Text>
          </View>
        </View>

        {/* Motifs rapides */}
        <Text style={{ fontSize: 15, fontWeight: 'bold',
          color: '#1f2937', marginBottom: 12 }}>
          Choisir un motif rapide :
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {MOTIFS_RAPIDES.map((m, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => { setMotif(m); setError(''); }}
              style={{
                backgroundColor: motif === m ? '#1e3a8a' : '#ffffff',
                borderRadius: 20, paddingHorizontal: 14,
                paddingVertical: 8, borderWidth: 1.5,
                borderColor: motif === m ? '#1e3a8a' : '#e5e7eb',
              }}
            >
              <Text style={{
                color: motif === m ? '#fff' : '#374151',
                fontSize: 12, fontWeight: '500',
              }}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Zone texte libre */}
        <Text style={{ fontSize: 15, fontWeight: 'bold',
          color: '#1f2937', marginBottom: 10 }}>
          Ou décrivez votre motif :
        </Text>

        <View style={{
          backgroundColor: '#fff', borderRadius: 14,
          borderWidth: 1.5,
          borderColor: error ? '#dc2626' : '#d1d5db',
          padding: 14, marginBottom: 8,
        }}>
          <TextInput
            style={{ fontSize: 14, color: '#1f2937',
              minHeight: 100, textAlignVertical: 'top' }}
            placeholder="Ex: Douleur thoracique depuis 3 jours..."
            placeholderTextColor="#9ca3af"
            value={motif}
            onChangeText={(v) => { setMotif(v); setError(''); }}
            multiline
            maxLength={300}
          />
        </View>

        {error ? (
          <Text style={{ color: '#dc2626', fontSize: 12, marginBottom: 8 }}>
            ⚠️ {error}
          </Text>
        ) : null}

        <Text style={{ color: '#9ca3af', fontSize: 11,
          textAlign: 'right', marginBottom: 24 }}>
          {motif.length}/300 caractères
        </Text>

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}