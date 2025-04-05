import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

export default function ViewLocationSmall({ locationName, style }) {
  return (
    <TouchableOpacity style={[{
      backgroundColor: '#007AFF',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 6,
      borderRadius: 6,
      justifyContent: 'center',
      gap: 4,
    }, style]}>
      <ThemedText style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>Map</ThemedText>
      <Ionicons name="map" size={14} color="#fff" />
    </TouchableOpacity>
  );
}