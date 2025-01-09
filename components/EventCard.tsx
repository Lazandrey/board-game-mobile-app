import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useColorScheme,
} from "react-native";
import React from "react";
import { EventType } from "@/types/game.types";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { ThemedView } from "./ThemedView";
import ThemedText from "./ThemedText";
import { useTheme } from "@react-navigation/native";

type EventCardProps = {
  card: EventType;
};

const EventCard = ({ card }: EventCardProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity>
      <View
        style={{ ...styles.eventCardWrapper, backgroundColor: colors.card }}
      >
        <View style={styles.eventGameWrapper}>
          <View>
            <Image
              style={styles.gameImage}
              source={{ uri: card.game.gameImageUrl }}
            />
          </View>
          <View style={styles.eventGameDescriptionWrapper}>
            <ThemedText style={styles.gameTitle}>{card.game.title}</ThemedText>
            <ThemedText
              style={styles.gameDescription}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {card.game.description}
            </ThemedText>
          </View>
        </View>
        <View style={styles.eventDetailsWrapper}>
          <View style={styles.dateTimeWrapper}>
            <ThemedText style={styles.dateTimeText}>
              Date: {new Date(card.date_time).toLocaleDateString("lt-LT")}
            </ThemedText>
            <ThemedText style={styles.dateTimeText}>
              Time: {new Date(card.date_time).toLocaleTimeString("lt-LT")}
            </ThemedText>
          </View>
          <View style={styles.saetsAvailableWrapper}>
            <ThemedText style={styles.saetsAvailableText}>
              Seats available:{" "}
              {card.number_persons - card.accepted_persons_ids.length} of{" "}
              {card.number_persons}
            </ThemedText>
          </View>
          <ThemedText
            style={{
              ...styles.eventDescriptionText,
              color: colors.notification,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {card.description}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  eventCardWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 10,
  },
  eventGameWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  eventGameDescriptionWrapper: {
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flexShrink: 1,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  gameImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginRight: 8,
    overflow: "hidden",
  },
  gameTitle: {
    height: 30,
    overflow: "hidden",
    fontSize: 20,
    fontWeight: "bold",
  },
  gameDescription: {
    height: 70,
    // flex: 1,
    flexShrink: 1,
    overflow: "hidden",
    fontSize: 16,
  },
  eventDetailsWrapper: {
    height: 130,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  dateTimeWrapper: {
    width: "100%",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateTimeText: {
    fontSize: 18,
  },
  saetsAvailableWrapper: {
    width: "100%",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saetsAvailableText: {
    fontSize: 18,
  },
  eventDescriptionText: {
    width: "100%",
    fontSize: 18,
  },
});