import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface LongLocationCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  description: string;
  address?: string;
  imageUrl: any;
  bookingLink?: string;
  latitude?: number;
  longitude?: number;
}

export default function LongLocationCard({
  id,
  name,
  category,
  rating,
  description,
  address,
  imageUrl,
  bookingLink,
  latitude,
  longitude,
}: LongLocationCardProps) {
  
  const handlePress = () => {
    router.push({
      pathname: '/Location',
      params: {
        id,
        name,
        category,
        rating: rating.toString(),
        description,
        imageUrl: JSON.stringify(imageUrl),
        address: address || '',
        bookingLink: bookingLink || '',
        latitude: latitude?.toString() || '',
        longitude: longitude?.toString() || '',
      },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={imageUrl} style={styles.image} />
      <View style={styles.content}>
        <ThemedText style={styles.title}>{name}</ThemedText>
        <ThemedText style={styles.category}>{category}</ThemedText>
        <ThemedText style={styles.rating}>
          <ThemedText style={styles.rating}>★</ThemedText> {rating.toFixed(1)}
        </ThemedText>
        <ThemedText style={styles.description} numberOfLines={2}>{description}</ThemedText>
        <ThemedText style={styles.address} numberOfLines={1}>{address}</ThemedText>
        
        <View style={styles.actions}>
          {(latitude && longitude) && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push({
                pathname: '/Map',
                params: { latitude, longitude }
              })}
            >
              <Ionicons name="map-outline" size={16} color="#007AFF" />
              <ThemedText style={styles.actionText}>Map</ThemedText>
            </TouchableOpacity>
          )}
          {bookingLink && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push(bookingLink)}
            >
              <Ionicons name="calendar-outline" size={16} color="#007AFF" />
              <ThemedText style={styles.actionText}>Book</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginVertical: 12,
    shadowColor: 'rgba(0, 0, 0, 0.08)', // Lighter shadow
    shadowOffset: { width: 0, height: 4 }, // Smaller offset
    shadowOpacity: 1,
    shadowRadius: 8, // Reduced radius
    elevation: 3, // Lower elevation for Android
    overflow: 'hidden',
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light gray border
    },
  image: {
    width: 130,
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    marginTop: -5,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  rating: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontSize: 12,
    color: '#FFD700',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 4,
  },
});