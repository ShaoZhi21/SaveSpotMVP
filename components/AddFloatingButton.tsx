import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated, Easing, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AddFloatingButton() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    setExpanded(!expanded);
  };

  const locationStyle = {
    opacity: animation,
    transform: [
      { scale: animation },
      { 
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70], // Moves 70px up when expanded
        }),
      },
    ],
    zIndex: expanded ? 1 : 0,
    pointerEvents: expanded ? 'auto' : 'none',
  };

  const folderStyle = {
    opacity: animation,
    transform: [
      { scale: animation },
      { 
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140], // Moves 140px up when expanded
        }),
      },
    ],
    zIndex: expanded ? 1 : 0,
    pointerEvents: expanded ? 'auto' : 'none',
  };

  return (
    <View style={styles.container}>
      {/* Folder Button */}
      <Animated.View style={[styles.button, styles.secondary, styles.folder, folderStyle]}>
        <TouchableOpacity onPress={() => router.push('/AddFolder')}>
          <Ionicons name="folder-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Location Button */}
      <Animated.View style={[styles.button, styles.secondary, styles.location, locationStyle]}>
        <TouchableOpacity onPress={() => router.push('/AddLocation')}>
          <Ionicons name="location-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Main Floating Button */}
      <TouchableOpacity 
        onPress={toggleMenu}
        style={styles.button}
        activeOpacity={0.85}
      >
        <Ionicons name={expanded ? "close" : "add"} size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 160,
    right: 50,
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
  },
  secondary: {
    width: 60,
    height: 60,
    backgroundColor: '#34C759',
  },
  location: {
    position: 'absolute',
    right: -30,
  },
  folder: {
    position: 'absolute',
    right: -30,
  },
});

