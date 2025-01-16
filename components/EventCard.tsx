import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { EventType } from "@/types/game.types";

import ThemedText from "./ThemedText";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { CustomDarkTheme } from "@/app/_layout";

type EventCardProps = {
  card: EventType;
};

const EventCard = ({ card }: EventCardProps) => {
  const { colors } = useTheme();
  const GlobalContext = useGlobalContext();
  const [isHost, setIsHost] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  useEffect(() => {
    setIsHost(GlobalContext.userId === card.host.id);
    setIsJoined(
      card.accepted_persons_ids.some((p) => p.user.id === GlobalContext.userId)
    );
  }, [GlobalContext.userId]);

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/(events)/[id]",
          params: { id: card.id },
        });
      }}
    >
      <View
        style={{ ...styles.eventCardWrapper, backgroundColor: colors.card }}
      >
        <View style={styles.userStatusLine}>
          {isHost && (
            <View style={styles.hostBadgeWrapper}>
              <ThemedText style={styles.hostBadgeText}>Host</ThemedText>
            </View>
          )}
          {isJoined && (
            <View style={styles.hostBadgeWrapper}>
              <ThemedText style={styles.hostBadgeText}>Joined</ThemedText>
            </View>
          )}
        </View>
        <View style={styles.eventGameWrapper}>
          <View>
            <Image
              style={styles.gameImage}
              source={{ uri: card.game.gameImageUrl }}
            />
          </View>

          <View style={styles.gameTitleWrapper}>
            <ThemedText style={styles.gameTitle}>{card.game.title}</ThemedText>
          </View>
        </View>
        <View style={styles.eventGameDescriptionWrapper}>
          <ThemedText
            style={styles.gameDescription}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {card.game.description}
          </ThemedText>
        </View>

        <View style={styles.eventDetailsWrapper}>
          <View style={styles.dateTimeWrapper}>
            <ThemedText style={styles.dateTimeText}>
              Date:{" "}
              {new Date(card.date_time).toLocaleDateString(
                "lt-LT",
                dateOptions
              )}
              {", "}
              {new Date(card.date_time).toLocaleTimeString("lt-LT", {
                hour: "2-digit",
                minute: "2-digit",
              })}
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
    paddingVertical: 10,
    borderRadius: 4,
    overflow: "hidden",
  },
  eventGameWrapper: {
    display: "flex",
    flexDirection: "row",
  },

  gameImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginRight: 8,
    overflow: "hidden",
  },
  gameTitleWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  gameTitle: {
    overflow: "hidden",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  eventGameDescriptionWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  gameDescription: {
    fontSize: 30,
  },
  eventDetailsWrapper: {
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
    fontSize: 25,
    fontWeight: "bold",
  },
  saetsAvailableWrapper: {
    width: "100%",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saetsAvailableText: {
    fontSize: 25,
  },
  eventDescriptionText: {
    width: "100%",
    fontSize: 22,
  },
  hostBadgeWrapper: {
    backgroundColor: CustomDarkTheme.colors.notification,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  hostBadgeText: {
    fontSize: 16,
    color: CustomDarkTheme.colors.primary,
  },

  userStatusLine: {
    display: "flex",
    flexDirection: "row",

    gap: 5,
  },
});
