import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { Link, router, Stack, useFocusEffect } from "expo-router";
import { ThemedText } from "@/app-example/components/ThemedText";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomButton from "@/components/CustomButton";
import { CustomDarkTheme } from "@/app/_layout";

const profile = () => {
  const GlobalContext = useGlobalContext();

  const onSignOut = () => {
    GlobalContext.signOut();
  };
  const onChangeUser = () => {
    router.push("/(profile)/updateUser");
  };

  const onSignIn = () => {
    router.push("/(profile)/signin");
  };
  useFocusEffect(() => {
    if (!GlobalContext.isLoggedIn) {
      router.push("/(profile)/signin");
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Profile",
          headerTitleAlign: "center",
        }}
      />
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
    color: CustomDarkTheme.colors.text,
    textAlign: "center",
  },
});
