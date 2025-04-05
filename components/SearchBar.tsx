import React, { useState, useEffect } from 'react';
import { Image, TextInput, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  latitude?: number;
  longitude?: number;
}

const searchIcon = require('../assets/images/searchicon.png');

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  locations?: Location[];
}

export default function SearchBar({ value, onChangeText, style, locations = [] }: SearchBarProps) {
  const router = useRouter();
  const [localValue, setLocalValue] = useState(value || '');

  // Update local value if the value prop changes
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value || '');
    }
  }, [value]);

  const handleSubmit = () => {
    router.push({
      pathname: '/SearchResults',
      params: { 
        query: localValue,
        locations: JSON.stringify(locations)
      },
    });
  };

  return (
    <View style={[styles.container, style]}>
      <Image source={searchIcon} style={styles.icon} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search for locations"
        placeholderTextColor="#888"
        value={localValue}
        onChangeText={(text) => {
          setLocalValue(text);
          onChangeText?.(text);
        }}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: 45,
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  icon: {
    width: 20, 
    height: 20, 
    marginRight: 10, 
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 18,
  },
});

