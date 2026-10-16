// components/ui/Button.tsx
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'danger';
  style?: ViewStyle;
}

export default function Button({
  title, onPress, loading = false,
  disabled = false, variant = 'primary', style
}: ButtonProps) {

  const bgColor = {
    primary: '#1e3a8a',
    outline: 'transparent',
    danger: '#dc2626',
  }[variant];

  const textColor = variant === 'outline' ? '#1e3a8a' : '#ffffff';
  const borderColor = variant === 'outline' ? '#1e3a8a' : 'transparent';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[{
        backgroundColor: bgColor,
        borderWidth: 2,
        borderColor,
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        opacity: disabled || loading ? 0.6 : 1,
      }, style]}
    >
      {loading
        ? <ActivityIndicator color={textColor} />
        : <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16 }}>
            {title}
          </Text>
      }
    </TouchableOpacity>
  );
}