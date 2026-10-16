// app/(auth)/login.tsx
import { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { fakeAuthService } from '@/services/fakeData';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };
    if (!email) { newErrors.email = 'L\'email est obligatoire'; valid = false; }
    else if (!email.includes('@')) { newErrors.email = 'Email invalide'; valid = false; }
    if (!password) { newErrors.password = 'Le mot de passe est obligatoire'; valid = false; }
    else if (password.length < 6) { newErrors.password = 'Minimum 6 caractères'; valid = false; }
    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fakeAuthService.login(email, password);
      await login(res.token, res.role, res.id, res.nom, res.prenom);

      // ✅ Redirection selon le rôle
      if (res.role === 'PATIENT')  router.replace('/(patient)/home');
      if (res.role === 'MEDECIN')  router.replace('/(medecin)/dashboard' as any);
      if (res.role === 'ADMIN')    router.replace('/(admin)/dashboard' as any);

    } catch (err: any) {
      Alert.alert('Erreur de connexion', err.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remplace par ces 3 fonctions :
  const fillPatient = () => { setEmail('patient@test.com');  setPassword('test123'); };
  const fillMedecin = () => { setEmail('medecin@test.com');  setPassword('test123'); };
  const fillAdmin   = () => { setEmail('admin@test.com');    setPassword('test123'); };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header bleu ── */}
        <View style={{
          backgroundColor: '#1e3a8a', paddingTop: 80,
          paddingBottom: 50, alignItems: 'center',
          borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
        }}>
          <View style={{
            width: 80, height: 80, borderRadius: 20,
            backgroundColor: '#ffffff', justifyContent: 'center',
            alignItems: 'center', marginBottom: 16,
          }}>
            <Text style={{ fontSize: 36 }}>🏥</Text>
          </View>
          <Text style={{
            color: '#ffffff', fontSize: 28,
            fontWeight: 'bold', letterSpacing: 1
          }}>
            SMART RDV
          </Text>
          <Text style={{ color: '#93c5fd', fontSize: 14, marginTop: 4 }}>
            Rendez-vous Médical Intelligent
          </Text>
        </View>

        {/* ── Formulaire ── */}
        <View style={{ paddingHorizontal: 28, paddingTop: 28 }}>
          <Text style={{
            fontSize: 24, fontWeight: 'bold',
            color: '#1e3a8a', marginBottom: 6
          }}>
            Bienvenue ! 👋
          </Text>
          <Text style={{ color: '#6b7280', marginBottom: 28, fontSize: 14 }}>
            Connectez-vous pour accéder à votre espace
          </Text>

          <Input
            label="Email"
            icon="📧"
            placeholder="email@exemple.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
           autoCapitalize="none"
            error={errors.email}
          /> 

          <Input
            label="Mot de passe"
            icon="🔒"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />

          <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 24 }}>
            <Text style={{ color: '#3b82f6', fontSize: 13 }}>
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>

          <Button title="SE CONNECTER" onPress={handleLogin} loading={loading} />
          <View style={{ marginTop: 14, gap: 8 }}>
            <Text style={{ color: '#6b7280', fontSize: 12,
              textAlign: 'center', marginBottom: 4 }}>
              🧪 Comptes de test :
            </Text>

            <TouchableOpacity
              onPress={fillPatient}
              style={{
                padding: 12, backgroundColor: '#f0fdf4',
                borderRadius: 10, borderWidth: 1, borderColor: '#86efac'
              }}>
              <Text style={{ color: '#166534', textAlign: 'center', fontSize: 13 }}>
                🟢 Patient — patient@test.com
              </Text>
            </TouchableOpacity>

          <TouchableOpacity
            onPress={fillMedecin}
            style={{
              padding: 12, backgroundColor: '#eff6ff',
              borderRadius: 10, borderWidth: 1, borderColor: '#93c5fd'
            }}
          >
            <Text style={{ color: '#1e40af', textAlign: 'center', fontSize: 13 }}>
              🔵 Médecin — medecin@test.com
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={fillAdmin}
            style={{
              padding: 12, backgroundColor: '#faf5ff',
              borderRadius: 10, borderWidth: 1, borderColor: '#d8b4fe'
            }}
          >
            <Text style={{ color: '#6b21a8', textAlign: 'center', fontSize: 13 }}>
              🟣 Admin — admin@test.com
            </Text>
          </TouchableOpacity>
        </View>

          {/* ── Bouton S'inscrire ── */}
          <View style={{
            flexDirection: 'row', justifyContent: 'center',
            marginTop: 24, marginBottom: 20,
            alignItems: 'center'
          }}>
            <Text style={{ color: '#6b7280', fontSize: 15 }}>
              Pas encore de compte ?{'  '}
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/register')}
              style={{
                backgroundColor: '#1e3a8a',
                paddingHorizontal: 18, paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
                S'inscrire
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}