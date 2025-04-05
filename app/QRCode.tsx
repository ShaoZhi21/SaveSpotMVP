import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function QRCodeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>

      <ThemedView style={styles.content}>
        <ThemedText style={styles.discountText}>10% off discount</ThemedText>
        
        <ThemedView style={styles.qrContainer}>
          <Ionicons name="qr-code" size={250} color="#000" />
        </ThemedView>

        <ThemedText style={styles.serialNumber}>Serial: SP-2024-0123-4567</ThemedText>

        <ThemedView style={styles.termsContainer}>
          <ThemedText style={styles.termsTitle}>Terms & Conditions:</ThemedText>
          <ThemedText style={styles.termsText}>
            {`1. Valid for one-time use only\n2. Cannot be combined with other promotions\n3. Valid until December 31, 2024\n4. Applicable only at participating locations\n5. Discount applies to regular-priced items only\n6. Management reserves the right to modify terms`}
            </ThemedText>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 10,
    zIndex: 10,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  discountText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingTop: 40,
    marginBottom: 40,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
  },
  serialNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  termsContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});