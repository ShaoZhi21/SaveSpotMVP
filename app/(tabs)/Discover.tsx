import React from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import LocationCard from '@/components/LocationCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MOCK_PUBLIC_FOLDERS = [
  { 
    id: '1', 
    name: 'Tokyo Travel Guide', 
    owner: 'Sarah', 
    places: 12, 
    likes: 234,
    coverImage: require('../../assets/images/japan/sensoji_temple.jpeg')
  },
  { 
    id: '2', 
    name: 'Singapore Hidden Gems', 
    owner: 'Mike', 
    places: 8, 
    likes: 156,
    coverImage: require('../../assets/images/hiddengem/mama_diam_bar.webp')
  },
  { 
    id: '3', 
    name: 'Best Coffee Spots', 
    owner: 'Alex', 
    places: 15, 
    likes: 342,
    coverImage: require('../../assets/images/cafes/atlas_coffee.jpeg')
  },
];

const MOCK_LOCATIONS = [
  { 
    id: '1', 
    name: 'Mount Fuji', 
    category: 'Scenery', 
    rating: 4.9, 
    imageUrl: require('../../assets/images/japan/mount_fuji.jpeg'),
    sourceLink: 'tiktok.com/@japan_spots',
    description: 'Best spot to view Mount Fuji, go during early morning!',
    bookingLink: 'https://www.klook.com/en-SG/activity/2675-mount-fuji-classic-route-day-tour-tokyo/',
    address: 'Kitayama, Fujinomiya, Shizuoka 418-0112, Japan',
    openingHours: 'July-Aug: 24/7 | Other months: Weather dependent',
  },
  {
    id: '2',
    name: 'Atlas Coffee',
    category: 'Cafe',
    rating: 4.8,
    imageUrl: require('../../assets/images/cafes/atlas_coffee.jpeg'),
    sourceLink: 'instagram.com/@coffeeguide',
    description: 'Minimalist coffee shop serving specialty brews in a cozy setting.',
    bookingLink: ''
  },
  {
    id: '3',
    name: 'Mama Diam',
    category: 'Bar',
    rating: 4.8,
    imageUrl: require('../../assets/images/hiddengem/mama_diam_bar.webp'),
    description: 'Secret speakeasy bar with creative cocktails and vintage vibes.',
    sourceLink: 'tiktok.com/@sg_hidden'
  }
];


export default function Discover() {
  const handleAddLocation = (locationId: string) => {
    // TODO: Implement add location functionality
    console.log('Add location:', locationId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.heading}>Discover</ThemedText>
        <ThemedView style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search places or collections..."
            placeholderTextColor="#666"
          />
        </ThemedView>
      </ThemedView>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
          <ThemedView style={styles.categoryGrid}>
            {[
              { name: 'Restaurant', icon: 'restaurant' },
              { name: 'Cafe', icon: 'cafe' },
              { name: 'Attractions', icon: 'compass' },
              { name: 'Shopping', icon: 'cart' },
              { name: 'Hotels', icon: 'bed' },
              { name: 'Nature', icon: 'leaf' },
              { name: 'Culture', icon: 'color-palette' },
              { name: 'Entertainment', icon: 'game-controller' },
              { name: 'Sports', icon: 'basketball' },
              { name: 'Nightlife', icon: 'moon' }
            ].map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryItem}>
                <ThemedView style={styles.categoryIconContainer}>
                  <Ionicons name={category.icon} size={24} color="#007AFF" />
                </ThemedView>
                <ThemedText 
                  style={styles.categoryLabel} 
                  numberOfLines={1}
                >{category.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Public Collections</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.folderScroll}>
            {MOCK_PUBLIC_FOLDERS.map((folder) => (
              <TouchableOpacity key={folder.id} style={styles.folderCard}>
                <Image source={folder.coverImage} style={styles.folderImage} />
                <ThemedView style={styles.folderContent}>
                  <ThemedView style={styles.folderHeader}>
                    <ThemedText style={styles.folderName}>{folder.name}</ThemedText>
                    <ThemedText style={styles.folderOwner}>by {folder.owner}</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.folderStats}>
                    <ThemedText style={styles.statText}>{folder.places} places</ThemedText>
                    <ThemedText style={[styles.statText, { color: '#FF3B30' }]}>♥ {folder.likes}</ThemedText>
                  </ThemedView>
                </ThemedView>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Trending Places</ThemedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.folderScroll}
          >
            {MOCK_LOCATIONS.map((location) => (
              <TouchableOpacity key={location.id} style={styles.folderCard}>
                <Image source={location.imageUrl} style={styles.folderImage} />
                <ThemedView style={styles.folderContent}>
                  <ThemedView style={styles.folderHeader}>
                    <ThemedText style={styles.folderName}>{location.name}</ThemedText>
                    <ThemedText style={styles.folderOwner}>{location.category}</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.folderStats}>
                    <ThemedText style={[styles.statText, { color: '#FFD700' }]}>★ {location.rating}</ThemedText>
                    <ThemedText style={styles.statText}>{location.sourceLink.split('.com/')[1]}</ThemedText>
                  </ThemedView>
                </ThemedView>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ThemedView>

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 40,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingVertical: 8, // Reduced from 16
    gap: 4, // Reduced from 8
  },
  section: {
    marginBottom: 8, // Reduced from 12
    paddingHorizontal: 12, // Already reduced earlier
  },
  categoryItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 4, // Reduced from 8 to push up the next sections
  },
  section: {
    marginBottom: 4, // Reduced from 8 to push up the next sections
    paddingHorizontal: 12,
  },
  categoryLabel: {
    fontSize: 8, // Reduced from 12
    textAlign: 'center',
    width: '100%', // Ensure text stays within bounds
    paddingHorizontal: 2, // Add small padding
    ellipsizeMode: 'tail',
  },
  folderScroll: {
    marginHorizontal: -12, // Adjusted to match new padding
    paddingHorizontal: 12, // Adjusted to match new padding
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 0, // Remove padding since it's handled by section
  },
  locationScroll: {
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 0,
  },
  locationScrollContent: {
    paddingRight: 16,
  },
  locationCardWrapper: {
    marginRight: 8, // Reduced from 12
    width: 180,
  },
  locationScroll: {
    paddingLeft: 12, // Reduced from 16
    display: 'flex',
    flexDirection: 'row',
    gap: 0,
  },
  locationScrollContent: {
    paddingRight: 12, // Reduced from 16
  },
  folderScroll: {
    paddingHorizontal: 16, // Add horizontal padding
    marginHorizontal: -16, // Negative margin to allow cards to peek
    paddingHorizontal: 16, // Add padding to show part of next card
  },
  folderCard: {
    width: 200,
    height: 260, // Reduced from 280
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  folderImage: {
    width: '100%',
    height: 130, // Reduced from 140
    backgroundColor: '#f0f0f0',
  },
  folderContent: {
    padding: 10, // Reduced from 12
    flex: 1,
    justifyContent: 'space-between',
  },
  folderName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  folderOwner: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  folderStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  categoryGrid: {
    fl0xDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  categoryItem: {
    width: '20%', // Increased from 20%
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Changed from space-between to space-around for better distribution
    paddingHorizontal: 0,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});
