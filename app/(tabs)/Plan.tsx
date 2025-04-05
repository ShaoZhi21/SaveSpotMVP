import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import LongPlanLocationCard from '@/components/LongPlanLocationCard';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data from your existing folders
const FOLDERS = ['Japan', 'Cafes', 'JB', 'Hidden Gems'];

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
  latitude?: number;  // Add these properties
  longitude?: number;
}

interface Folder {
  title: string;
  itemCount: number;
  locations: Location[];
}

const japanMockLocations = [
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
    latitude: 35.3606,
    longitude: 138.7274,
  },
  { 
    id: '2', 
    name: 'Kamakura',
    category: 'Historical Site', 
    rating: 4.7,
    imageUrl: require('../../assets/images/japan/kamakura.jpg'),
    sourceLink: 'lemon8.com/travel_japan',
    description: 'Great temple with giant Buddha statue',
    bookingLink: 'https://www.klook.com/en-SG/activity/2942-kamakura-buddha-day-tour-tokyo/',
    address: '4-2-28 Hase, Kamakura, Kanagawa 248-0016, Japan',
    openingHours: 'Daily: 8AM-5:30PM',
    latitude: 35.3167,
    longitude: 139.5500,
  },
  { 
    id: '3', 
    name: 'Kiyomizu Temple',
    category: 'Temple', 
    rating: 4.8,
    imageUrl: require('../../assets/images/japan/kiyomizu_temple.jpeg'),
    sourceLink: 'tiktok.com/@kyoto_guide',
    description: 'Visit during autumn for beautiful maple leaves',
    bookingLink: 'https://www.viator.com/tours/Kyoto/Kiyomizu-Temple-Tour/d332-5225KiyomizuTemple',
    address: 'Kiyomizu, Higashiyama Ward, Kyoto, 605-0862, Japan',
    latitude: 34.9948,
    longitude: 135.7850,
  },
  { 
    id: '4', 
    name: 'Sensoji Temple',
    category: 'Temple', 
    rating: 4.6,
    imageUrl: require('../../assets/images/japan/sensoji_temple.jpeg'),
    sourceLink: 'lemon8.com/tokyo_spots',
    description: 'Most visited temple in Tokyo, try the street food!',
    bookingLink: 'https://www.japan.travel/en/uk/inspiration/senso-ji-temple/',
    address: '2-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan',
    openingHours: 'Daily: 6AM-6PM (Extended hours during special seasons)',
    latitude: 35.7148,
    longitude: 139.7967,
  },
];

const cafeMockLocations = [
  {
    id: '5',
    name: 'Atlas Coffee',
    category: 'Cafe',
    rating: 4.8,
    imageUrl: require('../../assets/images/cafes/atlas_coffee.jpeg'),
    sourceLink: 'instagram.com/@coffeeguide',
    description: 'Minimalist coffee shop serving specialty brews in a cozy setting.',
    bookingLink: 'https://www.bookatable.com/sg/atlas-coffee',
    address: '1 Raffles Place, Singapore 048616',
    latitude: 1.3071,
    longitude: 103.8604,
  },
  {
    id: '6',
    name: 'Acoustic Cafe',
    category: 'Cafe',
    rating: 4.7,
    imageUrl: require('../../assets/images/cafes/acoustic_cafe.jpeg'),
    description: 'Japanese-inspired cafe known for their pour-over coffee and matcha.',
    sourceLink: 'tiktok.com/@sgcafes',
    bookingLink: 'https://www.acousticcafe.sg/reservations',
    address: '22 Bukit Pasoh Rd, Singapore 089829',
    latitude: 1.3532,
    longitude: 103.8863,
  },
  {
    id: '7',
    name: 'Cafe Gui',
    category: 'Cafe',
    rating: 4.9,
    imageUrl: require('../../assets/images/cafes/cafe_gui.jpg'),
    description: 'Artisanal coffee roastery offering carefully sourced single-origin beans.',
    sourceLink: 'instagram.com/@sgcoffee',
    bookingLink: 'https://www.cafegui.com/book',
    address: '35 Kreta Ayer Road, Singapore 089001',
    latitude: 1.2966,
    longitude: 103.8521,
  },
];

