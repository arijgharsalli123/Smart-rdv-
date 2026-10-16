// app/(patient)/home.tsx
import { View, Text, ScrollView, TouchableOpacity ,Button} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
//import { envoyerQuestionnaire, QuestionnaireData } from '@/services/iaService';


export default function HomeScreen() {
  const router = useRouter();
  const { prenom, nom, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };


  // Fonction de test IA
 /* const testerIA = async () => {
    console.log("⏳ Calcul de priorité en cours...");
    const resultat = await envoyerQuestionnaire({
      fever: true,
      pain_level: 8,
      duration_days: 1,
      difficulty_breathing: true,
      antecedents_chroniques: false,
      age: 70,
      specialite_cible: 'cardiologie',
    });
    console.log('✅ RÉSULTAT IA :', resultat);
    alert(`Score IA : ${resultat.label} (Confiance: ${resultat.confiance}%)`);
  };*/

  const shortcuts = [
    { icon: '🔍', label: 'Rechercher\nun médecin', route: '/(patient)/search', color: '#eff6ff', border: '#3b82f6' },
    { icon: '📅', label: 'Mes\nRendez-vous', route: '/(patient)/appointments', color: '#f0fdf4', border: '#16a34a' },
    { icon: '👤', label: 'Mon\nProfil', route: '/(patient)/profile', color: '#faf5ff', border: '#9333ea' },
    { icon: '🏥', label: 'Urgence\nIA', route: '/(patient)/search', color: '#fff7ed', border: '#ea580c' },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#f3f4f6' }}
      showsVerticalScrollIndicator={false}
      >
      {/* ── Header ── */}
      <View style={{
        backgroundColor: '#1e3a8a',
        paddingTop: 60, paddingBottom: 30,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View>
            <Text style={{ color: '#93c5fd', fontSize: 13 }}>
              Bonjour 👋
            </Text>
            <Text style={{
              color: '#ffffff', fontSize: 22,
              fontWeight: 'bold', marginTop: 2
            }}>
              {prenom} {nom}
            </Text>
            <Text style={{ color: '#bfdbfe', fontSize: 12, marginTop: 4 }}>
              🏥 Espace Patient — SmartRDV
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 12, padding: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>🚪</Text>
          </TouchableOpacity>
        </View>

        {/* Carte recherche rapide */}
        <TouchableOpacity
          onPress={() => router.push('/(patient)/search' as any)}
          style={{
            backgroundColor: '#ffffff', borderRadius: 14,
            padding: 16, marginTop: 20,
            flexDirection: 'row', alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20, marginRight: 10 }}>🔍</Text>
          <Text style={{ color: '#9ca3af', fontSize: 15, flex: 1 }}>
            Rechercher un médecin...
          </Text>
          <View style={{
            backgroundColor: '#1e3a8a', borderRadius: 8,
            paddingHorizontal: 12, paddingVertical: 6,
          }}>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
              Chercher
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20 }}>

        {/* ── Raccourcis ── */}
        <Text style={{
          fontSize: 17, fontWeight: 'bold',
          color: '#1f2937', marginBottom: 14
        }}>
          Accès rapide
        </Text>
      {/*---Questionnaire test---*/}
      <View style={{ backgroundColor: 'red', width: 100, height: 100 }}>
        <TouchableOpacity onPress={() => router.push('/(patient)/booking/questionnaire')}>
          <Text>🧪 Tester Questionnaire</Text>
        </TouchableOpacity>
      </View>

        <View style={{
          flexDirection: 'row', flexWrap: 'wrap', gap: 12
        }}>
          {shortcuts.map((s, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(s.route as any)}
              style={{
                width: '47%',
                backgroundColor: s.color,
                borderRadius: 16, padding: 18,
                borderWidth: 1.5, borderColor: s.border,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 30, marginBottom: 8 }}>{s.icon}</Text>
              <Text style={{
                color: '#1f2937', fontWeight: '600',
                fontSize: 13, textAlign: 'center', lineHeight: 18
              }}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Spécialités populaires ── */}
        <Text style={{
          fontSize: 17, fontWeight: 'bold',
          color: '#1f2937', marginTop: 24, marginBottom: 14
        }}>
          Spécialités populaires
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { icon: '❤️', label: 'Cardiologie' },
            { icon: '🧠', label: 'Neurologie' },
            { icon: '👶', label: 'Pédiatrie' },
            { icon: '🦷', label: 'Dentiste' },
            { icon: '👁️', label: 'Ophtalmologie' },
            { icon: '🦴', label: 'Orthopédie' },
          ].map((spec, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push('/(patient)/search' as any)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 14, padding: 14,
                alignItems: 'center', marginRight: 12,
                minWidth: 90, borderWidth: 1,
                borderColor: '#e5e7eb',
                shadowColor: '#000', shadowOpacity: 0.05,
                shadowRadius: 4, elevation: 2,
              }}
            >
              <Text style={{ fontSize: 26, marginBottom: 6 }}>{spec.icon}</Text>
              <Text style={{ fontSize: 11, color: '#374151',
                fontWeight: '600', textAlign: 'center' }}>
                {spec.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Prochain RDV ── */}
        <Text style={{
          fontSize: 17, fontWeight: 'bold',
          color: '#1f2937', marginTop: 24, marginBottom: 14
        }}>
          Prochain rendez-vous
        </Text>

        <View style={{
          backgroundColor: '#1e3a8a', borderRadius: 16,
          padding: 20, marginBottom: 10,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 36, marginRight: 14 }}>📅</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#bfdbfe', fontSize: 12 }}>
                Aucun rendez-vous prévu
              </Text>
              <Text style={{ color: '#ffffff', fontWeight: 'bold',
                fontSize: 15, marginTop: 2 }}>
                Prenez votre premier RDV !
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(patient)/search' as any)}
            style={{
              backgroundColor: '#ffffff', borderRadius: 10,
              padding: 12, alignItems: 'center', marginTop: 16,
            }}
          >
            <Text style={{ color: '#1e3a8a', fontWeight: 'bold' }}>
              🔍 Trouver un médecin
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}