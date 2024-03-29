import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { styles } from "./../components/Styles/customStyle";
import { logIn } from "../components/utils/API";
import React, { Component } from "react";
import { warningAlert } from "../components/utils/errorHandling";
import { NativeBaseProvider } from "native-base";
import { t, getLanguage, getLanguagePreference } from "../../locales";

export default class LogInScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertMessage: <View></View>,
    };
  }

  componentDidMount() {}

  handleFeedback(response) {
    let warningFeedback400 = warningAlert(t("invalidlogin"));

    if (response.status == 200) {
      this.props.navigation.navigate("HomeScreen");
    } else if (response.status == 400) {
      this.setState({
        alertMessage: warningFeedback400,
      });
    } else {
      this.setState({
        alertMessage: warningFeedback400,
      });
    }
  }

  render() {
    const loginValidationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Please enter valid email")
        .required("Email is required"),
      password: yup
        .string()
        .min(9, ({ min }) => `Password must be at least ${min} characters`),
    });

    return (
      <View style={styles.LoginContainer}>
        <View style={styles.logoContainerLogin}>
          <Image
            style={styles.logoLogin}
            source={require("../assets/logo.png")}
          />
        </View>

        <Text>{t("createNewAccount")}</Text>

        <View style={styles.formContainerLogin}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) =>
              logIn(values)
                .then((response) => this.handleFeedback(response))
                .catch((error) => this.handleFeedback(error))
            }
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                <TextInput
                  name="email"
                  placeholder={t("email")}
                  style={styles.inputForm}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="text"
                />
                {errors.email && (
                  <Text style={styles.errorLogin}>{errors.email}</Text>
                )}
                <TextInput
                  name="password"
                  placeholder={t("password")}
                  autoCapitalize="none"
                  style={styles.inputForm}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && (
                  <Text style={styles.errorLogin}>{errors.password}</Text>
                )}

                <Button
                  onPress={handleSubmit}
                  title={t("LogIn")}
                  disabled={!isValid}
                />
              </>
            )}
          </Formik>
        </View>
        <TouchableOpacity>{this.state.alertMessage}</TouchableOpacity>
      </View>
    );
  }
}
