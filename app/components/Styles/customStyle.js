import { StyleSheet } from "react-native";
import { Dimensions, StatusBar } from "react-native";
import React from "react";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  // start screen

  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "salmon",
    alignItems: "center",
    justifyContent: "center",
  },

  signupContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  logoStart: {
    width: 120,
    height: 90,
    top: -10,
  },
  logoContainer: {
    top: 120,
    flex: 1,
    alignItems: "center",
  },

  //login screen

  LoginContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logoLogin: {
    width: 60,
    height: 45,
    margin: 10,
  },
  logoContainerLogin: {
    alignItems: "center",
  },
  formContainerLogin: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
  },

  inputForm: {
    height: 50,
    padding: 10,
    width: "90%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },

  errorLogin: {
    fontSize: 14,
    color: "red",
  },

  // Sign Up Screen

  containerSignUp: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logoSignUp: {
    width: 60,
    height: 45,
    margin: 10,
  },
  logoContainerSignUp: {
    alignItems: "center",
  },
  formContainerSignUp: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
  },

  //header

  header: {
    flexDirection: "row",
    alignContent: "space-around",
    height: 50,
    width: ScreenWidth,
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleOnHeader: {},

  addOnHeader: {
    alignItems: "center",
    height: 50,
    width: 50,
    justifyContent: "center",
  },

  //contacts Screen

  contactsContainer: {
    width: "100%",
    height: ScreenHeight,
    alignItems: "center",
    justifyContent: "center",
  },

  contactsContentContainer: {
    flex: 1,
    width: "100%",
    height: ScreenHeight,
    backgroundColor: "salmon",
    alignItems: "center",
    justifyContent: "center",
  },

  addContactContainer: {
    position: "relative",
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },

  inputFormAddContact: {
    height: 50,
    padding: 10,
    width: "30%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },

  contactsContainer: {
    backgroundColor: "grey",
  },

  contact: {
    backgroundColor: "white",
    padding: 30,
    marginBottom: 2,
    justifyContent: "center",
  },
});