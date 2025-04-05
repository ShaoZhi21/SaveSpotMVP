import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, View, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import LongPlanItineraryLocationCard from '@/components/LongPlanItineraryLocationCard';
import ScheduleLocationCard from '@/components/ScheduleLocationCard';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const ACTIVITY_TYPES = [
  'Sightseeing',
  'Food & Dining',
  'Shopping',
  'Nature & Parks',
  'Cultural',
  'Entertainment',
];

const japanMockLocations = [
    { 
      id: '1', 
      name: 'Mount Fuji',
      category: 'Scenery', 
      rating: 4.9, 
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
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
      imageUrl: require('../assets/images/japan/kamakura.jpg'),
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
      imageUrl: require('../assets/images/japan/kiyomizu_temple.jpeg'),
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
      imageUrl: require('../assets/images/japan/sensoji_temple.jpeg'),
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
      imageUrl: require('../assets/images/cafes/atlas_coffee.jpeg'),
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
      imageUrl: require('../assets/images/cafes/acoustic_cafe.jpeg'),
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
      imageUrl: require('../assets/images/cafes/cafe_gui.jpg'),
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
      imageUrl: require('../assets/images/jb/hao_you.jpg'),
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
      imageUrl: require('../assets/images/jb/rebirth_inc.webp'),
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
      imageUrl: require('../assets/images/jb/rud_karting.webp'),
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
      imageUrl: require('../assets/images/hiddengem/johor_lighthouse.webp'),
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
      imageUrl: require('../assets/images/hiddengem/mama_diam_bar.webp'),
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
      imageUrl: require('../assets/images/hiddengem/salted_egg_rice.jpg'),
      description: 'Local favorite known for their signature salted egg dishes.',
      sourceLink: 'lemon8.com/sg_food',
      bookingLink: 'https://www.saltedeggrice.com/book-now',
      address: '135 Bukit Timah Rd, Singapore 229827',
      latitude: 1.3567,
      longitude: 103.9873,
    },
  ];

const mockFolders = [
  { title: 'Japan', locations: japanMockLocations },
  { title: 'Cafes', locations: cafeMockLocations },
  { title: 'JB', locations: jbMockLocations },
  { title: 'Hidden Gems', locations: hiddenGemsMockLocations },
];

const FOLDERS = ['Japan', 'Cafes', 'JB', 'Hidden Gems'];

export default function CreateItineraryScreen() {
  const router = useRouter();
  const [activityType, setActivityType] = useState<Set<string>>(new Set());
  const [numLocations, setNumLocations] = useState('');
  const [targetArea, setTargetArea] = useState('');
  const [maxRadius, setMaxRadius] = useState('');
  const [selectedFolders, setSelectedFolders] = useState<Set<string>>(new Set());
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [itineraryTitle, setItineraryTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  // Update handleCreateItinerary to include the title
  const handleCreateItinerary = () => {
    const newItinerary = {
      title: itineraryTitle || 'New Itinerary',  // Use input title or default
      locations: selectedLocations,
      activityType,
      numLocations: parseInt(numLocations),
      targetArea,
      maxRadius: parseInt(maxRadius),
    };
    
    router.back();
  };


  return (
    <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}    
        />
      <ThemedView style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Create Itinerary</ThemedText>
      </ThemedView>

      <ScrollView style={styles.content}>
        <ThemedView style={styles.scheduleSection}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Schedule</ThemedText>
            <TouchableOpacity
              onPress={() => setSelectedLocations([])}
              style={styles.clearButton}
            >
              <Ionicons name="trash-outline" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </ThemedView>
          <ThemedView style={styles.scheduleContent}>
            {selectedLocations.length > 0 ? (
              selectedLocations.map((location) => (
                <ScheduleLocationCard key={location.id} {...location} />
              ))
            ) : (
              <ThemedText>No locations added yet</ThemedText>
            )}
          </ThemedView>
        </ThemedView>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateItinerary}
        >
          <ThemedText style={styles.createButtonText}>Create Itinerary</ThemedText>
        </TouchableOpacity>
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Choose Locations from your Saved</ThemedText>
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
          
          <View style={styles.locationsList}>
            {mockFolders
              .filter(folder => selectedFolders.has(folder.title))
              .map(folder => folder.locations
                .filter(location => !selectedLocations.some(sel => sel.id === location.id))
                .map(location => (
                  <TouchableOpacity
                    key={location.id}
                    onPress={() => {
                      setSelectedLocations(prev => [...prev, location]);
                    }}
                  >
                    <LongPlanItineraryLocationCard {...location} />
                  </TouchableOpacity>
                )))
            }
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scheduleSection: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  clearButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  scheduleContent: {
    marginTop: 12,
    gap: 12,
  },
  folderFilter: {
    marginBottom: 14,
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
  locationsList: {
    marginTop: 12,
  },
  scheduleList: {
    marginTop: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scheduleNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleLocation: {
    flex: 1,
  },
  removeButton: {
    marginLeft: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  activityTypes: {
    flexGrow: 0,
    marginBottom: 16,
  },
  activityChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  activityChipSelected: {
    backgroundColor: '#007AFF',
  },
  activityChipText: {
    fontSize: 16,
    color: '#333',
  },
  activityChipTextSelected: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16, // Add this line to add space below the button
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  rowInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    width: '100%',
  },
  generateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 0,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // remove borderWidth
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginLeft: 16,
  },
  sectionTitleDate: {
    fontSize: 18,
    fontWeight: '600',
    width: 100,

    // remove marginBottom since it's in a row layout
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    flex: 1,
    marginLeft: 16,
  },
  datePickerText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
});
