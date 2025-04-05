import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import { ShareModal } from './ShareModal';

export function ShareHandler() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sharedData, setSharedData] = useState<{ type: string; value: string } | undefined>();

  useEffect(() => {
    // Handle deep linking
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // We don't need to check initial URL since we only want to handle shared URLs

    return () => {
      subscription.remove();
    };
  }, []);

  const handleDeepLink = (event: { url: string }) => {
    const { url } = event;
    // Parse the URL and extract shared data
    const data = Linking.parse(url);
    
    if (data.queryParams) {
      setSharedData({
        type: 'url',
        value: data.queryParams.url as string || ''
      });
      setIsModalVisible(true);
    }
  };

  return (
    <ShareModal
      isVisible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      sharedData={sharedData}
    />
  );
}