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

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Mise à jour d'un champ ─────────────────────────────────
  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // ── Fonction pour le Test Rapide 🧪 ────────────────────────
  const fillTest = () => {
    setForm({
      nom: 'Gharsalli',
      prenom: 'Arij',
      email: 'arij@test.com',
      telephone: '55123456',
      password: 'test123',
      confirmPassword: 'test123',
    });
  };

  // ── Validation ─────────────────────────────────────────────
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.prenom.trim()) newErrors.prenom = 'Le prénom est obligatoire';
    if (!form.nom.trim()) newErrors.nom = 'Le nom est obligatoire';
    if (!form.email.trim()) newErrors.email = 'L\'email est obligatoire';
    else if (!form.email.includes('@')) newErrors.email = 'Email invalide';

    if (form.telephone && !/^\+?[0-9]{8,}$/.test(form.telephone))
      newErrors.telephone = 'Numéro invalide (min 8 chiffres)';

    if (!form.password) newErrors.password = 'Le mot de passe est obligatoire';
    else if (form.password.length < 6) newErrors.password = 'Minimum 6 caractères';

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Inscription ────────────────────────────────────────────
  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fakeAuthService.register({
        nom: form.nom.trim(),
        prenom: form.prenom.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        telephone: form.telephone || undefined,
      });

      await login(res.token, res.role, res.userId, res.nom, res.prenom);

      Alert.alert(
        '🎉 Compte créé !',
        `Bienvenue ${res.prenom} ${res.nom} !`,
        [{ text: 'Continuer', onPress: () => router.replace('/(patient)/home') }]
      );
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header Bleu ── */}
        <View style={{
          backgroundColor: '#1e3a8a', paddingTop: 60, paddingBottom: 36,
          alignItems: 'center', borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
        }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              position: 'absolute', top: 56, left: 20,
              backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: 8,
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 32, marginBottom: 8 }}>👤</Text>
          <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>
            Créer un compte
          </Text>
          <Text style={{ color: '#93c5fd', fontSize: 13, marginTop: 4 }}>
            Inscription Patient — SmartRDV
          </Text>
        </View>

        {/* ── Formulaire ── */}
        <View style={{ padding: 28 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Input
                label="Prénom *" icon="👤" placeholder="Arij"
                value={form.prenom} onChangeText={(v) => updateField('prenom', v)}
                error={errors.prenom}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                label="Nom *" icon="👤" placeholder="Gharsalli"
                value={form.nom} onChangeText={(v) => updateField('nom', v)}
                error={errors.nom}
              />
            </View>
          </View>

          <Input
            label="Email *" icon="📧" placeholder="email@exemple.com"
            value={form.email} onChangeText={(v) => updateField('email', v)}
            keyboardType="email-address" autoCapitalize="none" error={errors.email}
          />

          <Input
            label="Téléphone" icon="📱" placeholder="+216 XX XXX XXX"
            value={form.telephone} onChangeText={(v) => updateField('telephone', v)}
            keyboardType="phone-pad" error={errors.telephone}
          />

          <Input
            label="Mot de passe *" icon="🔒" placeholder="••••••••"
            value={form.password} onChangeText={(v) => updateField('password', v)}
            secureTextEntry error={errors.password}
          />

          <Input
            label="Confirmer *" icon="🔒" placeholder="••••••••"
            value={form.confirmPassword} onChangeText={(v) => updateField('confirmPassword', v)}
            secureTextEntry error={errors.confirmPassword}
          />

          <Button title="CRÉER MON COMPTE" onPress={handleRegister} loading={loading} />

          {/* 🧪 Bouton Test Rapide */}
          <TouchableOpacity
            onPress={fillTest}
            style={{
              marginTop: 14, padding: 12,
              backgroundColor: '#f0f9ff', borderRadius: 10,
              borderWidth: 1, borderColor: '#bae6fd'
            }}
          >
            <Text style={{ color: '#0369a1', textAlign: 'center', fontSize: 13 }}>
              🧪 Remplir avec les données de test
            </Text>
          </TouchableOpacity>

          {/* ── Redirection vers Login (Style Bleu) ── */}
          <View style={{
            flexDirection: 'row', justifyContent: 'center',
            marginTop: 24, marginBottom: 20, alignItems: 'center'
          }}>
            <Text style={{ color: '#6b7280', fontSize: 15 }}>
              Déjà un compte ?{'  '}
            </Text>
            <TouchableOpacity
              onPress={() => router.replace('/(auth)/login')}
              style={{
                backgroundColor: '#1e3a8a',
                paddingHorizontal: 18, paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
