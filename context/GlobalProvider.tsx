import React, { createContext, useContext, useEffect, useState } from "react";

import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
export type UserContextType = {
  isLoggedIn: boolean;
  searchDistanceKm: number;
  userId: string;
  name: string;
  email: string;
  location?: { lat: number; lng: number };
  setLocation: (location: Location.LocationObject) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setUserId: (userId: string) => void;
  signOut: () => void;
  setSearchDistanceKm: (searchDistanceKm: number) => void;
};

const GlobalContext = createContext<UserContextType | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
export default function GlobalProvider({ children }: any) {
  const [location, setLocation] = useState<Location.LocationObject>({
    coords: { latitude: 0, longitude: 0 },
  } as Location.LocationObject);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchDistanceKm, setSearchDistanceKm] = useState<number>(50);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const signOut = async () => {
    setIsLoggedIn(false);
    setName("");
    setEmail("");
    setUserId("");
    if (Platform.OS === "web") {
      await AsyncStorage.setItem("authToken", "");
    } else {
      await SecureStore.setItemAsync("authToken", "");
    }
    await AsyncStorage.setItem("userId", "");
    await AsyncStorage.setItem("userName", "");
    await AsyncStorage.setItem("email", "");
    await AsyncStorage.setItem("isLoggedIn", "false");
  };

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    const getStoredData = async () => {
      try {
        const DistanceStorage = await AsyncStorage.getItem("searchDistanceKm");

        if (DistanceStorage !== null) {
          setSearchDistanceKm(parseInt(DistanceStorage));
        } else {
          setSearchDistanceKm(50);
        }

        const isLoggedInStorage = await AsyncStorage.getItem("isLoggedIn");

        if (isLoggedInStorage === "true") {
          setIsLoggedIn(true);
        }
        const nameStorage = await AsyncStorage.getItem("userName");

        if (nameStorage !== null) {
          setName(nameStorage);
        }
        const emailStorage = await AsyncStorage.getItem("email");

        if (emailStorage !== null) {
          setEmail(emailStorage);
        }
        const userIdStorage = await AsyncStorage.getItem("userId");

        if (userIdStorage !== null) {
          setUserId(userIdStorage);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getCurrentLocation();

    getStoredData();
  }, []);
  useEffect(() => {}, [location]);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        searchDistanceKm,
        userId,
        name,
        email,
        location: {
          lat: location?.coords.latitude,
          lng: location?.coords.longitude,
        },
        setLocation,
        setIsLoggedIn,
        setName,
        setEmail,
        setUserId,
        signOut,
        setSearchDistanceKm,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
