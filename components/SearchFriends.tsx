import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

interface SearchFriendsProps {
  onSearch: (query: string) => void;
  onAddFriend?: (userId: string) => void;
}

interface SearchResult {
  id: string;
  name: string;
  avatar?: string;
}

export default function SearchFriends({ onSearch, onAddFriend }: SearchFriendsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
    // Mock search results - replace with actual API call
    if (text.length > 0) {
      setSearchResults([
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
      ]);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for friends"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
      </View>

      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          {searchResults.map((result) => (
            <View key={result.id} style={styles.resultItem}>
              <View style={styles.resultInfo}>
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={20} color="#999" />
                </View>
                <ThemedText style={styles.resultName}>{result.name}</ThemedText>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onAddFriend?.(result.id)}
              >
                <Ionicons name="person-add" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  resultsContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    padding: 8,
  },
});