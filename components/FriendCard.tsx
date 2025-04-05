import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import LocationPreviewCard from './LocationPreviewCard';
import { Ionicons } from '@expo/vector-icons';

interface FriendCardProps {
  id: string;
  name: string;
  avatar: string;
  recentLocations: {
    id: string;
    name: string;
    image: string;
    address: string;
  }[];
  onPress: () => void;
  onMessage?: () => void;
}

export default function FriendCard({ id, name, avatar, recentLocations, onPress, onMessage }: FriendCardProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileSection} onPress={onPress}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.placeholderAvatar]}>
              <Ionicons name="person" size={24} color="#999" />
            </View>
          )}
          <ThemedText style={styles.name}>{name}</ThemedText>
          <View style={styles.iconContainer}>
            <Ionicons name="ellipse" size={8} color="#999" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onMessage} style={styles.messageButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.locationsContainer}
        contentContainerStyle={styles.locationsContent}
      >
        {recentLocations.map((location) => (
          <LocationPreviewCard
            key={location.id}
            id={location.id}
            name={location.name}
            imageUrl={location.image}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 12,
  },
  placeholderAvatar: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
  messageButton: {
    padding: 8,
  },
  locationsContainer: {
    flexGrow: 0,
  },
  locationsContent: {
    paddingRight: 15,
  },
});