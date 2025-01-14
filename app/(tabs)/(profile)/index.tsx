import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { Link, router, useFocusEffect } from "expo-router";
import { ThemedText } from "@/app-example/components/ThemedText";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomButton from "@/components/CustomButton";

const profile = () => {
  const GlobalContext = useGlobalContext();

  const onSignOut = () => {
    GlobalContext.signOut();
  };
  const onChangeUser = () => {
    router.push("/(tabs)/(profile)/updateUser");
  };

  const onSignIn = () => {
    router.push("/(tabs)/(profile)/signin");
  };
  useFocusEffect(() => {
    console.log("lobalContext.isLoggedIn");
    if (!GlobalContext.isLoggedIn) {
      router.push("/(tabs)/(profile)/signin");
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.welcomeText}>
        Welcome, {GlobalContext.name}
      </ThemedText>

      <CustomButton title="Change profile" onPress={onChangeUser} />
      <CustomButton title="Sign In" onPress={onSignIn} />
      <CustomButton title="Sign Out" onPress={onSignOut} />
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: "100%",
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  welcomeText: {
    fontSize: 20,

    textAlign: "center",
  },
});
