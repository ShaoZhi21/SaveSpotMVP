import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface FolderCardProps {
  title: string;
  itemCount?: number;
  onPress?: () => void;
  isSelected?: boolean;
  locations?: Array<{
    id: string;
    imageUrl: any;
  }>;
}

export default function FolderCard({ title, itemCount = 0, onPress, isSelected = false, locations = [] }: FolderCardProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/Folder?title=${encodeURIComponent(title)}`);
    }
  };

  const renderImages = () => {
    if (locations && locations.length >= 3) {
      return (
        <View style={styles.imageContainer}>
          <Image
            source={locations[0].imageUrl}
            style={styles.leftImage}
            resizeMode="cover"
          />
          <View style={styles.rightContainer}>
            <Image
              source={locations[1].imageUrl}
              style={styles.rightTopImage}
              resizeMode="cover"
            />
            <Image
              source={locations[2].imageUrl}
              style={styles.rightBottomImage}
              resizeMode="cover"
            />
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <ThemedView style={[styles.card, isSelected && styles.selectedCard]}>
        <View style={styles.contentContainer}>
          {renderImages()}
        </View>
      </ThemedView>
      <ThemedView style={styles.description}>
        <ThemedText type="default" style={styles.title} numberOfLines={1}>
          {title}
        </ThemedText>
        <ThemedText type="default" style={styles.count}>
          {itemCount} items
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 10,
    width: 160,
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 160,
    width: 160,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedCard: {
    backgroundColor: '#ffffff',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  leftImage: {
    width: '50%',
    height: '100%',
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
  },
  rightContainer: {
    width: '50%',
    height: '100%',
  },
  rightTopImage: {
    width: '100%',
    height: '50%',
    borderTopRightRadius: 22,
  },
  rightBottomImage: {
    width: '100%',
    height: '50%',
    borderBottomRightRadius: 22,
  },
  description: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    paddingHorizontal: 8,
    marginTop: 6, // Adjust the margin to move the text lower in the b
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 20,
    width: '100%',
    marginBottom: 4,
  },
  count: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
  },
});
