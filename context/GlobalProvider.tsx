import React, { createContext, useContext, useEffect, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import * as Location from "expo-location";
export type UserContextType = {
  isLoggedIn: boolean;
  searchDistanceKm: number;
  location?: { lat: number; lng: number };
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
  //   const [isLoggedIn, setIsLoggedIn] = useStorageState<boolean>(
  //     false,
  //     "isLoggedIn"
  //   );
  //   const [name, setName] = useStorageState<string>("");
  //   const [email, setEmail] = useStorageState<string>("");
  //   const [userId, setUserId] = useStorageState<string>("");
  //   const [location, setLocation] = useStorageState<{ lat: number; lng: number } | null>(null, 'location');

  const [location, setLocation] = useState<Location.LocationObject>({
    coords: { latitude: 0, longitude: 0 },
  } as Location.LocationObject);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchDistanceKm, setSearchDistanceKm] = useState<number>(20);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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

    getCurrentLocation();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        searchDistanceKm,
        location: {
          lat: location?.coords.latitude,
          lng: location?.coords.longitude,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
