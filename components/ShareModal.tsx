import React, { useState } from 'react';
import { Linking, Modal, ScrollView, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import AddLocationCard from '@/components/AddLocationCard';

type ShareModalProps = {
  isVisible: boolean;
  onClose: () => void;
  sharedData?: {
    type: string;
    value: string;
  };
};

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

export function ShareModal({ isVisible, onClose, sharedData }: ShareModalProps) {
  const [selectedFolder, setSelectedFolder] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [addedLocations, setAddedLocations] = useState(mockGeneratedLocations.map(loc => loc.id));
  const [showGeneratedLocations, setShowGeneratedLocations] = useState(false);

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

  const handleGenerateLocation = () => {
    setShowGeneratedLocations(true);
    setTitle('Generated Location');
    setLocation('123 Example Street');
    setSelectedFolder('SG Cafe');
  };

  const handleFolderSelect = (folderTitle: string) => {
    setSelectedFolder(folderTitle);
  };

  const handleAddLocation = async () => {
    // TODO: Implement location addition logic
    console.log('Adding location:', { title, location, selectedFolder, sharedData });
    onClose();
    
    // Return to previous app using the full URL if available
    if (sharedData?.value) {
      Linking.openURL(sharedData.value).catch(err => {
        console.log('Failed to return to previous app:', err);
      });
    }
  };

  // Remove the standalone Linking.openURL('') that was here before

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <ThemedView style={styles.content}>
            <ThemedText style={styles.headerText}>Add Locations</ThemedText>
            
            <ThemedView style={styles.previewsContainer}>
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
              <ThemedText style={styles.label}>Shared Link</ThemedText>
              <TextInput
                style={styles.input}
                value={sharedData?.value || ''}
                editable={false}
                placeholder="Shared link will appear here"
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
              onPress={handleAddLocation}
            >
              <ThemedText type="title" style={styles.addButtonText}>
                Add Location
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 20
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center'
  },
  previewsContainer: {
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f5f5f5'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10
  },
  halfButton: {
    flex: 1,
    borderRadius: 8,
    padding: 15
  },
  generateButton: {
    backgroundColor: '#007AFF'
  },
  generateButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  },
  manualButton: {
    backgroundColor: '#f5f5f5'
  },
  manualButtonText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15
  },
  folderScroll: {
    marginBottom: 20
  },
  folderContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 5
  },
  folderButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f5f5f5'
  },
  selectedFolderButton: {
    backgroundColor: '#007AFF'
  },
  folderButtonText: {
    fontSize: 14,
    color: '#007AFF'
  },
  selectedFolderText: {
    color: '#fff'
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    marginTop: 10
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  }
});