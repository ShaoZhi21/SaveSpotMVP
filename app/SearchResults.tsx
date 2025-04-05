import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import SearchBar from '../components/SearchBar';
import { ThemedView } from '../components/ThemedView';
import { SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedText } from '../components/ThemedText';
import LongLocationCard from '@/components/LongLocationCard';

interface Location {
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
}

export default function SearchResults() {
  const { query = '', locations = '[]' } = useLocalSearchParams<{ query: string, locations: string }>();
  const [searchQuery, setSearchQuery] = useState(query);
  const allLocations = JSON.parse(locations) as Location[];
  const [filteredLocations, setFilteredLocations] = useState(allLocations);

  useEffect(() => {
    // Filter locations based on search query
    const filtered = allLocations.filter(location =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (location.description && location.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredLocations(filtered);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <ThemedView style={styles.topContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => router.push('/Map')}
      >
        <Ionicons name="map-outline" size={24} color="#333" />
      </TouchableOpacity>
      
      </ThemedView>
      <ThemedView style={styles.locationInfo}>
        <ThemedText style={styles.locationText}>Now in Singapore</ThemedText>
        <TouchableOpacity style={styles.nearMeButton} onPress={() => router.push('/Map')}>
          <Ionicons name="location" size={16} color="#333" />
          <ThemedText style={styles.nearMeText}>See what's near me</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ScrollView horizontal style={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
        {['All', 'Cafes', 'Restaurants', 'Shopping', 'Entertainment'].map((category) => (
          <TouchableOpacity key={category} style={styles.categoryButton}>
            <ThemedText style={styles.categoryText}>{category}</ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.cardsContainer}>
          {filteredLocations.map(location => (
            <LongLocationCard
              key={location.id}
              id={location.id}
              name={location.name}
              category={location.category}
              rating={location.rating}
              description={location.description}
              address={location.address}
              imageUrl={location.imageUrl}
              bookingLink={location.bookingLink}
              latitude={location.latitude}
              longitude={location.longitude}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff', // Set width to 100% to fill the screen horizontally
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 8,
    width: '90%',
    alignSelf: 'center',
  },
  searchBar: {
    marginHorizontal: 16,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  cardsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 0,
    cardsContainer: {
        paddingHorizontal: 16,
        width: '100%',
        paddingVertical: 8,
      },
    width: '100%', 
  },
  locationInfo: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eaeaea',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', // Align items vertically in the center
    },
    locationText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    nearMeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: 8,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    nearMeText: {
      marginLeft: 4,
      color: '#333',
    },
    categoriesContainer: {
      paddingVertical: 8, 
      paddingHorizontal: 16,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      marginBottom: -80, 
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#f5f5f5',
      borderRadius: 16,
      marginRight: 8,
      height: 40,
    },
    categoryText: {
      color: '#333',
      fontWeight: '500',
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#fff',
      borderRadius: 30,
      padding: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    addOptions: {
      position: 'absolute',
      bottom: 80,
      right: 20,
      backgroundColor: '#fff',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    optionButton: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    optionText: {
      color: '#333',
      fontSize: 16,
    },
});