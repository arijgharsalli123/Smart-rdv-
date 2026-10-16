// app/(patient)/booking/summary.tsx

import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppColors, PriorityColors } from '../../../constants/Colors';
import { IAResult, PriorityLabel } from '../../../types/Priority';
import PriorityBadge from '../../../components/PriorityBadge';
import { QuestionnaireData } from '../../../services/iaService';

export default function SummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Récupérer les données envoyées par le questionnaire
  const [scoreIA, setScoreIA] = useState<IAResult | null>(null);
  const [answers, setAnswers] = useState<QuestionnaireData | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (params.scoreIA) {
      setScoreIA(JSON.parse(params.scoreIA as string));
    }
    if (params.answers) {
      setAnswers(JSON.parse(params.answers as string));
    }
  }, []); 

  // Confirmer le rendez-vous
  const confirmerRDV = () => {
    setConfirmed(true);
    // Plus tard : appel API backend pour sauvegarder le RDV
    setTimeout(() => {
      router.push('/(patient)/appointments');
    }, 2000);
  };

  // Couleurs selon la priorité
  const colors = scoreIA
    ? PriorityColors[scoreIA.label as PriorityLabel]
    : PriorityColors['MODÉRÉ'];

  if (!scoreIA) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Chargement du résultat...</Text>
      </SafeAreaView>
    );
  }

  // ── Écran de confirmation après clic ──────────
  if (confirmed) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.confirmedBox}>
          <Text style={styles.confirmedEmoji}>✅</Text>
          <Text style={styles.confirmedTitle}>Rendez-vous confirmé !</Text>
          <Text style={styles.confirmedSub}>
            Vous allez être redirigé vers vos rendez-vous...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* ── HEADER ───────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Résumé du rendez-vous</Text>
          <Text style={styles.headerSub}>
            Analyse IA complétée
          </Text>
        </View>

        {/* ── CARTE SCORE IA ────────────────────── */}
        <View style={[styles.scoreCard, {
          backgroundColor: colors.background,
          borderColor: colors.border,
        }]}>

          <Text style={styles.scoreEmoji}>{colors.emoji}</Text>

          <Text style={[styles.scoreLabel, { color: colors.text }]}>
            Niveau de priorité
          </Text>

          {/* Grand badge */}
          <PriorityBadge label={scoreIA.label as PriorityLabel} size="large" />

          {/* Score numérique */}
          <View style={styles.scoreRow}>
            <Text style={[styles.scoreNumber, { color: colors.text }]}>
              {scoreIA.score * 25}
            </Text>
            <Text style={[styles.scoreUnit, { color: colors.text }]}>
              /100
            </Text>
          </View>

          {/* Confiance IA */}
          <Text style={[styles.confiance, { color: colors.text }]}>
            Confiance IA : {scoreIA.confiance}%
          </Text>

          {/* Recommandation */}
          <View style={styles.recoBox}>
            <Text style={styles.recoText}>
              {scoreIA.recommendation}
            </Text>
          </View>

        </View>

        {/* ── RÉSUMÉ SYMPTÔMES ─────────────────── */}
        {answers && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Vos réponses</Text>

            <View style={styles.symptomRow}>
              <Text style={styles.symptomKey}>🌡️ Fièvre</Text>
              <Text style={[
                styles.symptomValue,
                answers.fever && { color: '#FF3B30' },
              ]}>
                {answers.fever ? 'Oui' : 'Non'}
              </Text>
            </View>

            <View style={styles.symptomRow}>
              <Text style={styles.symptomKey}>😣 Douleur</Text>
              <Text style={[
                styles.symptomValue,
                answers.pain_level >= 7 && { color: '#FF3B30' },
              ]}>
                {answers.pain_level}/10
              </Text>
            </View>

            <View style={styles.symptomRow}>
              <Text style={styles.symptomKey}>📅 Durée</Text>
              <Text style={styles.symptomValue}>
                {answers.duration_days === 1
                  ? "Aujourd'hui"
                  : `${answers.duration_days} jours`}
              </Text>
            </View>

            <View style={styles.symptomRow}>
              <Text style={styles.symptomKey}>🫁 Respiration</Text>
              <Text style={[
                styles.symptomValue,
                answers.difficulty_breathing && { color: '#FF3B30' },
              ]}>
                {answers.difficulty_breathing ? '⚠️ Difficile' : 'Normale'}
              </Text>
            </View>

            <View style={styles.symptomRow}>
              <Text style={styles.symptomKey}>📋 Antécédents</Text>
              <Text style={styles.symptomValue}>
                {answers.antecedents_chroniques ? 'Oui' : 'Non'}
              </Text>
            </View>

            <View style={styles.symptomRow}>
              <Text style={styles.symptomKey}>👤 Âge</Text>
              <Text style={styles.symptomValue}>
                {answers.age} ans
              </Text>
            </View>

            <View style={styles.symptomRow}>
              <Text style={styles.symptomKey}>🧠 Neurologique</Text>
              <Text style={[
                styles.symptomValue,
                answers.symptomes_neurologiques && { color: '#FF3B30' },
              ]}>
                {answers.symptomes_neurologiques ? '⚠️ Oui' : 'Non'}
              </Text>
            </View>

          </View>
        )}

        {/* ── BOUTONS ──────────────────────────── */}
        <TouchableOpacity
          style={[styles.confirmBtn, { backgroundColor: colors.badge }]}
          onPress={confirmerRDV}
        >
          <Text style={styles.confirmBtnText}>
            ✅ Confirmer le rendez-vous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelBtnText}>
            ← Modifier mes réponses
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: AppColors.white },
  loadingText:     { textAlign: 'center', marginTop: 100,
                     fontSize: 16, color: AppColors.gray },

  content:         { padding: 20, paddingBottom: 40 },

  header:          { alignItems: 'center', marginBottom: 24 },
  headerTitle:     { fontSize: 22, fontWeight: '800', color: AppColors.dark },
  headerSub:       { fontSize: 14, color: AppColors.gray, marginTop: 4 },

  scoreCard:       { borderRadius: 20, borderWidth: 2, padding: 24,
                     alignItems: 'center', marginBottom: 24 },
  scoreEmoji:      { fontSize: 56, marginBottom: 8 },
  scoreLabel:      { fontSize: 14, fontWeight: '600',
                     marginBottom: 12, textTransform: 'uppercase',
                     letterSpacing: 1 },
  scoreRow:        { flexDirection: 'row', alignItems: 'flex-end',
                     marginTop: 12 },
  scoreNumber:     { fontSize: 52, fontWeight: '800' },
  scoreUnit:       { fontSize: 20, fontWeight: '600',
                     marginBottom: 8, marginLeft: 4 },
  confiance:       { fontSize: 13, marginTop: 8, opacity: 0.8 },
  recoBox:         { marginTop: 16, backgroundColor: 'rgba(0,0,0,0.06)',
                     borderRadius: 10, padding: 12, width: '100%' },
  recoText:        { fontSize: 15, textAlign: 'center', fontWeight: '600',
                     color: AppColors.dark },

  section:         { backgroundColor: AppColors.secondary, borderRadius: 16,
                     padding: 16, marginBottom: 20 },
  sectionTitle:    { fontSize: 16, fontWeight: '700', color: AppColors.dark,
                     marginBottom: 12 },
  symptomRow:      { flexDirection: 'row', justifyContent: 'space-between',
                     paddingVertical: 8,
                     borderBottomWidth: 1, borderBottomColor: AppColors.border },
  symptomKey:      { fontSize: 14, color: AppColors.gray },
  symptomValue:    { fontSize: 14, fontWeight: '600', color: AppColors.dark },

  confirmBtn:      { padding: 16, borderRadius: 14,
                     alignItems: 'center', marginBottom: 12 },
  confirmBtnText:  { color: AppColors.white, fontSize: 17, fontWeight: '700' },

  cancelBtn:       { padding: 14, borderRadius: 14,
                     alignItems: 'center', borderWidth: 1,
                     borderColor: AppColors.border },
  cancelBtnText:   { color: AppColors.gray, fontSize: 15, fontWeight: '600' },

  confirmedBox:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
  confirmedEmoji:  { fontSize: 80, marginBottom: 20 },
  confirmedTitle:  { fontSize: 24, fontWeight: '800', color: AppColors.dark },
  confirmedSub:    { fontSize: 15, color: AppColors.gray,
                     marginTop: 8, textAlign: 'center' },
});