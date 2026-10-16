// app/(patient)/profile.tsx
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { nom, prenom, role, logout } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion', style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          }
        }
      ]
    );
  };

  const menuItems = [
    { icon: '📅', label: 'Mes Rendez-vous', route: '/(patient)/appointments' },
    { icon: '🔍', label: 'Rechercher un médecin', route: '/(patient)/search' },
    { icon: '🔔', label: 'Notifications', route: null },
    { icon: '🔒', label: 'Sécurité & Mot de passe', route: null },
    { icon: '❓', label: 'Aide & Support', route: null },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#f3f4f6' }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ── */}
      <View style={{
        backgroundColor: '#1e3a8a', paddingTop: 56,
        paddingBottom: 40, alignItems: 'center',
        paddingHorizontal: 20,
      }}>
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
          width: 88, height: 88, borderRadius: 44,
          backgroundColor: '#dbeafe', justifyContent: 'center',
          alignItems: 'center', marginBottom: 14,
          borderWidth: 3, borderColor: '#ffffff',
        }}>
          <Text style={{ fontSize: 40 }}>👤</Text>
        </View>

        <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>
          {prenom} {nom}
        </Text>
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: 20, paddingHorizontal: 14,
          paddingVertical: 5, marginTop: 8,
        }}>
          <Text style={{ color: '#bfdbfe', fontSize: 13, fontWeight: '600' }}>
            🏥 {role}
          </Text>
        </View>
      </View>

      <View style={{ padding: 20 }}>

        {/* Carte Infos */}
        <View style={{
          backgroundColor: '#fff', borderRadius: 16,
          padding: 18, marginBottom: 16,
          borderWidth: 1, borderColor: '#e5e7eb',
        }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold',
            color: '#1f2937', marginBottom: 14 }}>
            Mon compte
          </Text>
          {[
            { icon: '👤', label: 'Nom complet', value: `${prenom} ${nom}` },
            { icon: '🏥', label: 'Rôle', value: role || 'PATIENT' },
            { icon: '📱', label: 'Application', value: 'SmartRDV v1.0 — Sprint 1' },
          ].map((item, i) => (
            <View key={i} style={{
              flexDirection: 'row', alignItems: 'center',
              marginBottom: 12, paddingBottom: 12,
              borderBottomWidth: i < 2 ? 1 : 0,
              borderBottomColor: '#f3f4f6',
            }}>
              <Text style={{ fontSize: 20, marginRight: 12, width: 28 }}>
                {item.icon}
              </Text>
              <View>
                <Text style={{ fontSize: 11, color: '#6b7280' }}>
                  {item.label}
                </Text>
                <Text style={{ fontSize: 14, color: '#1f2937',
                  fontWeight: '600', marginTop: 1 }}>
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={{
          backgroundColor: '#fff', borderRadius: 16,
          padding: 6, marginBottom: 16,
          borderWidth: 1, borderColor: '#e5e7eb',
        }}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => item.route
                ? router.push(item.route as any)
                : Alert.alert('Bientôt disponible', 'Cette fonctionnalité arrive dans un prochain sprint !')}
              style={{
                flexDirection: 'row', alignItems: 'center',
                padding: 14, borderRadius: 12,
                borderBottomWidth: i < menuItems.length - 1 ? 1 : 0,
                borderBottomColor: '#f3f4f6',
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 14, width: 28 }}>
                {item.icon}
              </Text>
              <Text style={{ flex: 1, fontSize: 14,
                color: '#1f2937', fontWeight: '500' }}>
                {item.label}
              </Text>
              <Text style={{ color: '#9ca3af', fontSize: 16 }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bouton déconnexion */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: '#fee2e2', borderRadius: 14,
            padding: 16, alignItems: 'center',
            borderWidth: 1, borderColor: '#fecaca',
          }}
        >
          <Text style={{ color: '#dc2626', fontWeight: 'bold', fontSize: 15 }}>
            🚪 Se déconnecter
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}