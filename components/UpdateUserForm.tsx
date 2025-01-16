import {
  Alert,
  Platform,
  ScrollView,
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
import { SignIn, updateUser } from "@/utils/fetches";
import { useGlobalContext } from "@/context/GlobalProvider";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import FormField from "./FormField";
import CustomButton from "./CustomButton";

const UpdateUserForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [distance, setDistance] = useState(0);

  const GlobalContext = useGlobalContext();

  const onUpdate = async () => {
    setIsSubmitted(true);
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        setIsSubmitted(false);
        return;
      }
    } else {
      setNewPassword(password);
    }

    if (userEmail === "" || password === "") {
      Alert.alert("Error", "Please fill in all fields");
      setIsSubmitted(false);
      return;
    }
    console.log(
      userEmail,
      password,
      userName,
      GlobalContext.userId,
      newPassword,
      distance
    );
    const res = await updateUser({
      email: userEmail,
      password: password,
      name: userName,
      id: GlobalContext.userId,
      newPassword: newPassword,
    });
    console.log(res);

    if (res.responseStatus === 200) {
      GlobalContext.setIsLoggedIn(true);
      GlobalContext.setName(res.username);
      GlobalContext.setEmail(res.email);
      GlobalContext.setUserId(res.userId);
      GlobalContext.setSearchDistanceKm(distance);
    }
    console.log(res);
    setIsSubmitted(true);
    router.push("/(tabs)/profile");
  };

  useEffect(() => {
    setUserEmail(GlobalContext.email);
    setUsername(GlobalContext.name);
    setDistance(GlobalContext.searchDistanceKm);
  }, []);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.labelText}>
        Please enter current password to confirm changes
      </ThemedText>
      <FormField
        title="User Name/Nickname"
        value={userName}
        onTextChange={setUsername}
        placeholder="User Name/Nickname"
      />
      <FormField
        title="User Email"
        value={userEmail}
        onTextChange={setUserEmail}
        placeholder="User Email"
        keyboardType="email-address"
      />
      <FormField
        title="Show events within, km"
        value={distance.toString()}
        onTextChange={(value) => {
          setDistance(parseInt(value));
        }}
        placeholder="User Email"
        keyboardType="numeric"
      />
      <FormField
        title="Current password"
        value={password}
        onTextChange={setPassword}
        placeholder="Current password"
      />
      <FormField
        title="New password"
        value={newPassword}
        onTextChange={setNewPassword}
        placeholder="New password"
      />
      <FormField
        title="Confirm password"
        value={confirmPassword}
        onTextChange={setConfirmPassword}
        placeholder="Confirm password"
      />
      <CustomButton title="Update Profile" onPress={onUpdate} />
    </View>
  );
};

export default UpdateUserForm;

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
    color: CustomDarkTheme.colors.notification,
    textAlign: "center",
  },
});
