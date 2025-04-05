import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface LocationPreviewCardProps {
  id: string;
  name: string;
  imageUrl?: number | string; 
  latitude: number;
  longitude: number;
  address?: string;
  onLocationSelect?: (latitude: number, longitude: number) => void;
}

export default function LocationPreviewCard({ id, name, imageUrl, latitude, longitude, address, onLocationSelect }: LocationPreviewCardProps) {
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();

  const handlePress = () => {
    setIsSelected(true);
    if (onLocationSelect) {
      onLocationSelect(latitude, longitude);
    }
    setTimeout(() => setIsSelected(false), 1000); 
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, isSelected && styles.selected]}>
      <ThemedView style={styles.card}>
        <ThemedView style={styles.imagePlaceholder}>
        {imageUrl ? (
          <Image source={imageUrl} style={styles.image} resizeMode="cover" />
        ) : (
          <ThemedText style={styles.noImageText}>No Image</ThemedText>
        )}
        </ThemedView>
        <ThemedView style={styles.textContainer}>
          <ThemedText style={styles.name} numberOfLines={1}>
            {name}
          </ThemedText>
          {address && (
            <ThemedText style={styles.address} numberOfLines={1}>
              {address}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    transition: 'background-color 0.3s ease-in-out',
  },
  card: {
    height: 140,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  noImageText: {
    textAlign: 'center',
    color: '#888', 
    fontSize: 14,
    fontWeight: '400',
    padding: 10,
  },
});
