import {
  StyleSheet,
  Icon,
  Text,
  View,
  Button,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "./ChatsScreen";
import AccountScreen from "./AccountScreen";
import ContactsScreen from "./ContactsScreen";
import SettingsScreen from "./SettingsScreen";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const HomeTab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <HomeTab.Navigator initialRouteName="Home">
      <HomeTab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarLabel: "Contacts",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="account-plus"
              color="black"
              size="25"
              onPress={() =>
                navigation.navigate("addContactScreen", {
                  screen: "addContactScreen",
                })
              }
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarLabel: "Chats",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      <HomeTab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          title: "My Account",
          tabBarLabel: "Account",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <HomeTab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 60,
    height: 45,
    margin: 10,
  },
  logoContainer: {
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
  },

  input: {
    height: 50,
    padding: 10,
    width: "90%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },

  error: {
    fontSize: 14,
    color: "red",
  },
});
