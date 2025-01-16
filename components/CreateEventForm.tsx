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
import { createEvent, GetGameById, GetGames } from "@/utils/fetches";
import ThemedText from "./ThemedText";
import GameThumbnail from "./GameThumbnail";
import FormField from "./FormField";
import NumericInput from "./NumericInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CustomDarkTheme } from "@/app/_layout";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";

const CreateEventForm = () => {
  const GlobalContext = useGlobalContext();
  const [isGameSelectOpen, setGameSelectOpen] = useState<Boolean>(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [dateTimePickerMode, setdateTimePickerMode] = useState<"date" | "time">(
    "date"
  );
  const [dateLabel, setDateLabel] = useState("Select Date");
  const [timeLabel, setTimeLabel] = useState("Select Time");
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [onPage, setOnPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSorting, setSelectedSorting] =
    useState<SortGameFileds>("rating");
  const [showsData, setShowsData] = useState<GameType[]>([]);
  const { data, loading, refetch } = useFetch(() =>
    GetGames({
      title: searchQuery,
      sortField: selectedSorting,
      startIndex: (page - 1) * onPage,
      offset: onPage,
    })
  );
  const Refresh = async () => {
    setRefreshing(true);

    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (data) {
      if (page < 3) {
        setShowsData([]);
      }
      setShowsData((prevShowsData) => [...prevShowsData, ...data]);
    }
  }, [data]);

  const onRefresh = async () => {
    setPage(1);
  };

  const onEndReached = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    Refresh();
  }, [page]);

  useEffect(() => {
    setPage(1);
    Refresh();
  }, [searchQuery, selectedSorting]);

  const onSelectGame = (game: GameType) => {
    setGame(game);
    setPlayersQty(game.maxPlayers);
    setGameSelectOpen(!isGameSelectOpen);
  };

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
  const [country, setCountry] = useState("Lietuva");

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

    const newEvent: EventType = {
      id: uuidv4(),
      game: game,
      number_persons: playersQty,
      price: price,
      description: description,
      date_time: eventDate,
      address: {
        street: street,
        city: city,
        country: country,
      },
      accepted_persons_ids: [],
      isCanceled: false,
      host: { name: GlobalContext.name, id: GlobalContext.userId },
      geolocation: {
        coordinates: [0, 0],
      },
    };
    console.log(newEvent);
    const res = await createEvent(newEvent);
    console.log(res);
    if (res === 201) {
      Alert.alert("Event created successfully");
      router.push("/(tabs)/events");
    } else {
      Alert.alert("Failed to create event");
    }
  };

  return (
    <View style={styles.container}>
      {isGameSelectOpen && (
        <ScrollView horizontal={true} scrollEnabled={false}>
          <FlatList
            contentContainerStyle={{ gap: 20 }}
            data={showsData}
            keyExtractor={(game) => game.id}
            renderItem={({ item }) => (
              <GameCard game={item} onPress={() => onSelectGame(item)} />
            )}
            ListHeaderComponent={() => (
              <View style={styles.title}>
                <GameSearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedSorting={selectedSorting}
                  setSelectedSorting={setSelectedSorting}
                />
              </View>
            )}
            onEndReachedThreshold={0.8}
            onEndReached={onEndReached}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </ScrollView>
      )}
      <ScrollView contentContainerStyle={styles.wrapper}>
        {!isGameSelectOpen && <Header />}
        {!game && (
          <CustomButton
            title="Select game to play"
            onPress={() => setGameSelectOpen(!isGameSelectOpen)}
          />
        )}

        {game && (
          <View style={styles.eventInputContainer}>
            <GameThumbnail game={game} />
            <ThemedText style={styles.textLabal}>
              Play time, min : {game.minPlayTime} - {game.maxPlayTime}
            </ThemedText>
            <View style={styles.numInputContainer}>
              <ThemedText style={styles.textLabal}>Players qty : </ThemedText>
              <NumericInput
                value={playersQty}
                onChange={(value) => setPlayersQty(value)}
                min={game.minPlayers}
                max={game.maxPlayers}
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
            <CustomButton title="Create event" onPress={onEventSubmit} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CreateEventForm;

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
