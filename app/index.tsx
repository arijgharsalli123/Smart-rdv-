// app/index.tsx
import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1e3a8a'
    }}>
      <Text style={{
        color: 'white',
        fontSize: 38,
        fontWeight: 'bold',
        letterSpacing: 2
      }}>
        SMART RDV
      </Text>
      <Text style={{
        color: '#93c5fd',
        fontSize: 15,
        marginTop: 8,
        marginBottom: 40
      }}>
        Plateforme Intelligente de Rendez-vous
      </Text>
      <ActivityIndicator color="#ffffff" size="large" />
    </View>
  );
}