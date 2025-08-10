import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Button,
  TextInput,
  Title,
  Provider as PaperProvider,
  ToggleButton,
  ActivityIndicator,
  Text,
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RNFS from 'react-native-fs';
import { createPdf } from 'react-native-images-to-pdf';

import { RootStackParamList } from '../../App';
import { theme } from '../theme';

type SaveProps = NativeStackScreenProps<RootStackParamList, 'Save'>;

const SaveScreen = ({ route, navigation }: SaveProps) => {
  const { images } = route.params;
  const [fileName, setFileName] = useState(`Scan_${Date.now()}`);
  const [saveFormat, setSaveFormat] = useState('PDF');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!fileName) {
      Alert.alert('Error', 'Please enter a file name.');
      return;
    }

    setIsSaving(true);

    try {
      const dir = RNFS.DocumentDirectoryPath;
      if (saveFormat === 'PDF') {
        const outputPath = `${dir}/${fileName}.pdf`;
        const pdfOptions = {
          imagePaths: images,
          name: outputPath,
        };
        await createPdf(pdfOptions);
        Alert.alert('Success', `PDF saved to ${outputPath}`);
      } else {
        // Save as individual photos
        for (let i = 0; i < images.length; i++) {
          const fromPath = images[i];
          const toPath = `${dir}/${fileName}_${i + 1}.jpg`;
          await RNFS.copyFile(fromPath, toPath);
        }
        Alert.alert('Success', `${images.length} photos saved in app documents.`);
      }
      navigation.popToTop(); // Go back to Dashboard
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', `Failed to save file: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <Title style={styles.title}>Save Document</Title>

          <TextInput
            label="File Name"
            value={fileName}
            onChangeText={setFileName}
            mode="outlined"
            style={styles.input}
          />

          <ToggleButton.Row
            onValueChange={(value) => value && setSaveFormat(value)}
            value={saveFormat}
            style={styles.toggleContainer}
          >
            <ToggleButton icon="file-pdf-box" value="PDF" style={styles.toggleButton} />
            <ToggleButton icon="image-multiple" value="Photo" style={styles.toggleButton} />
          </ToggleButton.Row>
          <Text style={styles.formatLabel}>Save as: {saveFormat}</Text>

          {isSaving ? (
            <ActivityIndicator animating={true} size="large" style={styles.spinner} />
          ) : (
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              disabled={isSaving}
            >
              Save
            </Button>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  toggleContainer: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
  },
  formatLabel: {
    textAlign: 'center',
    marginBottom: 30,
  },
  spinner: {
    marginTop: 20,
  },
  button: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SaveScreen;