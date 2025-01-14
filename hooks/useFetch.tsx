import { useEffect, useState } from "react";
import { Alert } from "react-native";
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

export const useFetch = <T extends unknown[]>(
  fn: () => Promise<T>
): {
  data: T | null;
  loading: boolean;
  refetch: () => void;
} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    console.log("fetchingData");
    setLoading(true);
    try {
      console.log("fetching");
      console.log(fn);
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};
