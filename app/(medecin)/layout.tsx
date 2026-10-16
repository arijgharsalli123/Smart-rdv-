// app/(medecin)/_layout.tsx
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { AppColors } from '@/constants/Colors';

export default function MedecinLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: AppColors.primary,
      tabBarInactiveTintColor: AppColors.gray,
      tabBarStyle: {
        backgroundColor: AppColors.white,
        borderTopColor: AppColors.border,
        paddingBottom: 8,
        height: 60,
      },
    }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22 }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Mes RDV',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22 }}>📋</Text>
          ),
        }}
      />
    </Tabs>
  );
}