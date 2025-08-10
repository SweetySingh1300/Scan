import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from './src/screens/DashboardScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import SaveScreen from './src/screens/SaveScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  Scanner: undefined;
  Preview: { images: string[] };
  Save: { images: string[] };
  ViewPdf: { filePath: string };
  ViewImage: { filePath: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="Preview" component={PreviewScreen} />
        <Stack.Screen name="Save" component={SaveScreen} />
        <Stack.Screen name="ViewPdf" component={ViewPdfScreen} options={{ headerShown: true }} />
        <Stack.Screen name="ViewImage" component={ViewImageScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;