import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "@/components/Header";
import { CustomDarkTheme } from "@/app/_layout";
import UpdateUserForm from "@/components/UpdateUserForm";

const updateUser = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <UpdateUserForm />
      </ScrollView>
    </SafeAreaView>
  );
};

export default updateUser;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 10,
    backgroundColor: CustomDarkTheme.colors.background,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  scrollContainer: {
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
    fontSize: 20,
  },
  linkText: {
    color: CustomDarkTheme.colors.border,
    fontSize: 20,
  },
});
