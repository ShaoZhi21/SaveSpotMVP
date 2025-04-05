import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export interface BookingLinkModalProps {
  visible: boolean;
  onClose: () => void;
  siteName: string;
  bookingLink: string;
}

export default function BookingLinkModal({ visible, onClose, siteName, bookingLink }: BookingLinkModalProps) {
    const handlePressLink = () => {
        if (bookingLink) {
          Linking.openURL(bookingLink).catch(err => console.error('Error opening URL', err));
        }
      };

    return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <ThemedView style={styles.linkContainer}>
              <ThemedText style={styles.companyName}>{(bookingLink.match(/www\.([^.]+)\.com/)?.[1] || 'Booking').charAt(0).toUpperCase() + (bookingLink.match(/www\.([^.]+)\.com/)?.[1] || 'Booking').slice(1)}</ThemedText>
              <TouchableOpacity onPress={handlePressLink}>
                <ThemedText style={styles.bookingLink}>{bookingLink}</ThemedText>
              </TouchableOpacity>
            </ThemedView>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <ThemedText style={styles.closeButtonText}>Close</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    
  },
  modalContainer: {
    height: 'auto', minHeight: '20%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    padding: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    padding: 12,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
  bookingLink: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 10,
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});