const jbMockLocations = [
  {
    id: '8',
    name: 'Hao You Dim Sum',
    category: 'Restaurant',
    rating: 4.7,
    imageUrl: require('../../assets/images/jb/hao_you.jpg'),
    description: 'Authentic dim sum restaurant serving traditional Cantonese dishes.',
    sourceLink: 'tiktok.com/@jbfood',
    bookingLink: 'https://www.chope.co/hao-you-dim-sum',
    address: 'Jalan Bestari 2/3, Taman Bestari, Johor Bahru, 81300, Malaysia',
    latitude: 1.4729,
    longitude: 103.7620,
  },
  {
    id: '9',
    name: 'Rebirth Inc',
    category: 'Fashion',
    rating: 4.5,
    imageUrl: require('../../assets/images/jb/rebirth_inc.webp'),
    description: 'Trendy fashion boutique offering unique streetwear and accessories.',
    sourceLink: 'instagram.com/@rebirthstyle',
    bookingLink: '',
    address: '123 Jalan Nong Chik, Johor Bahru, 80250, Malaysia',
    latitude: 1.4821,
    longitude: 103.7630,
  },
  {
    id: '10',
    name: 'RUD Karting',
    category: 'Entertainment',
    rating: 4.8,
    imageUrl: require('../../assets/images/jb/rud_karting.webp'),
    description: 'Exciting go-kart racing experience for all skill levels.',
    sourceLink: 'instagram.com/@rudkarting',
    bookingLink: 'https://www.rudkarting.com/book-now',
    address: 'Jalan Tun Abdul Razak, Johor Bahru, 80000, Malaysia',
    latitude: 1.4519,
    longitude: 103.7452,
  },
];

const hiddenGemsMockLocations = [
  {
    id: '11',
    name: 'Johor Lighthouse',
    category: 'Landmark',
    rating: 4.6,
    imageUrl: require('../../assets/images/hiddengem/johor_lighthouse.webp'),
    description: 'Historic lighthouse with panoramic views of the Johor Strait.',
    sourceLink: 'instagram.com/@hiddensg',
    bookingLink: 'https://www.johorlighthouse.com/reservations',
    address: 'Lighthouse Rd, Johor Bahru, 81600, Malaysia',
    latitude: 1.4239,
    longitude: 103.6593,
  },
  {
    id: '12',
    name: 'Mama Diam',
    category: 'Bar',
    rating: 4.8,
    imageUrl: require('../../assets/images/hiddengem/mama_diam_bar.webp'),
    description: 'Secret speakeasy bar with creative cocktails and vintage vibes.',
    sourceLink: 'tiktok.com/@sg_hidden',
    bookingLink: 'https://www.mamadiam.com/book',
    address: '30 Ann Siang Rd, Singapore 069700',
    latitude: 1.3084,
    longitude: 103.8477,
  },
  {
    id: '13',
    name: 'Salted Egg Rice',
    category: 'Restaurant',
    rating: 4.7,
    imageUrl: require('../../assets/images/hiddengem/salted_egg_rice.jpg'),
    description: 'Local favorite known for their signature salted egg dishes.',
    sourceLink: 'lemon8.com/sg_food',
    bookingLink: 'https://www.saltedeggrice.com/book-now',
    address: '135 Bukit Timah Rd, Singapore 229827',
    latitude: 1.3567,
    longitude: 103.9873,
  },
];


// Update mockFolders count
const mockFolders = [
  { title: 'Japan', locations: japanMockLocations },
  { title: 'Cafes', locations: cafeMockLocations },
  { title: 'JB', locations: jbMockLocations },
  { title: 'Hidden Gems', locations: hiddenGemsMockLocations },
];

interface Itinerary {
  id: string;
  activityType: string;
  numLocations: number;
  targetArea: string;
  maxRadius: number;
  createdAt: string;
}

