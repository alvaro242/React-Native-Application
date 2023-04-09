import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as RootNavigation from "./RootNavigation";

let serverIP = "192.168.0.16:3333";

export function registerUser(values) {
  console.log(values);
  axios
    .post("http://" + serverIP + "/api/1.0.0/user/", values)
    .then((response) => {
      //returns user ID on response.data.user_id, pending autologin
      console.log(response.status);
      //if response 201 I should make a logged in.

      if (response.status == 201) {
        RootNavigation.navigate("LogInScreen");
        // or go to root
        // pending: auto-login
      } else {
        //show error informing about error from API
      }
    })
    .catch((error) => {
      //Error handling pending
      console.log(error);
    });
}

export function getUserInformation(token, userID) {
  let url = "http://" + serverIP + "/api/1.0.0/user/" + userID;

  return fetch(url, {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  })
    .then((response) => {
      return response.json();
    })

    .catch((error) => {
      console.log("No response / not auth");
      console.log(error);
    });
}

export function UpdateUserInformation(values, userID, token) {
  let url = "http://" + serverIP + "/api/1.0.0/user/" + userID;

  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(values),
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export function logIn(values) {
  console.log(values);

  axios
    .post("http://" + serverIP + "/api/1.0.0/login/", values)
    .then(async (response) => {
      try {
        await AsyncStorage.setItem(
          "whatsthat_user_id",
          response.data.id.toString()
        ); //expo recomends to stringify this
        await AsyncStorage.setItem(
          "whatsthat_session_token",
          response.data.token
        );
        RootNavigation.navigate("HomeScreen");
        console.log(response.data.token);
        console.log("this works");
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      //error handling pending
      console.log(error);
    });
}

export function logOut(token) {
  console.log(token);
  return fetch("http://" + serverIP + "/api/1.0.0/logout", {
    method: "POST",
    headers: {
      "X-Authorization": token,
    },
  })
    .then(async (response) => {
      if (response.status == 200) {
        await AsyncStorage.removeItem("whatsthat_session_token");
        await AsyncStorage.removeItem("whatsthat_user_id");

        RootNavigation.navigate("StartScreen");
      } else if (response.status == 401) {
        console.log("Unauthorized");
        await AsyncStorage.removeItem("whatsthat_session_token");
        await AsyncStorage.removeItem("whatsthat_user_id");
        RootNavigation.navigate("StartScreen");
      } else {
        throw RootNavigation.navigate("StartScreen");
      }
    })
    .catch((error) => {
      RootNavigation.navigate("StartScreen");
      console.log("error");
    });
}

export function getProfilePicture(userID, token) {
  let url = "http://" + serverIP + "/api/1.0.0/user/" + userID + "/photo";

  return fetch(url, {
    method: "GET",
    headers: {
      accept: "image/png",
      "X-Authorization": token,
    },
  })
    .then((response) => {
      return response.blob();
    })
    .then((resBlob) => {
      let data = URL.createObjectURL(resBlob);
      return data;
    })
    .catch((error) => console.log(error));
}

export async function uploadProfilePic(token, id, photo) {
  let url = "http://" + serverIP + "/api/1.0.0/user/" + id + "/photo";
  let fetchpic = await fetch(photo);
  let blob = await fetchpic.blob();

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "image/png",
      "X-Authorization": token,
    },
    body: blob,
  })
    .then((response) => {
      if (response.status == 200) {
        console.log("image updated");
        RootNavigation.navigate("AccountScreen");
      } else {
        throw "something happened";
      }
    })

    .catch((error) => console.log(error));
}

export function searchCurrentUsers(searchWord, token) {
  let url =
    "http://" +
    serverIP +
    "/api/1.0.0/search?q=" +
    searchWord +
    "&limit=999&search_in=contacts";

  return fetch(url, {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })

    .catch((error) => {
      console.log(error);
    });
}

export function searchBetweenAllUsers(searchWord, token) {
  let url =
    "http://" +
    serverIP +
    "/api/1.0.0/search?q=" +
    searchWord +
    "&limit=999&search_in=all";

  return fetch(url, {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })

    .catch((error) => {
      console.log(error);
    });
}

