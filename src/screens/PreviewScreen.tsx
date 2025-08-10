import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  ViewToken,
} from 'react-native';
import { Button, IconButton, Provider as PaperProvider } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { theme } from '../theme';

type PreviewProps = NativeStackScreenProps<RootStackParamList, 'Preview'>;

const { width } = Dimensions.get('window');

const PreviewScreen = ({ route, navigation }: PreviewProps) => {
  const { images } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const handleSave = () => {
    navigation.navigate('Save', { images });
  };

  const handleCancel = () => {
    // Navigate back to the root/dashboard
    navigation.popToTop();
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="close"
            iconColor="white"
            size={24}
            onPress={handleCancel}
          />
          <Text style={styles.counterText}>
            {currentIndex + 1} / {images.length}
          </Text>
          {/* A spacer to balance the header */}
          <View style={{ width: 40 }} />
        </View>

        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `scan_${index}`}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
            </View>
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
        />

        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Save
          </Button>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 60,
  },
  counterText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 20,
  },
  button: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PreviewScreen;