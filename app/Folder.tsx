import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';  // Add TouchableOpacity to imports
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import LocationCard from '@/components/LocationCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';  // Add this import at the top
import { Location } from '@/types/location';

export default function FolderScreen() {
  const router = useRouter();
  const { title, locations } = useLocalSearchParams();
  const folderLocations = locations ? JSON.parse(locations as string) : [];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false
        }} 
      />
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>{title}</ThemedText>
        <TouchableOpacity 
          onPress={() => router.push('/AddLocation')}
          style={styles.addButton}
        >
          <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.grid}>
          {folderLocations.map((location) => (
            <LocationCard
              key={location.id}
              {...location}
            />
          ))}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  addButton: {
    padding: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2563EB',
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  }
});

