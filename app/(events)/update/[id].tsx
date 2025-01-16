import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import UpdateEventForm from "../../../components/EditEvent";

const UpdateEvent = () => {
  const { id } = useLocalSearchParams() as { id: string };
  return <UpdateEventForm id={id} />;
};

export default UpdateEvent;

const styles = StyleSheet.create({});
