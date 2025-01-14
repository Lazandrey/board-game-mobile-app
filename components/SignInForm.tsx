import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CustomDarkTheme } from "@/app/_layout";
import { ThemedText } from "@/app-example/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { SignIn } from "@/utils/fetches";
import { useGlobalContext } from "@/context/GlobalProvider";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import FormField from "./FormField";
import CustomButton from "./CustomButton";

const SignInForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { setIsLoggedIn, setName, setEmail, setUserId, signOut } =
    useGlobalContext();

  const onLogin = async () => {
    setIsSubmitted(true);
    console.log(userEmail, password);

    if (userEmail === "" || password === "") {
      console.log("Please fill in all fields");
      Alert.alert("Error", "Please fill in all fields");
    }
    const res = await SignIn({ email: userEmail, password: password });
    if (res.responseStatus === 401) {
      Alert.alert("Error", "Invalid email or password");
      console.log("Invalid email or password");
      signOut();
      setIsSubmitted(false);
    }

    if (res.responseStatus === 200) {
      setIsLoggedIn(true);
      setName(res.username);
      setEmail(res.email);
      setUserId(res.userId);
    }
    console.log(res);
    setIsSubmitted(true);
    router.push("/(tabs)/(profile)");
  };

  return (
    <View style={styles.container}>
      <FormField
        title="User Email"
        value={userEmail}
        onTextChange={setUserEmail}
        placeholder="User Email"
        keyboardType="email-address"
      />
      <FormField
        title="Password"
        value={password}
        onTextChange={setPassword}
        placeholder="Password"
      />
      <CustomButton title="Sign In" onPress={onLogin} />
    </View>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  labelText: {
    fontSize: 20,
  },
  formField: {
    width: "100%",

    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  formFieldInputWrapper: {
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.primary,
    backgroundColor: CustomDarkTheme.colors.card,
    borderRadius: 6,
  },
  formFieldInput: {
    flex: 1,
    paddingLeft: 10,
    color: CustomDarkTheme.colors.text,
    fontSize: 20,
  },
  showPasswordIcon: {
    right: 10,
  },

  button: {
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CustomDarkTheme.colors.notification,
    borderRadius: 6,
  },
  buttonText: {
    color: CustomDarkTheme.colors.primary,
    fontSize: 20,
  },
  alertStyle: {
    color: CustomDarkTheme.colors.primary,
    fontSize: 20,
  },
});
