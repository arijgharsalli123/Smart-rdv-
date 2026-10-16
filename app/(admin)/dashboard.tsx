// app/(admin)/dashboard.tsx
import React from 'react';
import {
  View, Text, StyleSheet,
  ScrollView, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppColors } from '@/constants/Colors';
import { useAuthStore } from '@/store/authStore';

export default function AdminDashboard() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>⚙️ Dashboard Admin</Text>
          <Text style={styles.sub}>Supervision SmartRDV</Text>
        </View>

        {/* STATS CARDS */}
        <View style={styles.grid}>
          <View style={[styles.statCard, { borderTopColor: '#2196F3' }]}>
            <Text style={styles.statNum}>6</Text>
            <Text style={styles.statLabel}>Médecins</Text>
          </View>
          <View style={[styles.statCard, { borderTopColor: '#34C759' }]}>
            <Text style={styles.statNum}>124</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
          <View style={[styles.statCard, { borderTopColor: '#FF9500' }]}>
            <Text style={styles.statNum}>38</Text>
            <Text style={styles.statLabel}>RDV aujourd'hui</Text>
          </View>
          <View style={[styles.statCard, { borderTopColor: '#FF3B30' }]}>
            <Text style={styles.statNum}>5</Text>
            <Text style={styles.statLabel}>Cas critiques</Text>
          </View>
        </View>

        {/* MENU RAPIDE */}
        <Text style={styles.sectionTitle}>🔧 Gestion</Text>

        {[
          { icon: '👥', label: 'Gestion Utilisateurs', color: '#E3F2FD' },
          { icon: '📊', label: 'Statistiques IA',      color: '#E8F5E9' },
          { icon: '🏥', label: 'Gestion Médecins',     color: '#FFF3E0' },
          { icon: '📋', label: 'Tous les RDV',         color: '#FCE4EC' },
        ].map(item => (
          <TouchableOpacity
            key={item.label}
            style={[styles.menuItem, { backgroundColor: item.color }]}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        ))}

        {/* BOUTON DÉCONNEXION */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>🚪 Se déconnecter</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: AppColors.secondary },
  content:      { padding: 20, paddingBottom: 40 },
  header:       { marginBottom: 24 },
  title:        { fontSize: 24, fontWeight: '800', color: AppColors.dark },
  sub:          { fontSize: 14, color: AppColors.gray, marginTop: 4 },
  grid:         { flexDirection: 'row', flexWrap: 'wrap',
                  gap: 12, marginBottom: 28 },
  statCard:     { width: '47%', backgroundColor: AppColors.white,
                  borderRadius: 14, padding: 16,
                  borderTopWidth: 4, elevation: 2,
                  alignItems: 'center' },
  statNum:      { fontSize: 28, fontWeight: '800', color: AppColors.dark },
  statLabel:    { fontSize: 12, color: AppColors.gray,
                  marginTop: 4, textAlign: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: '700',
                  color: AppColors.dark, marginBottom: 12 },
  menuItem:     { flexDirection: 'row', alignItems: 'center',
                  padding: 16, borderRadius: 14,
                  marginBottom: 10 },
  menuIcon:     { fontSize: 24, marginRight: 14 },
  menuLabel:    { flex: 1, fontSize: 15,
                  fontWeight: '600', color: AppColors.dark },
  menuArrow:    { fontSize: 18, color: AppColors.gray },
  logoutBtn:    { marginTop: 20, padding: 16,
                  backgroundColor: '#FFE5E5',
                  borderRadius: 14, alignItems: 'center',
                  borderWidth: 1, borderColor: '#FF3B30' },
  logoutText:   { color: '#FF3B30', fontSize: 16, fontWeight: '700' },
});