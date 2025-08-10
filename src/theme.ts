import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF', // A vibrant blue accent
    accent: '#007AFF',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    placeholder: '#A9A9A9',
  },
};
