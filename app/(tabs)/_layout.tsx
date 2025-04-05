import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Pressable } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type TabBarIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size?: number;
};

function TabBarIcon({ name, color, size = 28 }: TabBarIconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  const tintColor = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'tint');
  const inactiveColor = useThemeColor({ light: '#8E8E93', dark: '#8E8E93' }, 'text');
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="house.fill" style={styles.tabBarItem} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Plan"
        options={{
          title: 'Plan',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="calendar" style={styles.tabBarItem} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="map.fill" style={styles.tabBarItem} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="magnifyingglass" style={styles.tabBarItem} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="person.2.fill" style={styles.tabBarItem} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    zIndex: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabBar: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    borderRadius: 25,
    height: 80,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    gap: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});
