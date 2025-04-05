import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface ViewLocationProps {
  locationName: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  rating?: number;
  address?: string;
  style?: any;
  imageUrl?: number | string;
}

export default function ViewLocation({ locationName, latitude = 1.3521, longitude = 103.8198, description, rating, address, style, imageUrl }: ViewLocationProps) {
  const router = useRouter();
  const handlePress = () => {
    const location = {
      id: 'temp-id',
      name: locationName,
      latitude,
      longitude,
      description: description || locationName,
      rating,
      address,
      imageUrl
    };
    router.push({
      pathname: '/(tabs)/Map',
      params: {
        locations: JSON.stringify([location]),
        fromLocation: 'true'
      }
    });
  };

  const handleGoogleMapsPress = async () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={[styles.leftButton, style]} onPress={handlePress}>
        <Ionicons name="map-outline" size={20} color="#4285F4" />
        <ThemedText style={styles.text}>Location</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.rightButton, style]} onPress={handleGoogleMapsPress}>
        <Image 
          source={require('../assets/images/googlemaps.png')} 
          style={styles.googleMapsIcon} 
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    width: '50%',
  },
  leftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4285F4',
    flex: 0.7,
  },
  rightButton: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#34C759',
    flex: 0.3,
  },
  text: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: '600',
  },
  googleMapsIcon: {
    width: 20,
    height: 20,
  },
});