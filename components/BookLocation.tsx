import React from 'react';
import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

interface BookLocationProps {
  bookingLink: string;
  style?: any;
}

export default function BookLocation({ bookingLink, style }: BookLocationProps) {
  const handleBooking = () => {
    if (bookingLink) {
      Linking.openURL(bookingLink);
    }
  };

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handleBooking}>
      <Ionicons name="calendar-outline" size={20} color="#fff" />
      <ThemedText style={styles.text}>Book Now</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});