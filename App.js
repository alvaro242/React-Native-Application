import { SafeAreaView } from "react-native";
import StartScreen from "./app/screens/StartScreen";
import LogInScreen from "./app/screens/LogInScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import HomeScreen from "./app/screens/HomeScreen";
import addContactScreen from "./app/screens/addContactScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import { styles } from "./app/components/Styles/customStyle";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";

const Stack = createNativeStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  /*
  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem("whatsthat_session_token");
    if (value == null) {
      this.props.navigation.navigate("LogInScreen");
    }
  };
*/
  render() {
    return (
      //SafeArea for iPhoneX+ devices
      <SafeAreaView edges={["right", "left", "top"]} style={styles.root}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                title: "Home",
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="StartScreen"
              component={StartScreen}
              options={{ title: "Welcome", headerShown: false }}
            />
            <Stack.Screen
              name="LogInScreen"
              component={LogInScreen}
              options={{ title: "Log In" }}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ title: "Sign Up" }}
            />

            <Stack.Screen
              name="addContactScreen"
              component={addContactScreen}
              options={{
                title: "Add Contact",
                headerShown: true,
                gestureEnabled: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}
