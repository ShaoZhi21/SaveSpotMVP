import { StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import VisitLink from '@/components/VisitLink';
import ViewLocation from '@/components/ViewLocation';
import { router, useRouter } from 'expo-router';
import BookLocation from '@/components/BookLocation';

const SIMILAR_LOCATIONS = {
  'Restaurant': [
    {
      id: 'r1',
      name: 'Burnt Ends',
      category: 'Restaurant',
      rating: 4.9,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Modern Australian barbecue restaurant.',
      sourceLink: 'burntends.com.sg',
      bookingLink: 'https://www.burntends.com.sg/reservations'
    },
    {
      id: 'r2',
      name: 'Odette',
      category: 'Restaurant',
      rating: 4.9,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Three Michelin starred French restaurant.',
      sourceLink: 'odetterestaurant.com',
      bookingLink: 'https://www.odetterestaurant.com/reservations'
    },
    {
      id: 'r3',
      name: 'Labyrinth',
      category: 'Restaurant',
      rating: 4.8,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Innovative local cuisine with a modern twist.',
      sourceLink: 'restaurantlabyrinth.com',
      bookingLink: 'https://www.restaurantlabyrinth.com/reservations'
    }
  ],

  'Fashion': [
    {
      id: 'f1',
      name: 'Dover Street Market',
      category: 'Fashion',
      rating: 4.7,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Trendy multi-brand concept store.',
      sourceLink: 'doverstreetmarket.com'
    },
    {
      id: 'f2',
      name: 'ION Orchard',
      category: 'Fashion',
      rating: 4.6,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Upscale shopping mall with designer brands.',
      sourceLink: 'ionorchard.com'
    },
    {
      id: 'f3',
      name: 'Bugis Street',
      category: 'Fashion',
      rating: 4.4,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Affordable fashion and streetwear hotspot.',
      sourceLink: 'visitsingapore.com'
    }
  ],

  'Entertainment': [
    {
      id: 'e1',
      name: 'Marina Bay Sands SkyPark',
      category: 'Entertainment',
      rating: 4.8,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Skyline views and light shows.',
      sourceLink: 'marinabaysands.com'
    },
    {
      id: 'e2',
      name: 'Universal Studios Singapore',
      category: 'Entertainment',
      rating: 4.7,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Theme park with movie-themed rides.',
      sourceLink: 'rwsentosa.com'
    },
    {
      id: 'e3',
      name: 'ArtScience Museum',
      category: 'Entertainment',
      rating: 4.6,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Futuristic exhibits on science and art.',
      sourceLink: 'marinabaysands.com'
    }
  ],

  'Cafe': [
    {
      id: 'c1',
      name: 'Tiong Bahru Bakery',
      category: 'Cafe',
      rating: 4.5,
      imageUrl: require('../assets/images/cafes/tiong_bahru_bakery.jpeg'),
      description: 'Artisanal pastries and coffee.',
      sourceLink: 'tiongbahrubakery.com'
    },
    {
      id: 'c2',
      name: 'Symmetry',
      category: 'Cafe',
      rating: 4.6,
      imageUrl: require('../assets/images/cafes/symmetry_cafe.jpeg'),
      description: 'Aussie-style cafe with brunch vibes.',
      sourceLink: 'symmetry.sg'
    },
    {
      id: 'c3',
      name: 'Atlas Coffeehouse',
      category: 'Cafe',
      rating: 4.4,
      imageUrl: require('../assets/images/cafes/atlas_coffee.jpeg'),
      description: 'Modern cafe with strong cold brew.',
      sourceLink: 'atlascoffeehouse.com'
    }
  ],

  'Temple': [
    {
      id: 't1',
      name: 'Buddha Tooth Relic Temple',
      category: 'Temple',
      rating: 4.7,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Beautiful Buddhist temple in Chinatown.',
      sourceLink: 'visitsingapore.com'
    },
    {
      id: 't2',
      name: 'Thian Hock Keng Temple',
      category: 'Temple',
      rating: 4.5,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Oldest Chinese temple in Singapore.',
      sourceLink: 'visitsingapore.com'
    },
    {
      id: 't3',
      name: 'Sri Mariamman Temple',
      category: 'Temple',
      rating: 4.6,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Oldest Hindu temple in Singapore.',
      sourceLink: 'visitsingapore.com'
    }
  ],

  'Scenery': [
    {
      id: 's1',
      name: 'Mount Takao',
      category: 'Scenery',
      rating: 4.7,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Popular hiking spot with stunning views of Tokyo.',
      sourceLink: 'japan-guide.com',
      address: 'Takaomachi, Hachioji, Tokyo 193-0844, Japan',
      openingHours: 'Trails open 24/7, Cable car: 8AM-5:45PM'
    },
    {
      id: 's2',
      name: 'Lake Kawaguchiko',
      category: 'Scenery',
      rating: 4.8,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'One of the Fuji Five Lakes with perfect Mt. Fuji views.',
      sourceLink: 'fujisan.ne.jp',
      address: 'Fujikawaguchiko, Minamitsuru District, Yamanashi, Japan',
      openingHours: '24/7'
    },
    {
      id: 's3',
      name: 'Arashiyama Bamboo Grove',
      category: 'Scenery',
      rating: 4.7,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Peaceful bamboo forest in Kyoto.',
      sourceLink: 'japan.travel',
      address: 'Ukyo Ward, Kyoto, Japan',
      openingHours: '24/7'
    }
  ],

  'Landmark': [
    {
      id: 'l1',
      name: 'Merlion Park',
      category: 'Landmark',
      rating: 4.6,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Iconic Singapore symbol at Marina Bay.',
      sourceLink: 'visitsingapore.com'
    },
    {
      id: 'l2',
      name: 'Gardens by the Bay',
      category: 'Landmark',
      rating: 4.9,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Futuristic gardens with Supertrees.',
      sourceLink: 'gardensbythebay.com.sg'
    },
    {
      id: 'l3',
      name: 'The Helix Bridge',
      category: 'Landmark',
      rating: 4.5,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Double-helix pedestrian bridge near Marina Bay.',
      sourceLink: 'visitsingapore.com'
    }
  ],

  'Bar': [
    {
      id: 'b1',
      name: 'Atlas Bar',
      category: 'Bar',
      rating: 4.8,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Art Deco bar with a massive gin collection.',
      sourceLink: 'atlasbar.sg'
    },
    {
      id: 'b2',
      name: '28 HongKong Street',
      category: 'Bar',
      rating: 4.7,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'Hidden bar with award-winning cocktails.',
      sourceLink: '28hks.com'
    },
    {
      id: 'b3',
      name: 'Manhattan Bar',
      category: 'Bar',
      rating: 4.8,
      imageUrl: require('../assets/images/japan/mount_fuji.jpeg'),
      description: 'New York-inspired bar with barrel-aged cocktails.',
      sourceLink: 'regentsingapore.com.sg'
    }
  ]
};


export default function LocationScreen() {
  const params = useLocalSearchParams();
  const locationData = {
    id: params.id as string,
    name: params.name as string,
    category: params.category as string,
    rating: parseFloat(params.rating as string),
    description: params.description as string,
    imageUrl: params.imageUrl ? JSON.parse(params.imageUrl as string) : null,
    sourceLink: params.sourceLink as string,
    bookingLink: params.bookingLink as string,
    address: params.address as string,
    openingHours: params.openingHours as string,
    latitude: params.latitude ? Number(params.latitude) : 1.3521,
    longitude: params.longitude ? Number(params.longitude) : 103.8198,
  };

  // Add this console.log to debug
  console.log('Location Data:', {
    latitude: locationData.latitude,
    longitude: locationData.longitude,
  });

  const handleBooking = () => {
    if (locationData.bookingLink) {
      Linking.openURL(locationData.bookingLink);
    }
  };

  const handleSource = () => {
    if (locationData.sourceLink) {
      Linking.openURL(`https://${locationData.sourceLink}`);
    }
  };

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      <ScrollView>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.imageContainer}>
            {locationData.imageUrl ? (
              <Image source={locationData.imageUrl} style={styles.image} resizeMode="cover" />
            ) : (
              <ThemedView style={styles.imagePlaceholder}>
                <ThemedText>No Image</ThemedText>
              </ThemedView>
            )}
            <ThemedView style={styles.overlay}>
              <ThemedView style={styles.categoryBadge}>
                <ThemedText style={styles.category}>{locationData.category}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.ratingBadge}>
                <ThemedText style={styles.rating}>★ {locationData.rating.toFixed(1)}</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.contentContainer}>
            <ThemedView style={styles.nameContainer}>
              <ThemedText type="title" style={styles.name}>{locationData.name}</ThemedText>
              <ThemedView style={styles.partnerTag}>
                <ThemedText style={styles.partnerText}>Partner</ThemedText>
              </ThemedView>
            </ThemedView>
            
            {locationData.description && (
              <ThemedText style={styles.description}>{locationData.description}</ThemedText>
            )}

            <ThemedView style={styles.infoContainer}>
              {locationData.openingHours && (
                <ThemedView style={styles.infoHalf}>
                  <Ionicons name="time-outline" size={18} color="#666" />
                  <ThemedText style={styles.infoLabel}>Opening Hours</ThemedText>
                  <ThemedText style={styles.infoText}>{locationData.openingHours}</ThemedText>
                </ThemedView>
              )}
              {locationData.address && (
                <ThemedView style={styles.infoHalf}>
                  <Ionicons name="location-outline" size={18} color="#666" />
                  <ThemedText style={styles.infoLabel}>Address</ThemedText>
                  <ThemedText style={styles.infoText}>{locationData.address}</ThemedText>
                </ThemedView>
              )}
            </ThemedView>

              <ThemedView style={styles.actionButtons}>
                <VisitLink url={locationData.sourceLink} style={styles.halfButton} />
                <ViewLocation 
                  locationName={locationData.name}
                  latitude={locationData.latitude}    // This is a number from Number(params.latitude)
                  longitude={locationData.longitude}  // This is a number from Number(params.longitude)
                  description={locationData.description}
                  address={locationData.address}
                  rating={locationData.rating}
                  imageUrl={locationData.imageUrl}
                  style={styles.halfButton}
                />
              </ThemedView>
            {locationData.bookingLink && (
              <ThemedView>
                <BookLocation bookingLink={locationData.bookingLink} />
                <ThemedView style={styles.discountContainer}>
                  <ThemedText style={styles.discountText}>10% off discount</ThemedText>
                  <TouchableOpacity 
                    style={styles.qrButton}
                    onPress={() => router.push('/QRCode')}
                  >
                    <Ionicons name="qr-code-outline" size={24} color="#007AFF" />
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            )}
          <ThemedView style={styles.suggestedSection}>
            <ThemedText style={styles.suggestedTitle}>Similar Places</ThemedText>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.folderScroll}
            >
              {SIMILAR_LOCATIONS[locationData.category]?.map(location => (
                <TouchableOpacity key={location.id} style={styles.folderCard}>
                  <Image source={location.imageUrl} style={styles.folderImage} />
                  <ThemedView style={styles.folderContent}>
                    <ThemedView style={styles.folderHeader}>
                      <ThemedText style={styles.folderName}>{location.name}</ThemedText>
                      <ThemedText style={styles.folderOwner}>{location.category}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.folderStats}>
                      <ThemedText style={[styles.statText, { color: '#FFD700' }]}>★ {location.rating}</ThemedText>
                      <ThemedText style={styles.statText}>{location.sourceLink}</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ThemedView>
        </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  partnerTag: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  partnerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  discountText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  qrButton: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 10,
    zIndex: 10,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'transparent',
  },
  categoryBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  rating: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '700',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e1e1',
  },
  contentContainer: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 20,
  },
  actionButtons: {
    gap: 12,
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  suggestedSection: {
    marginTop: 20,
  },
  suggestedTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  folderScroll: {
    paddingHorizontal: 16,
    marginHorizontal: -16,
  },
  folderCard: {
    width: 200,
    height: 260,
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
    height: 130,
    backgroundColor: '#f0f0f0',
  },
  folderContent: {
    padding: 10,
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
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  halfButton: {
    width: '50%',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
  },
  infoHalf: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});