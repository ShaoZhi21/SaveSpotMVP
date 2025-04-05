import React, { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Dimensions, ScrollView, PanResponder, Animated, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import LocationPreviewCard from '../../components/LocationPreviewCard';
import { Ionicons } from '@expo/vector-icons';

interface MapProps {
  locations?: Array<{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    description?: string;
    imageUrl?: string | any;
    rating?: number;
    address?: string;
  }>;
  onLocationSelect?: (location: { latitude: number; longitude: number }) => void;
}

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
  { title: 'Hidden Gems', itemCount: 3, locations: hiddenGemsMockLocations }, // Updated count to 3
];

export default function Map({ locations: propLocations = [], onLocationSelect }: MapProps) {
  const params = useLocalSearchParams();
  // Combine all locations from mockFolders if no specific locations are provided
  const locations = params.locations 
    ? JSON.parse(params.locations as string) 
    : propLocations.length > 0 
      ? propLocations 
      : mockFolders.flatMap(folder => folder.locations);
  
  // Get the selected location from params if coming from Location.tsx
  const selectedLocationFromParams = params.locations ? JSON.parse(params.locations as string)[0] : null;
  const initialRegion = selectedLocationFromParams ? {
    latitude: selectedLocationFromParams.latitude,
    longitude: selectedLocationFromParams.longitude,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  } : {
    latitude: 1.3521,  // Default to Singapore coordinates
    longitude: 103.8198,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  };
  const [region, setRegion] = useState({
    latitude: 1.3521,  
    longitude: 103.8198,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  });
  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<{ [key: string]: any }>({});
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          try {
            const location = await Location.getCurrentPositionAsync({});
            setRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          } catch (error) {
            // Fallback to Bugis if getting position fails
            setRegion({
              latitude: 1.3008,  // Bugis
              longitude: 103.8555,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121,
            });
          }
        } else {
          // Default to Bugis if permission not granted
          setRegion({
            latitude: 1.3008,  // Bugis
            longitude: 103.8555,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          });
        }
      } catch (error) {
        // Final fallback to Bugis if any other error occurs
        setRegion({
          latitude: 1.3008,  // Bugis
          longitude: 103.8555,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        });
      }
    })();
  }, []);

  const handleMapPress = (event: any) => {
    if (onLocationSelect) {
      onLocationSelect(event.nativeEvent.coordinate);
    }
    setSelectedLocation(null);
  };

  
  // Update handleLocationSelect
  const handleLocationSelect = (latitude: number, longitude: number, locationId: string) => {
    const screenHeight = Dimensions.get('window').height;
    const mapHeight = screenHeight * 0.65;
    const latitudeOffset = (region.latitudeDelta * (mapHeight - screenHeight / 2)) / screenHeight;
  
    const animateMap = () => {
      return new Promise<void>((resolve) => {
        mapRef.current?.animateToRegion({
          latitude: latitude - latitudeOffset,
          longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }, 1000);
        
        // Ensure animation completes
        setTimeout(resolve, 1200);
      });
    };
  
    // Execute animation and show callout
    animateMap().then(() => {
      setSelectedLocation(locationId);
      setTimeout(() => {
        markerRefs.current[locationId]?.showCallout();
      }, 300);
    });
  };
  


  // Rename the button handler and update to get current location
  const handleGoToCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      }, 1000);
    } catch (error) {
      // Fallback to Bugis if location access fails
      mapRef.current?.animateToRegion({
        latitude: 1.3008,
        longitude: 103.8555,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      }, 1000);
    }
  };
  

  return (
    <ThemedView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}
        showsUserLocation
        showsMyLocationButton
      >
        {locations.map((location) => (
          <Marker
            ref={ref => markerRefs.current[location.id] = ref}
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor={selectedLocation === location.id ? '#FF3B30' : '#007AFF'}
          >
            <Callout>
              <ThemedView style={styles.callout}>
                <ThemedView style={styles.calloutHeader}>
                  <ThemedText style={styles.calloutTitle}>{location.name}</ThemedText>
                  {location.rating && (
                    <ThemedView style={styles.calloutRating}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <ThemedText style={styles.calloutRatingText}>{location.rating.toFixed(1)}</ThemedText>
                    </ThemedView>
                  )}
                </ThemedView>
                {location.address && (
                  <ThemedView style={styles.calloutAddress}>
                    <ThemedText style={styles.calloutAddressText}>{location.address}</ThemedText>
                  </ThemedView>
                )}
                {location.description && (
                  <ThemedText style={styles.calloutDescription} numberOfLines={2}>
                    {location.description}
                  </ThemedText>
                )}
              </ThemedView>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.singaporeButton} onPress={handleGoToCurrentLocation}>
        <Ionicons name="paper-plane" size={24} color="#007AFF" />
      </TouchableOpacity>
      <ThemedView style={styles.bottomContainer}>
        <ThemedView style={styles.bottomContent}>
          <ThemedText style={styles.bottomTitle}>Locations</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.previewScroll}>
            {locations.map((location) => (
              <LocationPreviewCard
              key={location.id}
              id={location.id}
              name={location.name}
              imageUrl={location.imageUrl}
              latitude={location.latitude}
              longitude={location.longitude}
              rating={location.rating}
              onLocationSelect={(lat, lng) => handleLocationSelect(lat, lng, location.id)}
            />
            ))}
          </ScrollView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  callout: {
    padding: 12,
    borderRadius: 8,
    minWidth: 200,
    maxWidth: 300,
    backgroundColor: '#fff',
  },
  calloutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  calloutRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calloutRatingText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
    color: '#666',
  },
  calloutAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  calloutAddressText: {
    fontSize: 13,
    color: '#999',
    flex: 1,
  },
  calloutDescription: {
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
  },
  singaporeButton: {
    position: 'absolute',
    right: 16,
    bottom: '37%',
    backgroundColor: '#fff',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomContent: {
    padding: 20,
    flex: 1,
  },
  bottomTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
  },
  previewScroll: {
    marginTop: 10,
  },
});
