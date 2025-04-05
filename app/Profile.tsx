import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, Alert, BackHandler } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';

// Add this import at the top with other imports
const placeholderIcon = require('../assets/images/placeholder_icon.jpg');

export default function Profile() {
  const router = useRouter();
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: placeholderIcon
  });
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout pressed') },
      ]
    );
  };

  const renderSettingItem = (title: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress} style={styles.settingItem}>
      <ThemedText type="body" style={styles.settingTitle}>{title}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false
        }} 
      />
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Image
            source={placeholderIcon}
            style={styles.avatar}
          />
          <ThemedText type="title" style={styles.name}>{user.name}</ThemedText>
          <ThemedText type="body" style={styles.email}>{user.email}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>Account Settings</ThemedText>
          {renderSettingItem('Edit Profile', () => {})}
          {renderSettingItem('Change Password', () => {})}
          {renderSettingItem('Privacy Settings', () => {})}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>App Preferences</ThemedText>
          {renderSettingItem('Notifications', () => {})}
          {renderSettingItem('Dark Mode', () => {})}
          {renderSettingItem('Language', () => {})}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>Support</ThemedText>
          {renderSettingItem('Help Center', () => {})}
          {renderSettingItem('About SaveSpot', () => {})}
        </ThemedView>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <ThemedText type="body" style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16, // Reduced from 24
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  back: {
    position: 'absolute',
    top: 24,
    left: 24,
    zIndex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  settingItem: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutButton: {
    margin: 20,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ff4444',
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    color: '#ff4444',
    fontWeight: '600',
    fontSize: 16, 
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 15,
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