// Mock itineraries data
const mockItineraries: Itinerary[] = [
  {
    id: '1',
    activityType: 'Food & Dining',
    numLocations: 3,
    targetArea: 'Tokyo',
    maxRadius: 5,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    activityType: 'Sightseeing',
    numLocations: 5,
    targetArea: 'Singapore',
    maxRadius: 10,
    createdAt: '2024-01-14T15:30:00Z'
  }
];

export default function PlanScreen() {
  const [selectedFolders, setSelectedFolders] = useState<Set<string>>(new Set(FOLDERS));
  const [sortByFolder, setSortByFolder] = useState(false);
  const router = useRouter();
  const [itineraries, setItineraries] = useState<Itinerary[]>(mockItineraries);

  const locations = mockFolders
    .filter(folder => selectedFolders.has(folder.title))
    .flatMap(folder => folder.locations.map(location => ({
      ...location,
      folderName: folder.title
    })));

  const sortedLocations = sortByFolder 
    ? [...locations].sort((a, b) => a.folderName.localeCompare(b.folderName))
    : locations;

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerContent}>
          <ThemedText style={styles.title}>Where to next?</ThemedText>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSortByFolder(!sortByFolder)}
          >
            <ThemedText style={styles.sortButtonText}>
              {sortByFolder ? "Default Order" : "Sort by Folder"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.itinerarySection}>
        <ThemedView style={styles.itineraryHeader}>
          <ThemedText style={styles.sectionTitle}>My Itineraries</ThemedText>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/CreateItinerary')}
          >
            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
            <ThemedText style={styles.addButtonText}>Add Itinerary</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.itineraryScroll}
        >
          {itineraries.map((itinerary) => (
            <TouchableOpacity
              key={itinerary.id}
              style={styles.itineraryCard}
              onPress={() => console.log('View itinerary:', itinerary.id)}
            >
              <ThemedView style={styles.itineraryContent}>
                <ThemedText style={styles.itineraryType}>{itinerary.activityType}</ThemedText>
                <ThemedText style={styles.itineraryArea}>{itinerary.targetArea}</ThemedText>
                <ThemedText style={styles.itineraryDetails}>
                  {itinerary.numLocations} locations • {itinerary.maxRadius}km radius
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.folderFilter}>
        {FOLDERS.map((folder) => (
          <TouchableOpacity
            key={folder}
            onPress={() => setSelectedFolders(prev => {
              const newSet = new Set(prev);
              if (newSet.has(folder)) {
                newSet.delete(folder);
              } else {
                newSet.add(folder);
              }
              return newSet;
            })}
            style={[
              styles.folderChip,
              selectedFolders.has(folder) && styles.folderChipSelected
            ]}
          >
            <ThemedText style={[
              styles.folderText,
              selectedFolders.has(folder) && styles.folderTextSelected
            ]}>
              {folder}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.locationsContainer} contentContainerStyle={styles.locationsContentContainer}>
        {sortedLocations.map(location => (
          <LongPlanLocationCard
            key={location.id}
            id={location.id}
            name={location.name}
            address={location.address}
            category={location.category}
            rating={location.rating}
            imageUrl={location.imageUrl}
            sourceLink={location.sourceLink}
            description={location.description}
            latitude={location.latitude}
            longitude={location.longitude}
            bookingLink={location.bookingLink}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 50,
  },
  itinerarySection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itineraryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 4,
  },
  itineraryScroll: {
    paddingLeft: 16,
  },
  itineraryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    width: 220,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  itineraryContent: {
    gap: 8,
  },
  itineraryType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  itineraryArea: {
    fontSize: 16,
    color: '#333',
  },
  itineraryDetails: {
    fontSize: 14,
    color: '#666',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 15,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  folderFilter: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexGrow: 0,
  },
  folderChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  folderChipSelected: {
    backgroundColor: '#007AFF',
  },
  folderText: {
    fontSize: 16,
    color: '#333',
  },
  folderTextSelected: {
    color: '#fff',
  },
  locationsContainer: {
    flex: 1,
    height: 200,
  },
  locationsContentContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});