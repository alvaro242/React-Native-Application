import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { styles } from "./../components/Styles/customStyle";
import { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class StartScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <ImageBackground
        style={styles.background}
        source={require("../assets/IntroBackground.jpeg")}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoStart}
            source={require("../assets/logo.png")}
          />
          <Text>Telechat</Text>
        </View>
        <TouchableHighlight
          style={styles.privisionalHomeButton}
          onPress={() => {
            navigation.push("HomeScreen");
            navigation.navigate("HomeScreen", {
              screen: "HomeScreen",
              initial: false,
            });
          }}
        >
          <Text>Provisional: Home</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.loginContainer}
          onPress={() => {
            console.log("Login Button!");
            navigation.push("LogInScreen");
          }}
        >
          <Text>Log In</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.signupContainer}
          onPress={() => {
            console.log("Sign Up Button!");
            navigation.push("SignUpScreen");
          }}
        >
          <Text>Sign Up</Text>
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}