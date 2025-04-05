import React from 'react';
import { StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WebViewScreen() {
  const { url, title } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: title as string || 'Booking',
          headerStyle: {
            backgroundColor: '#EFE3C5'
          },
          headerTintColor: '#000000',
        }} 
      />
      <WebView 
        source={{ uri: url as string }}
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        allowsLinkPreview={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});