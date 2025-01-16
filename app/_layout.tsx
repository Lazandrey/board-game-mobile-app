import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import GlobalProvider from "@/context/GlobalProvider";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const CustomDarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#3E4849",
    background: "#373B3C",
    card: "#687D78",
    text: "white",
    border: "#E5AF89",
    notification: "#E3CEAF",
  },
  fonts: DarkTheme.fonts,
};

// export const CustomDarkTheme: Theme = {
//   dark: true,
//   colors: {
//     primary: "#3E4849",
//     background: "#373B3C",
//     card: "#687D78",
//     text: "white",
//     border: "#E5AF89",
//     notification: "#E3CEAF",
//   },
//   fonts: DarkTheme.fonts,
// };

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
      <ThemeProvider value={CustomDarkTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(profile)" options={{ headerShown: false }} />
          <Stack.Screen name="(games)" options={{ headerShown: false }} />
          <Stack.Screen name="(events)" options={{ headerShown: false }} />

          <Stack.Screen name="+not-found" options={{ headerShown: true }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GlobalProvider>
  );
}
