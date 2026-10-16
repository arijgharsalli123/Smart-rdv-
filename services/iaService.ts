// services/iaService.ts
// 🤖 Service IA — Appel réel FastAPI ou fallback simulé

// ⚙️ CONFIG : change cette URL quand tu lances ton serveur Python
const IA_API_URL = 'http://192.168.43.16:8000'; // ← remplace par ton IP locale
const USE_MOCK = true; // ← met FALSE quand ton serveur Python tourne

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export interface QuestionnaireData {
  fever: boolean;
  pain_level: number;           // 0 à 10
  duration_days: number;          // en jours
  difficulty_breathing: boolean;
  antecedents_chroniques: boolean;
  age: number;
  symptomes_neurologiques: boolean;
  specialite_cible: string;
}

export interface ScoreIA {
  score: 1 | 2 | 3 | 4;
  label: 'FAIBLE' | 'MODÉRÉ' | 'URGENT' | 'CRITIQUE';
  confiance: number;        // pourcentage ex: 85
  recommendation: string;   // texte affiché à l'utilisateur
}

// ─────────────────────────────────────────────
// CONVERTISSEUR : nos données → format Python API
// ─────────────────────────────────────────────

function versFormatAPI(data: QuestionnaireData) {
  return {
    symptoms: {
      fever: data.fever,
      pain_level: data.pain_level,
      duration_days: data.duration_days,
      difficulty_breathing: data.difficulty_breathing,
      age: data.age,
      chronic_history: data.antecedents_chroniques,
      neurological: data.symptomes_neurologiques,
      specialty: data.specialite_cible,
    }
  };
}

// ─────────────────────────────────────────────
// CONVERTISSEUR : réponse Python → notre format ScoreIA
// ─────────────────────────────────────────────

function versScoreIA(apiResponse: any): ScoreIA {
  const map: Record<string, ScoreIA['label']> = {
    faible:   'FAIBLE',
    modere:   'MODÉRÉ',
    urgent:   'URGENT',
    critique: 'CRITIQUE',
  };

  const scoreMap: Record<string, 1 | 2 | 3 | 4> = {
    faible:   1,
    modere:   2,
    urgent:   3,
    critique: 4,
  };

  const priority = apiResponse.priority?.toLowerCase() ?? 'modere';

  return {
    score:          scoreMap[priority] ?? 2,
    label:          map[priority] ?? 'MODÉRÉ',
    confiance:      Math.round((apiResponse.confidence ?? 0.85) * 100),
    recommendation: apiResponse.recommendation ?? '',
  };
}

// ─────────────────────────────────────────────
// MODE SIMULÉ (quand USE_MOCK = true)
// ─────────────────────────────────────────────

function calculerScoreLocal(data: QuestionnaireData): ScoreIA {
  let points = 0;

  if (data.fever)                    points += 2;
  if (data.pain_level >= 8)       points += 3;
  else if (data.pain_level >= 5)  points += 2;
  else if (data.pain_level >= 3)  points += 1;
  if (data.duration_days <= 1)      points += 2;
  else if (data.duration_days <= 3) points += 1;
  if (data.difficulty_breathing)   points += 4;
  if (data.antecedents_chroniques)    points += 2;
  if (data.age < 5 || data.age > 65) points += 2;
  if (data.symptomes_neurologiques)   points += 5;

  let score: 1 | 2 | 3 | 4;
  let label: ScoreIA['label'];
  let recommendation: string;

  if (points >= 10) {
    score = 4; label = 'CRITIQUE';
    recommendation = '🟥 URGENCE - Consultation immédiate requise';
  } else if (points >= 6) {
    score = 3; label = 'URGENT';
    recommendation = '🟧 URGENT - Consultation dans les 12h';
  } else if (points >= 3) {
    score = 2; label = 'MODÉRÉ';
    recommendation = '🟨 MODÉRÉ - Consultation dans les 48h';
  } else {
    score = 1; label = 'FAIBLE';
    recommendation = '🟩 FAIBLE - Consultation de routine';
  }

  return {
    score,
    label,
    confiance: Math.floor(70 + Math.random() * 25),
    recommendation,
  };
}

// ─────────────────────────────────────────────
// FONCTION PRINCIPALE — à utiliser dans les écrans
// ─────────────────────────────────────────────

export async function envoyerQuestionnaire(data: QuestionnaireData): Promise<ScoreIA> {

  // MODE SIMULÉ
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // délai réaliste
    const resultat = calculerScoreLocal(data);
    console.log('🤖 [MOCK] Score IA:', resultat);
    return resultat;
  }

  // APPEL RÉEL vers Python FastAPI
  try {
    const payload = versFormatAPI(data);
    console.log('📡 Envoi vers API Python:', payload);

    const response = await fetch(`${IA_API_URL}/api/ia/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur: ${response.status}`);
    }

    const json = await response.json();
    console.log('✅ Réponse API Python:', json);

    return versScoreIA(json);

  } catch (error) {
    // Si le serveur est éteint → fallback automatique sur le mock
    console.warn('⚠️ API Python indisponible, fallback mode simulé:', error);
    return calculerScoreLocal(data);
  }
}