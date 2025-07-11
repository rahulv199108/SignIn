

import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/stackNavigation/StackNavigation';
import { ThemeProvider } from './src/component/molecules/customTheme/CustomTheme';

const App = () => {
  return (
    <ThemeProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
})
export default App;
