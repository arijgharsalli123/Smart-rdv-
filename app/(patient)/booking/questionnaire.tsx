// app/(patient)/booking/questionnaire.tsx

import React, { useState } from 'react';
import {
  View, Text,
   StyleSheet, 
   ScrollView,
   TouchableOpacity,
   ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppColors } from '@/constants/Colors';
import {envoyerQuestionnaire, QuestionnaireData } from '@/services/iaService';

// ─────────────────────────────────────────────
// TOTAL : 5 étapes dans ce formulaire
// ─────────────────────────────────────────────
const TOTAL_STEPS = 7;

export default function QuestionnaireScreen() {
  const router = useRouter();

  // Étape actuelle (commence à 1)
  const [step, setStep] = useState(1);

  // Toutes les réponses du patient
  const [answers, setAnswers] = useState<QuestionnaireData>({
    fever: false,
    pain_level: 0,
    duration_days: 1,
    difficulty_breathing: false,
    antecedents_chroniques: false,
    age: 30,
    symptomes_neurologiques: false,
    specialite_cible: 'generaliste',
  });
  // Ajoute cette ligne après useState answers :
  const [loading, setLoading] = useState(false);

  // ── Helpers ──────────────────────────────────
  const update = (key: keyof QuestionnaireData, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

    // ✅ Nouvelle fonction suivant avec appel IA :
    const suivant = async () => {
    if (step < TOTAL_STEPS) {
        setStep(step + 1);
    } else {
        // Dernière étape → on envoie à l'IA
        try {
        setLoading(true);
        const scoreIA = await envoyerQuestionnaire(answers);
        router.push({
            pathname: '/(patient)/booking/summary',
            params: {
            answers: JSON.stringify(answers),
            scoreIA: JSON.stringify(scoreIA),
            },
        });
        } catch (error) {
        console.error('Erreur IA:', error);
        } finally {
        setLoading(false);
        }
    }
    };

  const precedent = () => {
    if (step > 1) setStep(step - 1);
  };

  // ── Barre de progression ──────────────────────
  const progression = (step / TOTAL_STEPS) * 100;

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={precedent} disabled={step === 1}>
          <Text style={[styles.backBtn, step === 1 && styles.backBtnDisabled]}>
            ← Retour
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Questionnaire IA</Text>
        <Text style={styles.stepCount}>{step}/{TOTAL_STEPS}</Text>
      </View>

      {/* BARRE DE PROGRESSION */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progression}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* ══════════════════════════════════ */}
        {/* ÉTAPE 1 — Fièvre                  */}
        {/* ══════════════════════════════════ */}
        {step === 1 && (
          <View style={styles.questionBlock}>
            <Text style={styles.questionEmoji}>🌡️</Text>
            <Text style={styles.questionTitle}>
              Avez-vous de la fièvre ?
            </Text>
            <Text style={styles.questionSub}>
              Une température supérieure à 38°C
            </Text>

            <TouchableOpacity
              style={[styles.optionBtn, answers.fever === false && styles.optionSelected]}
              onPress={() => update('fever', false)}
            >
              <Text style={styles.optionText}>✅ Non, pas de fièvre</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionBtn, answers.fever === true && styles.optionSelected]}
              onPress={() => update('fever', true)}
            >
              <Text style={styles.optionText}>🌡️ Oui, j'ai de la fièvre</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ══════════════════════════════════ */}
        {/* ÉTAPE 2 — Niveau de douleur       */}
        {/* ══════════════════════════════════ */}
        {step === 2 && (
          <View style={styles.questionBlock}>
            <Text style={styles.questionEmoji}>😣</Text>
            <Text style={styles.questionTitle}>
              Niveau de douleur
            </Text>
            <Text style={styles.questionSub}>
              De 0 (aucune douleur) à 10 (douleur maximale)
            </Text>

            {/* Valeur actuelle */}
            <View style={styles.scoreDisplay}>
              <Text style={styles.scoreNumber}>{answers.pain_level}</Text>
              <Text style={styles.scoreLabel}>
                {answers.pain_level === 0 ? 'Aucune douleur'
                  : answers.pain_level <= 3 ? 'Douleur légère'
                  : answers.pain_level <= 6 ? 'Douleur modérée'
                  : answers.pain_level <= 8 ? 'Douleur forte'
                  : 'Douleur intense'}
              </Text>
            </View>

            {/* Boutons 0 à 10 */}
            <View style={styles.painGrid}>
              {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                <TouchableOpacity
                  key={n}
                  style={[
                    styles.painBtn,
                    answers.pain_level === n && styles.painBtnSelected,
                    n >= 8 && styles.painBtnDanger,
                    n >= 8 && answers.pain_level === n && styles.painBtnDangerSelected,
                  ]}
                  onPress={() => update('pain_level', n)}
                >
                  <Text style={[
                    styles.painBtnText,
                    answers.pain_level === n && styles.painBtnTextSelected,
                  ]}>
                    {n}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ══════════════════════════════════ */}
        {/* ÉTAPE 3 — Durée des symptômes     */}
        {/* ══════════════════════════════════ */}
        {step === 3 && (
          <View style={styles.questionBlock}>
            <Text style={styles.questionEmoji}>📅</Text>
            <Text style={styles.questionTitle}>
              Depuis quand avez-vous ces symptômes ?
            </Text>

            {[
              { label: "Aujourd'hui (moins de 24h)", value: 1 },
              { label: '2 à 3 jours',                value: 3 },
              { label: '4 à 7 jours (une semaine)',  value: 7 },
              { label: 'Plus d\'une semaine',         value: 14 },
            ].map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionBtn,
                  answers.duration_days === option.value && styles.optionSelected,
                ]}
                onPress={() => update('duration_days', option.value)}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ══════════════════════════════════ */}
        {/* ÉTAPE 4 — Difficultés respiratoires */}
        {/* ══════════════════════════════════ */}
        {step === 4 && (
          <View style={styles.questionBlock}>
            <Text style={styles.questionEmoji}>🫁</Text>
            <Text style={styles.questionTitle}>
              Avez-vous des difficultés à respirer ?
            </Text>
            <Text style={styles.questionSub}>
              Essoufflement, oppression dans la poitrine
            </Text>

            <TouchableOpacity
              style={[styles.optionBtn, answers.difficulty_breathing === false && styles.optionSelected]}
              onPress={() => update('difficulty_breathing', false)}
            >
              <Text style={styles.optionText}>✅ Non, je respire normalement</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionBtn, answers.difficulty_breathing === true && styles.optionSelected]}
              onPress={() => update('difficulty_breathing', true)}
            >
              <Text style={styles.optionText}>😮‍💨 Oui, j'ai du mal à respirer</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ══════════════════════════════════ */}
        {/* ÉTAPE 5 — Antécédents             */}
        {/* ══════════════════════════════════ */}
        {step === 5 && (
          <View style={styles.questionBlock}>
            <Text style={styles.questionEmoji}>📋</Text>
            <Text style={styles.questionTitle}>
              Avez-vous des maladies chroniques ?
            </Text>
            <Text style={styles.questionSub}>
              Diabète, hypertension, maladies cardiaques...
            </Text>

            <TouchableOpacity
              style={[styles.optionBtn, answers.antecedents_chroniques === false && styles.optionSelected]}
              onPress={() => update('antecedents_chroniques', false)}
            >
              <Text style={styles.optionText}>✅ Non, aucun antécédent</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionBtn, answers.antecedents_chroniques === true && styles.optionSelected]}
              onPress={() => update('antecedents_chroniques', true)}
            >
              <Text style={styles.optionText}>⚕️ Oui, j'ai des antécédents</Text>
            </TouchableOpacity>
          </View>
        )}

{/* ══════════════════════════════════ */}
        {/* ÉTAPE 6 — Âge du patient          */}
        {/* ══════════════════════════════════ */}
        {step === 6 && (
          <View style={styles.questionBlock}>
            <Text style={styles.questionEmoji}>👤</Text>
            <Text style={styles.questionTitle}>
              Quel est votre âge ?
            </Text>
            <Text style={styles.questionSub}>
              L'âge influence la priorité de consultation
            </Text>

            {/* Affichage âge actuel */}
            <View style={styles.scoreDisplay}>
              <Text style={styles.scoreNumber}>{answers.age}</Text>
              <Text style={styles.scoreLabel}>ans</Text>
            </View>

            {/* Boutons rapides par tranche d'âge */}
            <View style={styles.ageGrid}>
              {[
                { label: 'Enfant',    subtitle: '< 12 ans',  value: 8  },
                { label: 'Ado',       subtitle: '12-17 ans', value: 15 },
                { label: 'Adulte',    subtitle: '18-40 ans', value: 30 },
                { label: 'Adulte+',   subtitle: '41-64 ans', value: 50 },
                { label: 'Senior',    subtitle: '65+ ans',   value: 70 },
              ].map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.ageBtn,
                    answers.age === option.value && styles.ageBtnSelected,
                  ]}
                  onPress={() => update('age', option.value)}
                >
                  <Text style={[
                    styles.ageBtnLabel,
                    answers.age === option.value && styles.ageBtnTextSelected,
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={[
                    styles.ageBtnSub,
                    answers.age === option.value && styles.ageBtnTextSelected,
                  ]}>
                    {option.subtitle}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ══════════════════════════════════ */}
        {/* ÉTAPE 7 — Symptômes neurologiques */}
        {/* ══════════════════════════════════ */}
        {step === 7 && (
          <View style={styles.questionBlock}>
            <Text style={styles.questionEmoji}>🧠</Text>
            <Text style={styles.questionTitle}>
              Symptômes neurologiques ?
            </Text>
            <Text style={styles.questionSub}>
              Maux de tête sévères, vertiges, confusion,
              perte de connaissance
            </Text>

            <TouchableOpacity
              style={[
                styles.optionBtn,
                answers.symptomes_neurologiques === false && styles.optionSelected,
              ]}
              onPress={() => update('symptomes_neurologiques', false)}
            >
              <Text style={styles.optionText}>✅ Non, aucun symptôme</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionBtn,
                answers.symptomes_neurologiques === true && styles.optionSelected,
              ]}
              onPress={() => update('symptomes_neurologiques', true)}
            >
              <Text style={styles.optionText}>🧠 Oui, j'ai ces symptômes</Text>
            </TouchableOpacity>

            {/* Alerte si oui sélectionné */}
            {answers.symptomes_neurologiques && (
              <View style={styles.alertBox}>
                <Text style={styles.alertText}>
                  ⚠️ Ces symptômes peuvent indiquer une urgence neurologique.
                  Votre dossier sera marqué CRITIQUE.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* BOUTON SUIVANT  // ✅ Nouveau footer avec loading :*/}
        
            <View style={styles.footer}>
                <TouchableOpacity
                style={[styles.nextBtn, loading && styles.nextBtnDisabled]}
                onPress={suivant}
                disabled={loading}
                >
                {loading ? (
                    <View style={styles.loadingRow}>
                    <ActivityIndicator color="#fff" size="small" />
                    <Text style={styles.nextBtnText}>  Analyse en cours...</Text>
                    </View>
                ) : (
                    <Text style={styles.nextBtnText}>
                    {step === TOTAL_STEPS ? '✅ Envoyer à l\'IA' : 'Suivant →'}
                    </Text>
                )}
                </TouchableOpacity>
            </View>

    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: AppColors.white },
  header:         { flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between', padding: 16,
                    borderBottomWidth: 1, borderBottomColor: AppColors.border },
  backBtn:        { fontSize: 16, color: AppColors.primary, fontWeight: '600' },
  backBtnDisabled:{ color: AppColors.gray },
  headerTitle:    { fontSize: 17, fontWeight: '700', color: AppColors.dark },
  stepCount:      { fontSize: 14, color: AppColors.gray },

  progressBar:    { height: 6, backgroundColor: '#E5E5EA' },
  progressFill:   { height: 6, backgroundColor: AppColors.primary,
                    borderRadius: 3 },

  content:        { padding: 24, paddingBottom: 40 },

  questionBlock:  { alignItems: 'center' },
  questionEmoji:  { fontSize: 60, marginBottom: 16, marginTop: 10 },
  questionTitle:  { fontSize: 22, fontWeight: '700', color: AppColors.dark,
                    textAlign: 'center', marginBottom: 8 },
  questionSub:    { fontSize: 14, color: AppColors.gray, textAlign: 'center',
                    marginBottom: 28 },

  optionBtn:      { width: '100%', padding: 16, borderRadius: 12,
                    borderWidth: 2, borderColor: AppColors.border,
                    backgroundColor: AppColors.secondary, marginBottom: 12 },
  optionSelected: { borderColor: AppColors.primary,
                    backgroundColor: '#E3F2FD' },
  optionText:     { fontSize: 16, color: AppColors.dark, textAlign: 'center',
                    fontWeight: '500' },

  scoreDisplay:   { alignItems: 'center', marginBottom: 24 },
  scoreNumber:    { fontSize: 64, fontWeight: '800', color: AppColors.primary },
  scoreLabel:     { fontSize: 16, color: AppColors.gray, marginTop: 4 },

  painGrid:       { flexDirection: 'row', flexWrap: 'wrap',
                    justifyContent: 'center', gap: 10 },
  painBtn:        { width: 52, height: 52, borderRadius: 26,
                    backgroundColor: AppColors.secondary,
                    borderWidth: 2, borderColor: AppColors.border,
                    justifyContent: 'center', alignItems: 'center' },
  painBtnSelected:{ backgroundColor: AppColors.primary,
                    borderColor: AppColors.primary },
  painBtnDanger:  { borderColor: '#FF9500' },
  painBtnDangerSelected: { backgroundColor: '#FF3B30', borderColor: '#FF3B30' },
  painBtnText:    { fontSize: 16, fontWeight: '600', color: AppColors.dark },
  painBtnTextSelected: { color: AppColors.white },

  footer:         { padding: 16, borderTopWidth: 1,
                    borderTopColor: AppColors.border },
  nextBtn:        { backgroundColor: AppColors.primary, padding: 16,
                    borderRadius: 14, alignItems: 'center' },
  nextBtnText:    { color: AppColors.white, fontSize: 17, fontWeight: '700' },
  // Ajoute ces styles avant la dernière accolade }) :
  ageGrid:            { flexDirection: 'row', flexWrap: 'wrap',
                        justifyContent: 'center', gap: 10, marginTop: 8 },
  ageBtn:             { width: '28%', padding: 12, borderRadius: 12,
                        borderWidth: 2, borderColor: AppColors.border,
                        backgroundColor: AppColors.secondary,
                        alignItems: 'center' },
  ageBtnSelected:     { borderColor: AppColors.primary,
                        backgroundColor: AppColors.primary },
  ageBtnLabel:        { fontSize: 14, fontWeight: '700', color: AppColors.dark },
  ageBtnSub:          { fontSize: 11, color: AppColors.gray, marginTop: 2 },
  ageBtnTextSelected: { color: AppColors.white },

  alertBox:           { backgroundColor: '#FFF3E0', borderRadius: 12,
                        padding: 14, marginTop: 16, borderWidth: 1,
                        borderColor: '#FF9500', width: '100%' },
  alertText:          { color: '#CC6600', fontSize: 14, textAlign: 'center',
                        fontWeight: '500' },

  nextBtnDisabled:    { backgroundColor: AppColors.gray },
  loadingRow:         { flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center' },
});