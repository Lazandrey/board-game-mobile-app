import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import Header from "./Header";
import GameCard from "./GameCard";
import GameSearchBar from "./GameSearchBar";
import { EventType, GameType, SortGameFileds } from "@/types/game.types";
import { useFetch } from "@/hooks/useFetch";
import { createEvent, GetEventById, updateEventById } from "@/utils/fetches";
import ThemedText from "./ThemedText";
import GameThumbnail from "./GameThumbnail";

import NumericInput from "./NumericInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CustomDarkTheme } from "@/app/_layout";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { ThemedView } from "./ThemedView";

type UpdateEventFormProps = {
  id: string;
};
const UpdateEventForm = ({ id }: UpdateEventFormProps) => {
  const GlobalContext = useGlobalContext();
  const [isGameSelectOpen, setGameSelectOpen] = useState<Boolean>(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [dateTimePickerMode, setdateTimePickerMode] = useState<"date" | "time">(
    "date"
  );
  const [dateLabel, setDateLabel] = useState("Select Date");
  const [timeLabel, setTimeLabel] = useState("Select Time");
  const [refreshing, setRefreshing] = useState(false);

  let event: EventType = {
    id: "",
    game: {} as GameType,
    number_persons: 0,
    price: 0,
    description: "",
    date_time: new Date(),
    address: { street: "", city: "", country: "" },
    accepted_persons_ids: [],
    isCanceled: false,
    host: { name: "", id: "" },
    geolocation: { coordinates: [0, 0] },
  };
  const [pageTitle, setPageTitle] = useState(" ");
  const { data, loading, refetch } = useFetch(() => GetEventById(id as string));

  if (data) {
    event = data[0];
  }

  const selectDate = () => {
    setdateTimePickerMode("date");
    setShowDateTimePicker(true);
  };
  const selectTime = () => {
    setdateTimePickerMode("time");
    setShowDateTimePicker(true);
  };

  const onDateTimeChange = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate !== undefined) {
      if (dateTimePickerMode === "date") {
        setDate(selectedDate);
        setDateLabel(
          selectedDate.toLocaleDateString("lt-LT", {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        );
      } else {
        setTime(selectedDate);
        setTimeLabel(
          selectedDate.toLocaleTimeString("lt-LT", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    }
    setShowDateTimePicker(false);
  };

  const [game, setGame] = useState<GameType | null>(null);
  const [playersQty, setPlayersQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const onEventSubmit = async () => {
    if (!game) {
      Alert.alert("Game is required");
      return;
    }
    if (playersQty < game.minPlayers || playersQty > game.maxPlayers) {
      Alert.alert(
        `Players qty should be between ${game.minPlayers} and ${game.maxPlayers}`
      );
      return;
    }
    if (price < 0) {
      Alert.alert("Price should be greater than 0");
      return;
    }
    if (!description) {
      Alert.alert("Description is required");
      return;
    }
    if (!street) {
      Alert.alert("Street is required");
      return;
    }
    if (!city) {
      Alert.alert("City is required");
      return;
    }
    if (!country) {
      Alert.alert("Country is required");
      return;
    }
    if (!date) {
      Alert.alert("Date is required");
      return;
    }
    if (!time) {
      Alert.alert("Time is required");
      return;
    }
    console.log("event submit");
    const eventDate = new Date(date);
    eventDate.setHours(time.getHours());
    eventDate.setMinutes(time.getMinutes());

    event.number_persons = playersQty;
    event.price = price;
    event.description = description;
    event.date_time = eventDate;
    event.address.street = street;
    event.address.city = city;
    event.address.country = country;
    event.date_time = new Date(eventDate);
    event.price = price;

    const res = await updateEventById({ id: event.id, event });

    if (res === 200) {
      Alert.alert("Event updated successfully");
      router.push(`/(events)/${event.id}`);
    } else {
      Alert.alert("Failed to update event");
    }
  };

  useEffect(() => {
    const eventDate = new Date(event.date_time);
    eventDate.setMinutes(
      eventDate.getMinutes() - eventDate.getTimezoneOffset()
    );
    setGame(event.game);
    setPlayersQty(event.number_persons);
    setPrice(event.price);
    setDescription(event.description);
    setStreet(event.address.street);
    setCity(event.address.city);
    setCountry(event.address.country);
    setDate(new Date(event.date_time));
    setTime(new Date(event.date_time));
    setDateLabel(
      eventDate.toLocaleDateString("lt-LT", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    );
    setTimeLabel(
      eventDate.toLocaleTimeString("lt-LT", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [event]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Header />

        {true && (
          <View style={styles.eventInputContainer}>
            <GameThumbnail game={event.game} />
            <ThemedText style={styles.textLabal}>
              Play time, min : {event.game.minPlayTime} -{" "}
              {event.game.maxPlayTime}
            </ThemedText>
            <View style={styles.numInputContainer}>
              <ThemedText style={styles.textLabal}>Players qty : </ThemedText>
              <NumericInput
                value={playersQty}
                onChange={(value) => setPlayersQty(value)}
                min={event.game.minPlayers}
                max={event.game.maxPlayers}
                iconSize={22}
                fontSize={18}
              />
            </View>
            <View style={styles.numInputContainer}>
              <ThemedText style={styles.textLabal}>
                Price for 1 player, Eur :{" "}
              </ThemedText>
              <NumericInput
                value={price}
                onChange={(value) => setPrice(value)}
                min={0}
                max={100}
                iconSize={22}
                fontSize={18}
              />
            </View>

            <TextInput
              style={styles.descriptionInput}
              placeholder="Description"
              placeholderTextColor={CustomDarkTheme.colors.background}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
            />
            <View style={styles.dateTimePickerContainer}>
              <ThemedText
                style={styles.dateTimePickerButton}
                onPress={selectDate}
              >
                {dateLabel}
              </ThemedText>
              <ThemedText
                style={styles.dateTimePickerButton}
                onPress={selectTime}
              >
                {timeLabel}
              </ThemedText>
              {showDateTimePicker && (
                <DateTimePicker
                  value={date}
                  mode={dateTimePickerMode}
                  display="default"
                  onChange={onDateTimeChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
            <View style={styles.addressInputContainer}>
              <ThemedText style={styles.textLabal}>Address:</ThemedText>
              <TextInput
                style={styles.descriptionInput}
                placeholder="Street"
                placeholderTextColor={CustomDarkTheme.colors.background}
                value={street}
                onChangeText={setStreet}
              />
              <TextInput
                style={styles.descriptionInput}
                placeholder="City"
                placeholderTextColor={CustomDarkTheme.colors.background}
                value={city}
                onChangeText={setCity}
              />
              <TextInput
                style={styles.descriptionInput}
                placeholder="Country"
                placeholderTextColor={CustomDarkTheme.colors.background}
                value={country}
                onChangeText={setCountry}
              />
            </View>
            <CustomButton title="Update event" onPress={onEventSubmit} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default UpdateEventForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 20,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  title: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  eventInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    justifyContent: "flex-start",
  },
  numInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  textLabal: {
    fontSize: 20,
    textAlign: "center",
  },
  descriptionInput: {
    fontSize: 20,
    textAlign: "left",
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.border,
    borderRadius: 4,
    padding: 10,
    backgroundColor: CustomDarkTheme.colors.text,
    paddingHorizontal: 10,
  },

  dateTimePickerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dateTimePickerButton: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.border,
    borderRadius: 4,
    padding: 10,
    fontSize: 20,
  },
  addressInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});
