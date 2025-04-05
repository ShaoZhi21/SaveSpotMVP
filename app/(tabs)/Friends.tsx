import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FriendCard from '@/components/FriendCard';
import SearchFriends from '@/components/SearchFriends';

type Friend = {
  id: string;
  name: string;
  avatar: string;
  recentLocations: {
    id: string;
    name: string;
    image: string;
    address: string;
  }[];
};

const MOCK_FRIENDS = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://picsum.photos/200?random=1',
    recentLocations: [
      { id: '1', name: 'Blue Bottle Coffee', image: 'https://picsum.photos/200?random=2', address: '123 Main St' },
      { id: '2', name: 'Tartine Bakery', image: 'https://picsum.photos/200?random=3', address: '456 Market St' },
    ]
  },
  {
    id: '2',
    name: 'Mike Johnson',
    avatar: 'https://picsum.photos/200?random=4',
    recentLocations: [
      { id: '3', name: 'Golden Gate Park', image: 'https://picsum.photos/200?random=5', address: 'San Francisco' },
      { id: '4', name: 'Ferry Building', image: 'https://picsum.photos/200?random=6', address: '1 Ferry Building' },
    ]
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://picsum.photos/200?random=7',
    recentLocations: [
      { id: '5', name: 'The Exploratorium', image: 'https://picsum.photos/200?random=8', address: 'Pier 15' },
      { id: '6', name: 'California Academy of Sciences', image: 'https://picsum.photos/200?random=9', address: 'Golden Gate Park' },
    ]
  },
  {
    id: '4',
    name: 'David Park',
    avatar: 'https://picsum.photos/200?random=10',
    recentLocations: [
      { id: '7', name: 'Lands End Trail', image: 'https://picsum.photos/200?random=11', address: 'Lands End' },
      { id: '8', name: 'Palace of Fine Arts', image: 'https://picsum.photos/200?random=12', address: '3601 Lyon St' },
    ]
  },
  {
    id: '5',
    name: 'Lisa Zhang',
    avatar: 'https://picsum.photos/200?random=13',
    recentLocations: [
      { id: '9', name: 'Japanese Tea Garden', image: 'https://picsum.photos/200?random=14', address: '75 Hagiwara Tea Garden Dr' },
      { id: '10', name: 'Ghirardelli Square', image: 'https://picsum.photos/200?random=15', address: '900 North Point St' },
    ]
  }
];

export default function Community() {
  const [friends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://picsum.photos/200?random=1',
      recentLocations: [
        { id: '1', name: 'Blue Bottle Coffee', image: 'https://picsum.photos/200?random=2', address: '123 Main St' },
        { id: '2', name: 'Tartine Bakery', image: 'https://picsum.photos/200?random=3', address: '456 Market St' },
      ]
    },
    {
      id: '2',
      name: 'Mike Johnson',
      avatar: 'https://picsum.photos/200?random=4',
      recentLocations: [
        { id: '3', name: 'Golden Gate Park', image: 'https://picsum.photos/200?random=5', address: 'San Francisco' },
        { id: '4', name: 'Ferry Building', image: 'https://picsum.photos/200?random=6', address: '1 Ferry Building' },
      ]
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://picsum.photos/200?random=7',
      recentLocations: [
        { id: '5', name: 'The Exploratorium', image: 'https://picsum.photos/200?random=8', address: 'Pier 15' },
        { id: '6', name: 'California Academy of Sciences', image: 'https://picsum.photos/200?random=9', address: 'Golden Gate Park' },
      ]
    },
    {
      id: '4',
      name: 'David Park',
      avatar: 'https://picsum.photos/200?random=10',
      recentLocations: [
        { id: '7', name: 'Lands End Trail', image: 'https://picsum.photos/200?random=11', address: 'Lands End' },
        { id: '8', name: 'Palace of Fine Arts', image: 'https://picsum.photos/200?random=12', address: '3601 Lyon St' },
      ]
    },
    {
      id: '5',
      name: 'Lisa Zhang',
      avatar: 'https://picsum.photos/200?random=13',
      recentLocations: [
        { id: '9', name: 'Japanese Tea Garden', image: 'https://picsum.photos/200?random=14', address: '75 Hagiwara Tea Garden Dr' },
        { id: '10', name: 'Ghirardelli Square', image: 'https://picsum.photos/200?random=15', address: '900 North Point St' },
      ]
    },
  ]);

  const handleSearch = (query: string) => {
    // Implement search logic
    console.log('Search query:', query);
  };

  const handleAddFriend = (userId: string) => {
    // Implement add friend logic
    console.log('Add friend:', userId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Community',
          headerLargeTitle: true,
        }}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <SearchFriends onSearch={handleSearch} onAddFriend={handleAddFriend} />
        {friends.map((friend) => (
          <FriendCard
            key={friend.id}
            id={friend.id}
            name={friend.name}
            avatar={friend.avatar}
            recentLocations={friend.recentLocations}
            onPress={() => console.log('Friend pressed:', friend.name)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddFriend('new')}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Slightly off-white background
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    backgroundColor: '#FFFFFF', // Pure white content area
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

