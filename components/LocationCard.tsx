import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';  // Add this import at the top

interface LocationCardProps {
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
  latitude?: number;
  longitude?: number;
  onPress?: () => void;
}

export default function LocationCard({ 
  id, 
  name, 
  category, 
  rating, 
  imageUrl, 
  sourceLink, 
  description,
  bookingLink,
  address,
  openingHours,
  latitude,
  longitude,
  onPress 
}: LocationCardProps) {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push({
        pathname: '/Location',
        params: {
          id,
          name,
          category,
          rating: rating.toString(),
          imageUrl: JSON.stringify(imageUrl),
          sourceLink,
          description,
          bookingLink: bookingLink || '',
          address: address || '',
          openingHours: openingHours || '',
          latitude: latitude?.toString() || '0',
          longitude: longitude?.toString() || '0'
        }
      });
    }
  };

  const handleBooking = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookingLink) {
      router.push(`/WebView?url=${encodeURIComponent(bookingLink)}&title=${encodeURIComponent(name)}`);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedView style={styles.imagePlaceholder}>
          {imageUrl ? (
            <Image source={imageUrl} style={styles.image} resizeMode="cover" />
          ) : (
            <ThemedText>No Image</ThemedText>
          )}
          <ThemedView style={styles.ratingBadge}>
            <ThemedText style={styles.ratingText}>
              {rating.toFixed(1)}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.categoryBadge}>
            <ThemedText style={styles.categoryText}>
              {category}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.details}>
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.name} numberOfLines={1}>
              {name}
            </ThemedText>
          </ThemedView>
          {sourceLink && (
            <ThemedView style={styles.sourceLinkContainer}>
              <Ionicons name="bookmark-outline" size={14} color="#007AFF" />
              <ThemedText style={styles.sourceLink} numberOfLines={1}>
                {sourceLink}
              </ThemedText>
            </ThemedView>
          )}
          {description && (
            <ThemedText style={styles.description} numberOfLines={2}>
              {description}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

// Update these styles
const styles = StyleSheet.create({
  container: {
    width: '47.5%',
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 4,
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    width: '100%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  details: {
    padding: 14,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  category: {
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 4,
  },
  sourceLinkContainer: {
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      marginBottom: 4,
      alignSelf: 'center',
    },
    sourceLink: {
      fontSize: 12,
      textAlign: 'center',
      opacity: 0.6,
      color: '#007AFF',
    },
    sourceLinkImage: {
      width: 16,
      height: 16,
      borderRadius: 13,
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 4,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Changed from 0.7 to 0.5 for more transparency
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Changed from 0.7 to 0.5 for more transparency
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
    ticketButtonText: {
      color: '#fff', // White text for contrast
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    arrowButton: {
      marginLeft: 'auto',
      padding: 8,
      backgroundColor: '#EFF6FF',
      borderRadius: 8,
    },
    optionsContainer: {
      position: 'absolute',
      right: -90,
      top: 165,  // Move below the buttons
      backgroundColor: '#ffffff',
      borderRadius: 8,
      padding: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      zIndex: 9999,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      width: 120,
    },
    optionButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      width: '100%',
      alignItems: 'center',
    },
    optionDivider: {
      height: 1,
      backgroundColor: '#f0f0f0',
      width: '100%',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
      paddingRight: 4,
    },
    ticketButton: {
      backgroundColor: '#007AFF',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 20,
    },
    optionText: {
      fontSize: 14,
      color: '#007AFF',
    },
    deleteText: {
      color: '#FF3B30',
    },
});
