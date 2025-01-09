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

export const useFetch = (fn: () => Promise<EventType[] | GameType[]>) => {
  const [data, setData] = useState<EventType[] | GameType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
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
  console.log(data, loading, refetch);
  return { data, loading, refetch };
};
