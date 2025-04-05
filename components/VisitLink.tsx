import React from 'react';
import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

interface VisitLinkProps {
  url?: string;
  style?: any;
}

export default function VisitLink({ url, style }: VisitLinkProps) {
  const handleSource = () => {
    if (!url) return;
    
    // Add https:// if not present
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    Linking.openURL(fullUrl);
  };

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handleSource}>
      <Ionicons name="globe-outline" size={20} color="#007AFF" />
      <ThemedText style={styles.text}>Saved Link</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#007AFF',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});