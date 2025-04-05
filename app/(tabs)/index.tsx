import { StyleSheet, Platform, Button, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DiscoverMore from '@/components/DiscoverComponent';
import FolderCard from '@/components/FolderCard';
import { useRouter } from 'expo-router'; 
import AddFloatingButton from '@/components/AddFloatingButton';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import { useLocalSearchParams } from 'expo-router';

// Types
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
  { title: 'Japan', itemCount: 4, locations: japanMockLocations },
  { title: 'Cafes', itemCount: 3, locations: cafeMockLocations },
  { title: 'JB', itemCount: 3, locations: jbMockLocations },
  { title: 'Hidden Gems', itemCount: 3, locations: hiddenGemsMockLocations },
];

export default function HomeScreen() {
  const router = useRouter();
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [folders, setFolders] = useState(mockFolders);

  // Handle new locations from AddLocation screen
  const params = useLocalSearchParams();
  useEffect(() => {
    if (params.newLocations && params.targetFolder) {
      const newLocations = JSON.parse(params.newLocations as string);
      const targetFolder = params.targetFolder as string;

      setFolders(prevFolders => {
        return prevFolders.map(folder => {
          if (folder.title === targetFolder) {
            return {
              ...folder,
              locations: [...folder.locations, ...newLocations],
              itemCount: folder.itemCount + newLocations.length
            };
          }
          return folder;
        });
      });
    }
  }, [params.newLocations, params.targetFolder]);
  
  // Fetch food locations from API
  /*useEffect(() => {
    const fetchFoodLocations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://c89b-137-132-26-40.ngrok-free.app/folders/Food');
        if (!response.ok) {
          throw new Error('Failed to fetch food locations');
        }
        const data = await response.json();
        console.log('Fetched food locations:', data);
        setMockFoodFolder(data);
      } catch (error) {
        console.error('Error fetching food locations:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchFoodLocations();
  }, []);*/

  const handleSort = (sortType: 'recent' | 'alphabetical' | 'items') => {
    let sortedFolders = [...folders];
    
    switch (sortType) {
      case 'alphabetical':
        sortedFolders.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'items':
        sortedFolders.sort((a, b) => b.itemCount - a.itemCount);
        break;
      case 'recent':
        // For demo, just reverse the current order
        sortedFolders.reverse();
        break;
    }
    
    setFolders(sortedFolders);
    setIsSortMenuVisible(false);
  };


  // Update the handleFolderPress function
  const handleFolderPress = (folder: Folder) => {
    router.push({
      pathname: '/Folder',  // Remove the (tabs)/ prefix
      params: { 
        title: folder.title,
        locations: JSON.stringify(folder.locations)
      }
    });
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView style={styles.container}>
        <ThemedView style={styles.topContainer}>
          <ThemedView style={styles.headerRow}>
              <ThemedView style={styles.logoContainer}>
                <ThemedText style={styles.logoTextTop}>Save</ThemedText>
                <ThemedText style={styles.logoTextBottom}>Spot</ThemedText>
              </ThemedView>
              <SearchBar 
                style={styles.searchBar}
                locations={folders.flatMap(folder => folder.locations)}
              />
              <TouchableOpacity  onPress={() => router.push("/Profile")} style={styles.profileButton}>
                <Ionicons name="person-circle-outline" size={32} color="#333" />
              </TouchableOpacity>
          </ThemedView>

          <ThemedView style={styles.sectionTitleContainer}>
            <ThemedText style={styles.sectionTitle}>Discover More</ThemedText>
            <Ionicons name="search-outline" size={18} style={styles.sectionIcon} />
          </ThemedView>
          <DiscoverMore />
        </ThemedView>

        <ThemedView style={styles.foldersContainer}>
          <ThemedView style={styles.savedPlacesTitleContainer}>
            <ThemedText style={styles.savedPlacesTitle}>Saved Places</ThemedText>
            <Ionicons name="bookmark" size={22} color="#333" />
            <TouchableOpacity 
              style={styles.sortButton}
              onPress={() => setIsSortMenuVisible(!isSortMenuVisible)}
            >
              <Ionicons name="funnel-outline" size={20} color="#666" />
            </TouchableOpacity>
            {isSortMenuVisible && (
              <ThemedView style={styles.sortMenu}>
                <TouchableOpacity style={styles.sortOption} onPress={() => handleSort('recent')}>
                  <ThemedText style={{ color: '#333' }}>Recent</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortOption} onPress={() => handleSort('alphabetical')}>
                  <ThemedText style={{ color: '#333' }}>Alphabetical</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortOption} onPress={() => handleSort('items')}>
                  <ThemedText style={{ color: '#333' }}>Number of Items</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            )}
          </ThemedView>
          {folders.map((folder, index) => (
            <FolderCard 
              key={index}
              title={folder.title}
              itemCount={folder.itemCount}
              locations={folder.locations}
              onPress={() => handleFolderPress(folder)}
            />
          ))}
        </ThemedView>
      </ScrollView>
      <AddFloatingButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  topContainer: {
    width: '100%', 
    height: 270,
    backgroundColor: '#fff', 
    justifyContent: 'flex-start',   
    alignItems: 'center',  
    gap: 8, 
    zIndex: 1,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    marginTop: 0,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  sectionIcon: {
    marginLeft: 8,
    color: '#666',
  },
  left: {
    backgroundColor: '#fff', 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '85%',
    height: 20,
    marginBottom: -10,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    zIndex: 1,
  },
  folderCard: {
    marginBottom: 15,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  foldersContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#ffffff',  // Standardized white color
    paddingTop: 10,
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 12,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
  },
  logoTextTop: {
    fontSize: 16,
    fontWeight: 'bold', 
    color: '#007AFF',
  },
  logoTextBottom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: -4,
  },
  profileButton: {
    padding: 4,
    width: '15%',
  },
  searchBar: {
    flex: 1,
    marginRight: 8,
  },
  savedPlacesTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    width: '85%',
    zIndex: 10,
  },
  savedPlacesTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 8,
    color: '#333',
  },
  sortButton: {
    marginLeft: 'auto',
    padding: 8,
  },
  sortMenu: {
    position: 'absolute',
    right: 0,
    top: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
  },
  sortOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

