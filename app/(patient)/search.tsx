// app/(patient)/search.tsx
import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView,
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { fakeDoctorService } from '@/services/fakeData';
import { Doctor } from '@/types/Doctor';
import DoctorCard from '@/components/DoctorCard';

const SPECIALITES = [
  'Tous', 'Cardiologue', 'Généraliste', 'Pédiatre',
  'Dermatologue', 'Ophtalmologue',
];

const VILLES = ['Toutes', 'Tunis', 'Sfax', 'Sousse', 'Monastir'];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState('Tous');
  const [selectedVille, setSelectedVille] = useState('Toutes');

  // ── Charger les médecins ─────────────────────────────────
  const loadDoctors = async () => {
    setLoading(true);
    try {
      const results = await fakeDoctorService.searchDoctors({
        specialite: selectedSpec === 'Tous' ? undefined : selectedSpec,
        ville: selectedVille === 'Toutes' ? undefined : selectedVille,
      });
      // Filtre par nom/prénom si texte saisi
      const filtered = query
        ? results.filter(d =>
            `${d.nom} ${d.prenom} ${d.specialite}`
              .toLowerCase()
              .includes(query.toLowerCase()))
        : results;
      setDoctors(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [selectedSpec, selectedVille]);

  // Filtre en temps réel par nom
  useEffect(() => {
    const timer = setTimeout(() => loadDoctors(), 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>

      {/* ── Header ── */}
      <View style={{
        backgroundColor: '#1e3a8a', paddingTop: 56,
        paddingBottom: 20, paddingHorizontal: 20,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 12 }}
          >
            <Text style={{ color: '#fff', fontSize: 22 }}>←</Text>
          </TouchableOpacity>
          <Text style={{
            color: '#ffffff', fontSize: 20, fontWeight: 'bold', flex: 1
          }}>
            Rechercher un médecin
          </Text>
        </View>

        {/* Barre de recherche */}
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          backgroundColor: '#ffffff', borderRadius: 12,
          paddingHorizontal: 14, marginTop: 14, height: 48,
        }}>
          <Text style={{ fontSize: 18, marginRight: 8 }}>🔍</Text>
          <TextInput
            style={{ flex: 1, fontSize: 15, color: '#1f2937' }}
            placeholder="Nom, spécialité..."
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={{ fontSize: 18, color: '#9ca3af' }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Filtre Spécialité ── */}
        <View style={{ paddingTop: 16, paddingLeft: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '600',
            color: '#374151', marginBottom: 8, paddingLeft: 2 }}>
            Spécialité
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SPECIALITES.map((spec) => (
              <TouchableOpacity
                key={spec}
                onPress={() => setSelectedSpec(spec)}
                style={{
                  backgroundColor: selectedSpec === spec ? '#1e3a8a' : '#ffffff',
                  borderRadius: 20, paddingHorizontal: 16,
                  paddingVertical: 8, marginRight: 8,
                  borderWidth: 1.5,
                  borderColor: selectedSpec === spec ? '#1e3a8a' : '#e5e7eb',
                }}
              >
                <Text style={{
                  color: selectedSpec === spec ? '#ffffff' : '#374151',
                  fontSize: 13, fontWeight: '600',
                }}>
                  {spec}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Filtre Ville ── */}
        <View style={{ paddingTop: 12, paddingLeft: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '600',
            color: '#374151', marginBottom: 8, paddingLeft: 2 }}>
            Ville
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {VILLES.map((ville) => (
              <TouchableOpacity
                key={ville}
                onPress={() => setSelectedVille(ville)}
                style={{
                  backgroundColor: selectedVille === ville ? '#3b82f6' : '#ffffff',
                  borderRadius: 20, paddingHorizontal: 16,
                  paddingVertical: 8, marginRight: 8,
                  borderWidth: 1.5,
                  borderColor: selectedVille === ville ? '#3b82f6' : '#e5e7eb',
                }}
              >
                <Text style={{
                  color: selectedVille === ville ? '#ffffff' : '#374151',
                  fontSize: 13, fontWeight: '600',
                }}>
                  {ville}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Résultats ── */}
        <View style={{ padding: 16, paddingTop: 16 }}>
          <Text style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
            {loading ? 'Recherche...' : `${doctors.length} médecin(s) trouvé(s)`}
          </Text>

          {loading ? (
            <ActivityIndicator color="#1e3a8a" size="large"
              style={{ marginTop: 40 }} />
          ) : doctors.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Text style={{ fontSize: 48 }}>🔍</Text>
              <Text style={{ fontSize: 16, color: '#6b7280',
                marginTop: 12, textAlign: 'center' }}>
                Aucun médecin trouvé{'\n'}Essayez d'autres filtres
              </Text>
            </View>
          ) : (
            doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}