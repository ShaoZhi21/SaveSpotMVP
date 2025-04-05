import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

export default function BookLocationSmall({ bookingLink, style }) {
  return (
    <TouchableOpacity style={[{
      backgroundColor: '#34C759',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 6,
      borderRadius: 6,
      justifyContent: 'center',
      gap: 4,
    }, style]}>
      <ThemedText style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>Book</ThemedText>
      <Ionicons name="calendar" size={14} color="#fff" />
    </TouchableOpacity>
  );
}