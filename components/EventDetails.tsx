import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { EventType } from "@/types/game.types";
import { Link, router } from "expo-router";
import ThemedText from "./ThemedText";
import { useGlobalContext } from "@/context/GlobalProvider";
import { CustomDarkTheme } from "../app/_layout";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { cancelRegistrationToEvent, registerToEvent } from "@/utils/fetches";

const EventDetails = (event: EventType) => {
  const GlobalContext = useGlobalContext();
  const date = new Date(event.date_time);
  const [userIndex, setUserIndex] = useState(-1);
  const getDistance = (
    lat1: number | undefined,
    lon1: number | undefined,
    lat2: number,
    lon2: number
  ) => {
    if (lat1 === undefined || lon1 === undefined) {
      return 0;
    }
    const degToRad = (deg: number) => deg * (Math.PI / 180);
    const R = 6371; // Radius of the earth in km
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const onLeave = async () => {
    const res = await cancelRegistrationToEvent(event.id);
    if (res === 200) {
      event.accepted_persons_ids.splice(userIndex, 1);
      setUserIndex(-1);
    }
    if (res === 401) {
      GlobalContext.signOut();
    }
  };

  const onJoin = async () => {
    const res = await registerToEvent(event.id);
    if (res === 200) {
      event.accepted_persons_ids.push({
        user: {
          id: GlobalContext.userId,
          name: GlobalContext.name,
        },
        user_id: GlobalContext.userId,
        addedAt: new Date(),
      });
      setUserIndex(event.accepted_persons_ids.length - 1);
    }
    if (res === 401) {
      GlobalContext.signOut();
    }
  };

  useEffect(() => {
    const idx = event.accepted_persons_ids.findIndex(
      (person) => person.user.id === GlobalContext.userId
    );

    setUserIndex(idx);
  }, []);
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/(games)/[id]",
              params: { id: event.game.id },
            });
          }}
        >
          <ThemedText style={styles.gameTitle}>{event.game.title}</ThemedText>
          <Image
            source={{ uri: event.game.gameImageUrl }}
            style={styles.gameImage}
          />
        </TouchableOpacity>
        <ThemedText style={styles.evenText}>
          Number of players: {event.number_persons}
        </ThemedText>
        <ThemedText style={styles.evenText}>Host: {event.host.name}</ThemedText>
        <ThemedText style={styles.evenText}>
          Address: {event.address.street}
        </ThemedText>
        <ThemedText style={styles.evenText}>
          City: {event.address.city}
        </ThemedText>
        <ThemedText style={styles.evenText}>
          Country: {event.address.country}
        </ThemedText>
        <ThemedText style={styles.evenText}>
          Distance:{" "}
          {getDistance(
            GlobalContext.location?.lat,
            GlobalContext.location?.lng,
            event.geolocation.coordinates[1],
            event.geolocation.coordinates[0]
          ).toFixed(2)}{" "}
          km
        </ThemedText>
        <Link
          style={styles.googleLink}
          href={`https://www.google.com/maps/dir/${GlobalContext.location?.lat},${GlobalContext.location?.lng}/${event.geolocation.coordinates[1]},${event.geolocation.coordinates[0]}`}
        >
          Plan your route on Google Maps
        </Link>
        <ThemedText style={styles.evenText}>
          Date: {date.toLocaleDateString("lt-LT")}
        </ThemedText>
        <ThemedText style={styles.evenText}>
          Time: {date.toLocaleTimeString("lt-LT")}
        </ThemedText>
        <View style={styles.descriptionWrapper}>
          <ThemedText style={styles.evenText}>
            Descsription from host:
          </ThemedText>
          <ThemedText style={styles.descriptionText}>
            {event.description}
          </ThemedText>
        </View>
        <ThemedText style={styles.evenText}>
          Price: {event.price} Eur
        </ThemedText>
        <ThemedText style={styles.evenText}>
          Accepted players: {event.accepted_persons_ids.length}
        </ThemedText>
        {GlobalContext.isLoggedIn &&
          (userIndex !== -1 ? (
            <CustomButton title="Leave event" onPress={onLeave} />
          ) : (
            event.number_persons - event.accepted_persons_ids.length > 0 && (
              <CustomButton title="Join event" onPress={onJoin} />
            )
          ))}
        <ThemedText style={styles.evenText}>Players who joined:</ThemedText>
        <View style={styles.playerList}>
          <View style={styles.playersListLine}>
            <ThemedText style={styles.playerListLineItem}>Name:</ThemedText>
            <ThemedText style={styles.playerListLineItem}>Added at:</ThemedText>
          </View>
          {event.accepted_persons_ids.map((user) => {
            return (
              <View key={user.user.id} style={styles.playersListLine}>
                <ThemedText style={styles.playerListLineItem}>
                  {user.user.name}
                </ThemedText>
                <ThemedText style={styles.playerListLineItem}>
                  {new Date(user.addedAt).toLocaleDateString("lt-LT")}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  gameImage: {
    height: 250,
    width: "100%",
    objectFit: "contain",
  },
  gameTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  evenText: {
    fontSize: 16,
  },
  googleLink: {
    color: CustomDarkTheme.colors.notification,
  },
  descriptionWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  descriptionText: {
    color: CustomDarkTheme.colors.notification,
    fontSize: 16,
  },
  playerList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    backgroundColor: CustomDarkTheme.colors.primary,
  },
  playersListLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  playerListLineItem: {
    width: "50%",
    textAlign: "center",
  },
});
