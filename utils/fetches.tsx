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
  setEvents,
  setFetchError,
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

    setEvents(response.data.events);

    return response.data.events;
  } catch (error: unknown) {
    console.log(error);
    const errorResponse = error as AxiosError;

    if (errorResponse.status !== undefined) {
      setFetchError(errorResponse.status);
    } else {
      setFetchError(null);
    }
  }
  return [];
};
