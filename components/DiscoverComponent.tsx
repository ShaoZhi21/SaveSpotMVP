import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, TouchableOpacity, Text, ImageBackground, View } from 'react-native';
import { useRouter } from 'expo-router';

const DiscoverMore: React.FC = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/Location');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <ThemedView style={styles.discoverContainer}>
        <ImageBackground 
          source={require('../assets/images/japan/kamakura.jpg')} 
          style={styles.image}
          resizeMode="cover"
        />
        <ThemedText style={styles.locationTitle}>Kamakura, Japan</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  discoverContainer: {
    width: '85%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'visible',
  },
  image: {
    width: '100%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default DiscoverMore;