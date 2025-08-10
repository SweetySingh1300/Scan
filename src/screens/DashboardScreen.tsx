import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import { Button, Title, Provider as PaperProvider, List, Text } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RNFS from 'react-native-fs';

import { RootStackParamList } from '../../App';
import { theme } from '../theme';

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

interface Document {
  name: string;
  path: string;
  mtime?: Date;
}

const DashboardScreen = ({ navigation }: DashboardProps) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const isFocused = useIsFocused();

  const loadDocuments = async () => {
    try {
      const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
      const filteredFiles = files
        .filter(file => file.isFile() && (file.name.endsWith('.pdf') || file.name.endsWith('.jpg')))
        .sort((a, b) => (b.mtime && a.mtime) ? b.mtime.getTime() - a.mtime.getTime() : 0);
      setDocuments(filteredFiles);
    } catch (error) {
      console.error('Failed to load documents', error);
      Alert.alert('Error', 'Could not load saved documents.');
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadDocuments();
    }
  }, [isFocused]);

  const handleOpenFile = (doc: Document) => {
    if (doc.name.endsWith('.pdf')) {
      navigation.navigate('ViewPdf', { filePath: `file://${doc.path}` });
    } else if (doc.name.endsWith('.jpg')) {
      navigation.navigate('ViewImage', { filePath: `file://${doc.path}` });
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Title style={styles.title}>Recent Documents</Title>
        <View style={styles.listContainer}>
          {documents.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No documents scanned yet.</Text>
            </View>
          ) : (
            <FlatList
              data={documents}
              keyExtractor={(item) => item.path}
              renderItem={({ item }) => (
                <List.Item
                  title={item.name}
                  description={item.mtime ? item.mtime.toLocaleString() : ''}
                  left={props => <List.Icon {...props} icon={item.name.endsWith('.pdf') ? 'file-pdf-box' : 'image'} />}
                  onPress={() => handleOpenFile(item)}
                />
              )}
            />
          )}
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Scanner')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          icon="camera"
        >
          Scan New Document
        </Button>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 20,
  },
  listContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
  button: {
    margin: 20,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
