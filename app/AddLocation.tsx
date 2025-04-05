import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';  // Add Image import
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import AddLocationCard from '@/components/AddLocationCard';
import { router } from 'expo-router';
import {Stack} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Add this mock data at the top of the file, after imports
const mockGeneratedLocations = [
  {
    id: '1',
    name: 'Atlas Coffee',
    category: 'Cafe',
    rating: 4.8,
    imageUrl: require('../assets/images/cafes/atlas_coffee.jpeg'),
    sourceLink: 'instagram.com/@coffeeguide',
    description: 'Minimalist coffee shop serving specialty brews in a cozy setting.',
    bookingLink: ''
  },
  {
    id: '2',
    name: 'Acoustic Cafe',
    category: 'Cafe',
    rating: 4.7,
    imageUrl: require('../assets/images/cafes/acoustic_cafe.jpeg'),
    description: 'Japanese-inspired cafe known for their pour-over coffee and matcha.',
    sourceLink: 'tiktok.com/@sgcafes'
  },
  {
    id: '3',
    name: 'Cafe Gui',
    category: 'Cafe',
    rating: 4.9,
    imageUrl: require('../assets/images/cafes/cafe_gui.jpg'),
    description: 'Artisanal coffee roastery offering carefully sourced single-origin beans.',
    sourceLink: 'instagram.com/@sgcoffee'
  },
];

export default function AddLocationScreen() {
  const [selectedFolder, setSelectedFolder] = useState('');
  const [link, setLink] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [addedLocations, setAddedLocations] = useState<string[]>([]);

  const handleLocationToggle = (locationId: string) => {
    setAddedLocations(prev => 
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  const folders = [
    'Japan',
    'Hotpot',
    'JB Cafe',
    'SG Cafe',
    'Test'
  ];

  // Add new state for controlling when to show generated locations
  const [showGeneratedLocations, setShowGeneratedLocations] = useState(false);
  
  // Update the handleGenerateLocation function
  const handleGenerateLocation = () => {
    setShowGeneratedLocations(true);
    setTitle('Generated Location');
    setLocation('123 Example Street');
    setSelectedFolder('SG Cafe'); // Auto-select SG Cafe folder
  };
  
  const handleFolderSelect = (folderTitle: string) => {
    setSelectedFolder(folderTitle);
  };

  const handleSave = () => {
    if (!selectedFolder) {
      alert('Please select a folder');
      return;
    }

    const selectedLocations = mockGeneratedLocations.filter(location => 
      addedLocations.includes(location.id)
    );

    if (selectedLocations.length === 0) {
      alert('Please select at least one location');
      return;
    }

    router.push({
      pathname: '/(tabs)',
      params: {
        newLocations: JSON.stringify(selectedLocations),
        targetFolder: selectedFolder
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}>
      </Stack.Screen>
      <ScrollView style={styles.container}>
        <ThemedView style={styles.content}>
          <ThemedView style={styles.topBar}>
          <ThemedText style={styles.headerText}>Add Locations</ThemedText>
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={35} color="#FF3B30" />
          </TouchableOpacity>
          </ThemedView>
          <ThemedView>
            {!showGeneratedLocations ? (
              <AddLocationCard 
                key="placeholder"
                location={{
                  id: 'placeholder',
                  name: 'Location name',
                  description: 'Generate now!',
                  imageUrl: null,
                  bookingLink: '',
                }}
                isSelected={false}
                onToggle={() => {}}
              />
            ) : (
              mockGeneratedLocations.map((location) => (
                <AddLocationCard 
                  key={location.id} 
                  location={location}
                  isSelected={addedLocations.includes(location.id)}
                  onToggle={() => handleLocationToggle(location.id)}
                />
              ))
            )}
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.label}>Auto Generate location with Link</ThemedText>
            <TextInput
              style={styles.input}
              value={link}
              onChangeText={setLink}
              placeholder="Enter website link"
              placeholderTextColor="#666"
            />
          </ThemedView>

              <ThemedView style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.generateButton, styles.halfButton]} 
                  onPress={handleGenerateLocation}
                >
                  <ThemedText type="title" style={styles.generateButtonText}>
                    Generate
                  </ThemedText>
                </TouchableOpacity>
            
                <TouchableOpacity 
                  style={[styles.manualButton, styles.halfButton]} 
                  onPress={() => setShowManualEntry(!showManualEntry)}
                >
                  <ThemedText type="title" style={styles.manualButtonText}>
                    Enter Manually
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>

          {showManualEntry && (
            <ThemedView style={styles.inputContainer}>
              <ThemedText style={styles.label}>Title</ThemedText>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter location title"
                placeholderTextColor="#666"
              />

              <ThemedText style={styles.label}>Location</ThemedText>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location address"
                placeholderTextColor="#666"
              />
            </ThemedView>
          )}

          <ThemedText type="title" style={styles.sectionTitle}>
            Select Folder
          </ThemedText>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.folderScroll}
          >
            <ThemedView style={styles.folderContainer}>
              {folders.map((folder) => (
                <TouchableOpacity
                  key={folder}
                  style={[styles.folderButton, selectedFolder === folder && styles.selectedFolderButton]}
                  onPress={() => handleFolderSelect(folder)}
                >
                  <ThemedText 
                    type="default" 
                    style={[styles.folderButtonText, selectedFolder === folder && styles.selectedFolderText]}
                  >
                    {folder}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ThemedView>
          </ScrollView>

          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleSave}
          >
            <ThemedText type="title" style={styles.addButtonText}>
              Add Location
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
  },
  generateButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '49%',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,  // Increased from 16
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 5,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  folderScroll: {
    marginBottom: 20,
  },
  folderContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  folderButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedFolderButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  folderButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedFolderText: {
    color: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    height: 50,
  },
  addButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', // Added for vertical centering
    marginTop: 20,
    height: 60, // Added fixed height
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',  // Keep text centered horizontally
    // Removed marginBottom: 20
  },
  previewScrollView: {
    maxHeight: 450, // Allows showing multiple items while leaving room for other content
    marginBottom: 20,
  },
  previewContainer: {
    flexDirection: 'row',
    marginBottom: 15, // Reduced margin between items
    height: 150, // Reduced height for each item
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
    imagePlaceholder: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    previewInfo: {
      flex: 1,
      padding: 15,
      justifyContent: 'space-between',
    },
    previewTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
    },
    previewSummary: {
      fontSize: 12,
      color: '#666',
      marginBottom: 10,
    },
    manualButton: {
        backgroundColor: '#FF9500',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        width: '49%',
      },
      manualButtonText: {
        color: '#fff',
        fontSize: 18,  // Increased from 16
        fontWeight: '600',
      },
      previewImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
      },
      buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 8,
        marginTop: -2, // Added negative margin to shift buttons up
      },
      actionButton: {
        flex: 1,
        padding: 6,
        borderRadius: 6,
      },
});

