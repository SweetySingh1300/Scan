import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ViewImageProps = NativeStackScreenProps<RootStackParamList, 'ViewImage'>;

const ViewImageScreen = ({ route, navigation }: ViewImageProps) => {
  const { filePath } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Image" />
      </Appbar.Header>
      <View style={styles.imageContainer}>
        <Image source={{ uri: filePath }} style={styles.image} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100, // Adjust for header
  },
});

export default ViewImageScreen;
