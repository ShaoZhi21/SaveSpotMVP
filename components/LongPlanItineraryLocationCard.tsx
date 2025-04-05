import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface LongPlanItineraryLocationCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  imageUrl: any;
  sourceLink: string;
  description: string;
  bookingLink?: string;
  address?: string;
  openingHours?: string;
}

export default function LongPlanItineraryLocationCard({
  name,
  category,
  rating,
  imageUrl,
  sourceLink,
  description,
  bookingLink,
  address,
  openingHours,
}: LongPlanItineraryLocationCardProps) {
  return (
    <ThemedView style={styles.container}>
      <Image source={imageUrl} style={styles.image} />
      <ThemedView style={styles.content}>
        <ThemedView style={styles.header}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={styles.title}>{name}</ThemedText>
            <ThemedText style={styles.category}>{category}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <ThemedText style={styles.rating}>{rating}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedText style={styles.description} numberOfLines={2}>
          {description}
        </ThemedText>

        {address && (
          <ThemedView style={styles.infoRow}>
            <Ionicons name="location" size={16} color="#666" />
            <ThemedText style={styles.infoText} numberOfLines={1}>
              {address}
            </ThemedText>
          </ThemedView>
        )}

        {openingHours && (
          <ThemedView style={styles.infoRow}>
            <Ionicons name="time" size={16} color="#666" />
            <ThemedText style={styles.infoText} numberOfLines={1}>
              {openingHours}
            </ThemedText>
          </ThemedView>
        )}

        <ThemedView style={styles.footer}>
          <ThemedView style={styles.sourceContainer}>
            <Ionicons name="logo-tiktok" size={16} color="#666" />
            <ThemedText style={styles.source}>{sourceLink.split('.com/')[1]}</ThemedText>
          </ThemedView>
          {bookingLink && (
            <TouchableOpacity style={styles.bookingButton}>
              <ThemedText style={styles.bookingText}>Book Now</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    height: 150,
  },
  image: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFB800',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  source: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  bookingButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  bookingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});