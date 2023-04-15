import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { styles } from "./../components/Styles/customStyle";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadKey } from "../components/utils/utils";
import {
  getAllContacts,
  searchCurrentUsers,
  getProfilePicture,
} from "../components/utils/API";
import { RefreshControl } from "react-native-web-refresh-control";
import { TouchableOpacity } from "react-native-web";

export default class ContactsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isLoading: true,
      contactsData: [],
      arrayOfPics: [],
      token: "",
      searchWord: "",
      clearFilter: "",
      counter: 0,
    };
  }

  componentDidMount() {
    loadKey().then((key) =>
      getAllContacts(key).then(
        (responseJson) =>
          this.setState({
            isLoading: false,
            contactsData: responseJson,
          }) // & this.loadAllPictures(responseJson, key)
      )
    );
  }
  /*
  loadAllPictures(responseJson, key) {
    console.log(responseJson);
    let responseLength = Object.keys(responseJson).length;
    let arrayOfPics = [];

    for (let i = 0; i < responseLength; i++) {
      getProfilePicture(responseJson[i].user_id, key).then((response) => {
        arrayOfPics[i] = response;
      });
    }

    this.setState({ arrayOfPics: arrayOfPics });
  }
*/
  refresh = () => {
    this.setState({ refreshing: true });
    loadKey().then((key) =>
      getAllContacts(key).then((responseJson) =>
        this.setState({
          contactsData: responseJson,
          refreshing: false,
          clearFilter: "",
        })
      )
    );
  };

  changeHandler = (e) => {
    this.setState({
      searchWord: e.target.value,
    });
  };

  showFilteredContacts = () => {
    this.setState({ isLoading: true });

    loadKey()
      .then((key) => searchCurrentUsers(this.state.searchWord, key))
      .then((responseJson) =>
        this.setState({
          contactsData: responseJson,
          isLoading: false,

          clearFilter: "Clear search",
        })
      );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView>
        <View style={styles.searchContactsContainer}>
          <TextInput
            style={styles.inputSearch}
            name="Search"
            placeholder="Search Contacts"
            onChange={this.changeHandler}
            keyboardType="text"
          />
          <View style={styles.submitButton}>
            <Button
              title="Search"
              onPress={() => this.showFilteredContacts()}
            />
          </View>
        </View>

        <View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refresh}
              />
            }
            data={this.state.contactsData}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.contact}
                onPress={() => {
                  this.props.navigation.navigate("viewContactScreen", {
                    item,
                  });
                }}
              >
                {/*}
                <View style={styles.picture}>
                  <Image
                    style={styles.myPic}
                    source={this.state.arrayOfPics[item.length]}
                  />
                </View>
              {*/}

                <Text>
                  {/* Firstname and lastname only will show when executing getallcontacts and given namy and family name when executing searchCurrentUsers*/}
                  {item.first_name} {item.last_name} {item.given_name}{" "}
                  {item.family_name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={({ user_id }, index) => user_id}
          />
        </View>
        <Text
          style={styles.clearSearch}
          onPress={() => {
            this.refresh();
          }}
        >
          {this.state.clearFilter}
        </Text>
      </ScrollView>
    );
  }
}
