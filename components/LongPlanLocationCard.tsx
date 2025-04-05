import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import BookingLinkModal from './BookingLinkModal';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Linking } from 'react-native';

interface LongPlanLocationCardProps {
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

export default function LongPlanLocationCard({
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
}: LongPlanLocationCardProps) {
  
  const [isBookingModalVisible, setIsBookingModalVisible] = React.useState(false);

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
    <View>
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Image source={imageUrl} style={styles.image} />
        <View style={styles.content}>
          <ThemedText style={styles.title}>{name}</ThemedText>
          <ThemedText style={styles.category}>{category}</ThemedText>
          <ThemedText style={styles.rating}>
            <ThemedText style={styles.rating}>★</ThemedText> {rating.toFixed(1)}
          </ThemedText>
          {address && <ThemedText style={styles.address} numberOfLines={1}>{address}</ThemedText>}
          <ThemedText style={styles.description} numberOfLines={2}>{description}</ThemedText>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomBar}>
        <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push({
                pathname: '/Map',
                params: { latitude, longitude }
              })}
            >
              <Ionicons name="map-outline" size={20} color="#007AFF" />
              <ThemedText style={styles.actionText}>Map</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setIsBookingModalVisible(true)}
            >
              <Ionicons name="calendar-outline" size={20} color="#007AFF" />
              <ThemedText style={styles.actionText}>Book</ThemedText>
              <BookingLinkModal
                visible={isBookingModalVisible}
                onClose={() => setIsBookingModalVisible(false)}
                siteName="Klook"
                bookingLink={bookingLink || ''}
                />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => Linking.openURL('calshow://' + new Date().toISOString())}
            >
              <Ionicons name="calendar" size={20} color="#007AFF" />
              <ThemedText style={styles.actionText}>Calendar</ThemedText>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: 'rgba(0, 0, 0, 0.08)', // Lighter shadow
    shadowOffset: { width: 0, height: 4 }, // Smaller offset
    shadowOpacity: 1,
    shadowRadius: 8, // Reduced radius
    elevation: 3, // Lower elevation for Android
    overflow: 'hidden',
    width: '100%',
    height: 140,
    display: 'flex',
    justifyContent: 'space-between',
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
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  category: {
    fontSize: 12,
    color: '#666',
    alignItems: 'center',

  },
  rating: {
    position: 'absolute',
    top: 6,
    right: 12,
    fontSize: 12,
    color: '#FFD700',

  },
  description: {
    height: 20,
    fontSize: 12,
    color: '#666',
  },
  address: {
    height: 20,
    fontSize: 12,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', 
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '30%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  bottomBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light gray border
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 122, 255, 0.1)',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
    marginBottom: 10,
  },
});