import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { styles } from "./../../components/Styles/customStyle";
import { loadKey } from "../../components/utils/utils";
import { getBlockedContacts } from "../../components/utils/API";

export default class BlockedUsersScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      blockedContacsData: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getData();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getData = () => {
    loadKey().then((key) =>
      getBlockedContacts(key).then((responseJson) =>
        this.setState({ blockedContacsData: responseJson, isLoading: false })
      )
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
        <FlatList
          data={this.state.blockedContacsData}
          renderItem={({ item }) => (
            <Text
              style={styles.contact}
              onPress={() => {
                this.props.navigation.navigate("unblockUserScreen", { item });
              }}
            >
              {item.first_name} {item.last_name}
            </Text>
          )}
          keyExtractor={({ user_id }, index) => user_id}
        />
      </ScrollView>
    );
  }
}
