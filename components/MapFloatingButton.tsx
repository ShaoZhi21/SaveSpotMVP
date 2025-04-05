import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface MapFloatingButtonProps {
  locations: Array<{
    id: string;
    name: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    imageUrl?: number | string; // Supports both local (require) and remote images
    rating?: number;
    address?: string;
  }>;
}

export default function MapFloatingButton({ locations }: MapFloatingButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    // Convert locations to the format expected by the Map component
    const mapLocations = locations.map(loc => ({
      id: loc.id,
      name: loc.name,
      latitude: loc.latitude || 1.3521,
      longitude: loc.longitude || 103.8198,
      description: loc.description,
      imageUrl: loc.imageUrl,
      rating: loc.rating,
      address: loc.address
    }));

    router.push({
      pathname: '/(tabs)/Map' as const,
      params: { locations: JSON.stringify(mapLocations) }
    });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Ionicons name="map-outline" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 15,
    bottom: 160,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
})
;