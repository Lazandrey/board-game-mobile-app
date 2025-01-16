import {
  GetEventsType,
  EventType,
  GameType,
  GameSearchType,
  UserSignInPropsType,
  UserSignInType,
  UserSignUpPropsType,
  UserUpdatePropsType,
} from "@/types/game.types";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Platform } from "react-native";

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
    let token;
    if (Platform.OS === "web") {
      token = await AsyncStorage.getItem("authToken");
    } else {
      token = await SecureStore.getItemAsync("authToken");
    }
    if (!token) {
      token = "";
    }
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

    return response.data.events;
  } catch (error: unknown) {
    console.log(error);
  }
  return [];
};

export const GetEventById = async (id: string): Promise<EventType[]> => {
  try {
    let token;
    if (Platform.OS === "web") {
      token = await AsyncStorage.getItem("authToken");
    } else {
      token = await SecureStore.getItemAsync("authToken");
    }
    if (!token) {
      token = "";
    }
    const headers = {
      authorization: token,
    };
    const response = await axios.get(`${hostAddress}/event/${id}`, {
      headers,
    });

    return [response.data.event];
  } catch (error: unknown) {
    console.log(error);
  }
  return [] as EventType[];
};

export const GetGames = async (
  gameSearchProps: GameSearchType
): Promise<GameType[]> => {
  try {
    let token;
    if (Platform.OS === "web") {
      token = await AsyncStorage.getItem("authToken");
    } else {
      token = await SecureStore.getItemAsync("authToken");
    }
    if (!token) {
      token = "";
    }
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

export const GetGameById = async (id: string): Promise<GameType[]> => {
  try {
    let token;
    if (Platform.OS === "web") {
      token = await AsyncStorage.getItem("authToken");
    } else {
      token = await SecureStore.getItemAsync("authToken");
    }
    if (!token) {
      token = "";
    }
    const headers = {
      authorization: token,
    };
    const response = await axios.get(`${hostAddress}/game/${id}`, {
      headers,
    });
    return [response.data.game];
  } catch (error: unknown) {
    console.log(error);
  }
  return [] as GameType[];
};

export const SignIn = async (
  signInData: UserSignInPropsType
): Promise<UserSignInType> => {
  try {
    const response = await axios.post(`${hostAddress}/user/login`, signInData);

    if (response.status === 401) {
      console.log("Invalid credentials");
      return {
        isLoggedIn: false,
        token: "",
        email: "",
        username: "",
        userId: "",
        responseStatus: response.status,
      };
    }

    if (response.status === 200) {
      console.log("Login successful");

      if (Platform.OS === "web") {
        await AsyncStorage.setItem("authToken", response.data.token);
      } else {
        await SecureStore.setItemAsync("authToken", response.data.token);
      }
    }

    await AsyncStorage.setItem("userId", response.data.userId);
    await AsyncStorage.setItem("userName", response.data.userName);
    await AsyncStorage.setItem("email", signInData.email);
    await AsyncStorage.setItem("isLoggedIn", "true");

    return {
      isLoggedIn: true,
      token: response.data.token,
      email: signInData.email,
      username: response.data.userName,
      userId: response.data.userId,
      responseStatus: response.status,
    };
  } catch (error: unknown) {
    console.log("fetch error", error);
    const errorResponse = error as AxiosError;

    if (errorResponse.response?.status === 401) {
      if (Platform.OS === "web") {
        await AsyncStorage.setItem("authToken", "");
      } else {
        await SecureStore.setItemAsync("authToken", "");
      }
      await AsyncStorage.setItem("userId", "");
      await AsyncStorage.setItem("userName", "");
      await AsyncStorage.setItem("email", "");
      await AsyncStorage.setItem("isLoggedIn", "false");
      return {
        isLoggedIn: false,
        token: "",
        email: signInData.email,
        username: "",
        userId: "",
        responseStatus: errorResponse.response?.status,
      };
    }
    return {} as UserSignInType;
  }
};

export const Signup = async (
  signupData: UserSignUpPropsType
): Promise<UserSignInType> => {
  try {
    const response = await axios.post(`${hostAddress}/user/signin`, signupData);
    if (response.status === 201) {
      console.log("Login successful");
      console.log("token", response.data.tokenn);
      if (Platform.OS === "web") {
        await AsyncStorage.setItem("authToken", response.data.tokenn);
      } else {
        await SecureStore.setItemAsync("authToken", response.data.token);
      }
    }
    console.log(response.data.userName);
    console.log(response.data.userId);
    console.log(signupData.email);

    await AsyncStorage.setItem("userId", response.data.userId);
    await AsyncStorage.setItem("userName", response.data.userName);
    await AsyncStorage.setItem("email", signupData.email);
    await AsyncStorage.setItem("isLoggedIn", "true");

    return {
      isLoggedIn: true,
      token: response.data.token,
      email: signupData.email,
      username: response.data.userName,
      userId: response.data.userId,
      responseStatus: response.status,
    };
  } catch (error: unknown) {
    console.log(error);
    return {} as UserSignInType;
  }
};

export const updateUser = async (
  updateData: UserUpdatePropsType
): Promise<UserSignInType> => {
  try {
    let token;
    if (Platform.OS === "web") {
      token = await AsyncStorage.getItem("authToken");
    } else {
      token = await SecureStore.getItemAsync("authToken");
    }
    if (!token) {
      token = "";
    }

    const headers = {
      authorization: token,
    };

    const response = await axios.put(
      `${hostAddress}/user/update/`,
      updateData,
      {
        headers,
      }
    );
    if (response.status === 200) {
      if (Platform.OS === "web") {
        await AsyncStorage.setItem("authToken", response.data.tokenn);
      } else {
        await SecureStore.setItemAsync("authToken", response.data.token);
      }
      await AsyncStorage.setItem("userId", response.data.userId);
      await AsyncStorage.setItem("userName", response.data.userName);
      await AsyncStorage.setItem("email", updateData.email);
      await AsyncStorage.setItem("isLoggedIn", "true");
    }
    return {
      isLoggedIn: true,
      token: response.data.token,
      email: updateData.email,
      username: response.data.userName,
      userId: response.data.userId,
      responseStatus: response.status,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      isLoggedIn: false,
      token: "",
      email: "",
      username: "",
      userId: "",
      responseStatus: error,
    } as UserSignInType;
  }
};

export const cancelRegistrationToEvent = async (
  eventId: string
): Promise<number | undefined> => {
  try {
    let token;
    if (Platform.OS === "web") {
      token = await AsyncStorage.getItem("authToken");
    } else {
      token = await SecureStore.getItemAsync("authToken");
    }
    if (!token) {
      token = "";
    }

    const headers = {
      authorization: token,
    };

    const response = await axios.post(
      `${hostAddress}/event/${eventId}/decline`,
      {},
      {
        headers,
      }
    );

    return response.status;
  } catch (error) {
    console.log(error);
    const errorResponse = error as AxiosError;

    return errorResponse.response?.status;
  }
};

export const registerToEvent = async (
  eventId: string
): Promise<number | undefined> => {
  try {
    let token;
    if (Platform.OS === "web") {
      token = await AsyncStorage.getItem("authToken");
    } else {
      token = await SecureStore.getItemAsync("authToken");
    }
    if (!token) {
      token = "";
    }

    const headers = {
      authorization: token,
    };
    const response = await axios.post(
      `${hostAddress}/event/${eventId}/accept`,
      {},
      {
        headers,
      }
    );
    return response.status;
  } catch (error) {
    console.log(error);
    const errorResponse = error as AxiosError;

    return errorResponse.response?.status;
  }
};

export const createEvent = async (
  event: EventType
): Promise<number | undefined> => {
  try {
    let token;
    if (Platform.OS === "web") {
      token = await AsyncStorage.getItem("authToken");
    } else {
      token = await SecureStore.getItemAsync("authToken");
    }
    if (!token) {
      token = "";
    }

    const headers = {
      authorization: token,
    };
    const response = await axios.post(`${hostAddress}/event`, event, {
      headers,
    });
    return response.status;
  } catch (error) {
    console.log(error);
    const errorResponse = error as AxiosError;

    return errorResponse.response?.status;
  }
};
