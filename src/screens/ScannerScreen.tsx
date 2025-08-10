import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { scanDocument } from 'react-native-document-scanner-plugin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ScannerProps = NativeStackScreenProps<RootStackParamList, 'Scanner'>;

const ScannerScreen = ({ navigation }: ScannerProps) => {
  useEffect(() => {
    const openScanner = async () => {
      // Launch the document scanner
      const { scannedImages, status } = await scanDocument({
        maxNumDocuments: 10, // Allow up to 10 documents in one session
      });

      if (status === 'success' && scannedImages && scannedImages.length > 0) {
        // On success, navigate to the Preview screen with the scanned image URIs
        navigation.replace('Preview', { images: scannedImages });
      } else {
        // If the user cancels or there are no images, go back to the Dashboard
        navigation.goBack();
      }
    };

    openScanner();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Opening scanner...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
});

export default ScannerScreen;
