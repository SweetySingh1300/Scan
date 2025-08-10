import React from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import { Appbar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ViewPdfProps = NativeStackScreenProps<RootStackParamList, 'ViewPdf'>;

const ViewPdfScreen = ({ route, navigation }: ViewPdfProps) => {
  const { filePath } = route.params;
  const source = { uri: filePath, cache: true };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Document" />
      </Appbar.Header>
      <View style={styles.pdfContainer}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, path) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          style={styles.pdf}
          trustAllCerts={false}
          loader={<ActivityIndicator size="large"/>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  pdfContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default ViewPdfScreen;
