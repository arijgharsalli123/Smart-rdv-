// components/ui/Input.tsx
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: string;
}

export default function Input({ label, error, icon, ...props }: InputProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '600',
          color: '#374151', marginBottom: 6 }}>
          {label}
        </Text>
      )}
      <View style={{
        flexDirection: 'row', alignItems: 'center',
        borderWidth: 1.5,
        borderColor: error ? '#dc2626' : '#d1d5db',
        borderRadius: 12, backgroundColor: '#f9fafb',
        paddingHorizontal: 14,
      }}>
        {icon && (
          <Text style={{ fontSize: 18, marginRight: 8 }}>{icon}</Text>
        )}
        <TextInput
          style={{ flex: 1, paddingVertical: 13,
            fontSize: 15, color: '#1f2937' }}
          placeholderTextColor="#9ca3af"
          {...props}
        />
      </View>
      {error && (
        <Text style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>
          ⚠️ {error}
        </Text>
      )}
    </View>
  );
}