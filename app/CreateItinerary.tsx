import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, View, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateItineraryScreen() {
  const router = useRouter();
  const [itineraryTitle, setItineraryTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the date picker when a date is selected
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}    
      />
      <ThemedView style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Create Itinerary</ThemedText>
      </ThemedView>

      <ScrollView style={styles.content}>
        <ThemedView style={styles.section}>
          <ThemedView style={styles.dateRow}>
            <ThemedText style={styles.sectionTitleDate}>Title</ThemedText>
            <TextInput
              style={styles.titleInput}
              placeholder="Enter itinerary name"
              value={itineraryTitle}
              onChangeText={setItineraryTitle}
            />
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedView style={styles.dateRow}>
            <ThemedText style={styles.sectionTitleDate}>Select Date</ThemedText>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)} // Show date picker when clicked
            >
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <ThemedText style={styles.datePickerText}>
                {selectedDate.toDateString()}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Use 'spinner' on iOS
            onChange={onDateChange}
          />
        )}
      </ScrollView>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.navigationButton, styles.generateButton]}
          onPress={() => router.push('/Generate')}
        >
          <Ionicons name="flash-outline" size={24} color="#fff" />
          <ThemedText style={styles.buttonText}>Generate</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navigationButton, styles.manualButton]}
          onPress={() => router.push('/Manual')}
        >
          <Ionicons name="list-outline" size={24} color="#fff" />
          <ThemedText style={styles.buttonText}>Manual</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scheduleSection: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  clearButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  scheduleContent: {
    marginTop: 12,
    gap: 12,
  },
  folderFilter: {
    marginBottom: 14,
  },
  folderChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  folderChipSelected: {
    backgroundColor: '#007AFF',
  },
  folderText: {
    fontSize: 16,
    color: '#333',
  },
  folderTextSelected: {
    color: '#fff',
  },
  locationsList: {
    marginTop: 12,
  },
  scheduleList: {
    marginTop: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scheduleNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleLocation: {
    flex: 1,
  },
  removeButton: {
    marginLeft: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitleDate: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginTop: 8,
    width: '70%',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    gap: 8,
    width: '70%'
  },
  datePickerText: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 32,
    gap: 16,
    paddingHorizontal: 16,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  manualButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16, // Add this line to add space below the button
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  rowInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    width: '100%',
  },
  generateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 0,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // remove borderWidth
  },
});
