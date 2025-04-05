import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface SortByProps {
  onSort?: () => void;
}

export default function SortBy({ onSort }: SortByProps) {
  return (
    <TouchableOpacity onPress={onSort} style={styles.container}>
      <ThemedView style={styles.content}>
        <Ionicons name="funnel-outline" size={20} color="#666" />
        <ThemedText style={styles.text}>Sort</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});