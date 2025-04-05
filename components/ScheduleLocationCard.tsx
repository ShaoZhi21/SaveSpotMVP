import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BookLocationSmall from './BookLocationSmall';

interface ScheduleLocationCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  imageUrl: any;
  description?: string;
  bookingLink?: string;
  latitude?: number;
  longitude?: number;
}

export default function ScheduleLocationCard({
  id,
  name,
  category,
  rating,
  imageUrl,
  description,
  bookingLink,
  latitude,
  longitude,
}: ScheduleLocationCardProps) {
  const router = useRouter();

  const handleMapPress = () => {
    router.push({
      pathname: '/(tabs)/Map',
      params: { latitude, longitude }
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Image source={imageUrl} style={styles.image} />
      <ThemedView style={styles.contentContainer}>
        <ThemedView style={styles.header}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={styles.title} numberOfLines={1}>{name}</ThemedText>
            <ThemedView style={styles.categoryContainer}>
              <ThemedText style={styles.category}>{category}</ThemedText>
              <ThemedText style={styles.rating}>★ {rating}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleMapPress}>
            <Ionicons name="map-outline" size={16} color="#666" />
            <ThemedText style={styles.actionButtonText}>Map</ThemedText>
          </TouchableOpacity>
          
          <BookLocationSmall bookingLink={bookingLink} />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 120,
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  category: {
    fontSize: 12,
    color: '#666',
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#666',
  },
});