export function getAllContacts(token) {
  let url = "http://" + serverIP + "/api/1.0.0/contacts";

  return fetch(url, {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  })
    .then((response) => {
      return response.json();
    })

    .catch((error) => {
      console.log(error);
    });
}

export function addFriend(friendID, authKey) {
  let url = "http://" + serverIP + "/api/1.0.0/user/" + friendID + "/contact";

  axios
    .post(
      url,
      {},
      {
        headers: {
          "X-Authorization": authKey,
        },
      }
    )
    .then((response) => {
      //returns user ID on response.data.user_id, pending autologin
      //if response 201 I should make a logged in.

      if (response.status == 200) {
        if (response.data === "Already a contact") {
          console.log("Already a contact");
        } else {
          alert("Contact added");
        }
      } else {
        //show error informing about error from API
      }
    })
    .catch((error) => {
      //Error handling pending
      console.log(error);

      if (error.response.status == 401) {
        console.log("not auth");
      } else if (error.response.status == 400) {
        console.log("You can´t add yourself as a contact");
      } else if (error.response.status == 404) {
        console.log("This friend ID doesn´t exist");
      } else {
        console.log("Error.  try again  later");
      }
    });
}

export function removeContact(userID, key) {
  return fetch(
    "http://" + serverIP + "/api/1.0.0/user/" + userID + "/contact",
    {
      method: "DELETE",
      headers: {
        "X-Authorization": key,
      },
    }
  )
    .then(async (response) => {
      if (response.status == 200) {
        console.log("The contact has been removed");
        alert("The Contact has been removed");
      } else if (response.status == 400) {
        console.log("You can´t remove yourself as a contact");
      } else if (response.status == 401) {
        console.log("Unauthorized");
      } else if (response.status == 404) {
        console.log("Not Found");
      } else if (response.status == 500) {
        console.log("Server error");
      } else {
        throw "Error";
      }
    })
    .catch((error) => {
      console.log("error");
    });
}

export function getBlockedContacts(token) {
  let url = "http://" + serverIP + "/api/1.0.0/blocked";

  return (
    fetch(url, {
      method: "GET",
      headers: {
        "X-Authorization": token,
      },
    })
      .then((response) => {
        return response.json();
      })
      /*
    .then((responseJson) => {
      
      this.setState({ isLoading: false, blockedContacsData: responseJson });
    })
    */
      .catch((error) => {
        console.log("No response / not auth");
        console.log(error);
      })
  );
}

export function blockContact(userID, key) {
  return fetch("http://" + serverIP + "/api/1.0.0/user/" + userID + "/block", {
    method: "POST",
    headers: {
      "X-Authorization": key,
    },
  })
    .then(async (response) => {
      if (response.status == 200) {
        console.log("The contact has been blocked");
        alert("The contact has been blocked");
      } else if (response.status == 400) {
        console.log("You can´t block yourself");
      } else if (response.status == 401) {
        console.log("Unauthorized");
      } else if (response.status == 404) {
        console.log("Not Found");
      } else if (response.status == 500) {
        console.log("Server error");
      } else {
        throw "Error";
      }
    })
    .catch((error) => {
      console.log("error");
    });
}

export function unblockContact(userID, key) {
  return fetch("http://" + serverIP + "/api/1.0.0/user/" + userID + "/block", {
    method: "DELETE",
    headers: {
      "X-Authorization": key,
    },
  })
    .then(async (response) => {
      if (response.status == 200) {
        console.log("The contact has been unblocked");
        RootNavigation.navigate("blockedUsersScreen");
      } else if (response.status == 400) {
        console.log("You can´t block yourself");
      } else if (response.status == 401) {
        console.log("Unauthorized");
      } else if (response.status == 404) {
        console.log("Not Found");
      } else if (response.status == 500) {
        console.log("Server error");
      } else {
        throw "Error";
      }
    })
    .catch((error) => {
      console.log("error");
    });
}

// TO IMPLEMENT ALL CHAT
