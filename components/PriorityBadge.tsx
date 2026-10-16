// components/PriorityBadge.tsx
// 🏷️ Badge coloré affiché sur chaque rendez-vous

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PriorityLabel, getPriorityStyle } from '../types/Priority';

interface Props {
  label: PriorityLabel;
  size?: 'small' | 'large';
}

export default function PriorityBadge({ label, size = 'small' }: Props) {
  const colors = getPriorityStyle(label);

  return (
    <View style={[
      styles.badge,
      { backgroundColor: colors.background, borderColor: colors.border },
      size === 'large' && styles.badgeLarge,
    ]}>
      <Text style={[
        styles.text,
        { color: colors.text },
        size === 'large' && styles.textLarge,
      ]}>
        {colors.emoji} {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeLarge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  textLarge: {
    fontSize: 18,
    fontWeight: '700',
  },
});