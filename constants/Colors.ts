// constants/Colors.ts
// 🎨 Palette de couleurs SmartRDV — Priorités IA

export const PriorityColors = {
  CRITIQUE: {
    background: '#FFE5E5',   // rouge clair (fond)
    border:     '#FF3B30',   // rouge vif (bordure)
    text:       '#CC0000',   // rouge foncé (texte)
    badge:      '#FF3B30',   // rouge vif (badge)
    emoji:      '🔴',
  },
  URGENT: {
    background: '#FFF0E5',   // orange clair
    border:     '#FF9500',   // orange vif
    text:       '#CC6600',   // orange foncé
    badge:      '#FF9500',
    emoji:      '🟠',
  },
  MODÉRÉ: {
    background: '#FFFDE5',   // jaune clair
    border:     '#FFCC00',   // jaune vif
    text:       '#997A00',   // jaune foncé
    badge:      '#FFCC00',
    emoji:      '🟡',
  },
  FAIBLE: {
    background: '#E5FFE9',   // vert clair
    border:     '#34C759',   // vert vif
    text:       '#1A7A35',   // vert foncé
    badge:      '#34C759',
    emoji:      '🟢',
  },
};

// Couleurs générales de l'app
export const AppColors = {
  primary:    '#2196F3',   // bleu principal SmartRDV
  secondary:  '#F5F5F5',   // fond gris clair
  white:      '#FFFFFF',
  dark:       '#1C1C1E',   // texte principal
  gray:       '#8E8E93',   // texte secondaire
  border:     '#E5E5EA',   // bordures
  success:    '#34C759',
  danger:     '#FF3B30',
};