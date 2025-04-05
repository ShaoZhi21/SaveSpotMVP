import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AddFolder() {
  const router = useRouter();
  const [folderName, setFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#007AFF');

  const colors = ['#007AFF', '#34C759', '#FF9500', '#5856D6', '#FF3B30'];

  const handlePress = () => {
    if (!folderName.trim()) {
      // Show error or alert
      return;
    }
    // TODO: Implement folder creation logic with folderName and selectedColor
    router.back();
  };

  return (
    <>      
    <Stack.Screen options={{ headerShown: false }} />
    <SafeAreaView style={{ flex: 1 }}>    
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            <ThemedText style={styles.title}>Create New Folder</ThemedText>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Folder Name</ThemedText>
            <TextInput
              style={styles.input}
              value={folderName}
              onChangeText={setFolderName}
              placeholder="Enter folder name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.colorSection}>
            <ThemedText style={styles.label}>Choose Color</ThemedText>
            <View style={styles.colorGrid}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorOption, { backgroundColor: color },
                    selectedColor === color && styles.selectedColor]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: selectedColor }]} 
            onPress={handlePress}
          >
            <ThemedText style={styles.buttonText}>Create Folder</ThemedText>
          </TouchableOpacity>
        </ThemedView>
    </SafeAreaView>  
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  colorSection: {
    marginBottom: 32,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    marginBottom: 12,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});