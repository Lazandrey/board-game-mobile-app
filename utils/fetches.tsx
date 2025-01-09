import {
  EventRegisterType,
  GetEventsType,
  GetEventType,
  GetGamesType,
  GetGameType,
  IsUserRegisteredType,
  SaveEventType,
  UpdateEventType,
  EventType,
  GameType,
  GameSearchType,
} from "@/types/game.types";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

const hostAddress = `http://192.168.1.3:3002`;
// const hostAddress = process.env.BASE_URL;

export const GetEvents = async ({
  gameTitle,
  dateTime,
  hostId,
  isCanceled,
  userGeolocation,
  distance,
}: GetEventsType): Promise<EventType[]> => {
  try {
    // const token = await SecureStore.getItemAsync("authToken");
    // if (!token) throw new Error("No token found");
    const token = "";
    const headers = {
      authorization: token,
    };
    console.log(
      gameTitle,
      dateTime,
      hostId,
      isCanceled,
      userGeolocation,
      distance
    );
    let startDate;
    if (dateTime) {
      startDate = new Date(dateTime).toISOString();
    }

    const response = await axios.get(
      `${hostAddress}/event?title=${gameTitle}&startDate=${startDate}&hostId=${hostId}&isCanceled=${isCanceled}&userLongitude=${userGeolocation?.longitude}&userLatitude=${userGeolocation?.latitude}&distance=${distance}`,
      {
        headers,
      }
    );

    return response.data.events;
  } catch (error: unknown) {
    console.log(error);
  }
  return [];
};

export const GetGames = async (
  gameSearchProps: GameSearchType
): Promise<GameType[]> => {
  try {
    const token = "";
    const headers = {
      authorization: token,
    };
    if (!gameSearchProps.sortField) {
      gameSearchProps.sortField = "rating";
    }
    const response = await axios.get(
      `${hostAddress}/game?title=${gameSearchProps.title}&sortField=${gameSearchProps.sortField}&start=${gameSearchProps.startIndex}&gamesOnPage=${gameSearchProps.offset}`,
      {
        headers,
      }
    );
    return response.data.games;
  } catch (error: unknown) {
    console.log(error);
  }
  return [];
};
