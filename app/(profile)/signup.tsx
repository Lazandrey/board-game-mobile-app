import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomDarkTheme } from "@/app/_layout";
import Header from "@/components/Header";

import { ThemedText } from "@/app-example/components/ThemedText";
import { Link, Stack } from "expo-router";
import SignupForm from "@/components/SignupForm";

const signup = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <SignupForm />
        <View style={styles.textContainer}>
          <Text style={styles.textLabel}>Already have account?</Text>
          <Link style={styles.linkText} href="/signin">
            Signin
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default signup;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: CustomDarkTheme.colors.background,
    display: "flex",
    flexDirection: "column",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  textLabel: {
    color: CustomDarkTheme.colors.text,
    fontSize: 20,
  },
  linkText: {
    color: CustomDarkTheme.colors.border,
    fontSize: 20,
  },
});
