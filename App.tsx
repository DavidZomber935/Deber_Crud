import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { styles } from './src/themes/styles';
import { Provider as PaperProvider } from 'react-native-paper'; 
import { HomeScreen } from './src/screens/HomeScreen'; 

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <HomeScreen />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

