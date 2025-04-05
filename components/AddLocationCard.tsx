import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import ViewLocationSmall from './ViewLocationSmall';
import BookLocationSmall from './BookLocationSmall';
import { Ionicons } from '@expo/vector-icons';

type LocationCardProps = {
  location: {
    id: string;
    name: string;
    description: string;
    imageUrl: any;
    bookingLink?: string;
  };
  isSelected: boolean;
  onToggle: () => void;
};

export default function AddLocationCard({ location, isSelected, onToggle }: LocationCardProps) {
  return (
    <TouchableOpacity onPress={onToggle}>
      <ThemedView key={location.id} style={styles.previewContainer}>
        <ThemedView style={styles.imagePlaceholder}>
          <Image 
            source={location.imageUrl}
            style={styles.previewImage}
          />
        </ThemedView>
        <ThemedView style={styles.checkbox}>
          <Ionicons 
            name={isSelected ? "checkmark-circle" : "checkmark-circle-outline"} 
            size={24} 
            color={isSelected ? "#007AFF" : "#999"} 
          />
        </ThemedView>
        <ThemedView style={styles.previewInfo}>
          <ThemedText style={styles.previewTitle}>{location.name}</ThemedText>
          <ThemedText 
            style={styles.previewSummary}
            numberOfLines={2}
          >
            {location.description}
          </ThemedText>
          <ThemedView style={styles.buttonGroup}>
            <ViewLocationSmall locationName={location.name} style={styles.actionButton} />
            <BookLocationSmall bookingLink={location.bookingLink} style={styles.actionButton} />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  previewSummary: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
    marginTop: -2,
  },
  actionButton: {
    flex: 1,
    padding: 6,
    borderRadius: 6,
  },
  checkbox: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 2,
  },
});