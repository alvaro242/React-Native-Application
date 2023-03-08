import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import StartScreen from "./app/screens/StartScreen";

export default function App() {

  return <StartScreen/>;

  /*
  return (
    
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Hello world inside of a Navigation Container!</Text>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
    
  );
  */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});