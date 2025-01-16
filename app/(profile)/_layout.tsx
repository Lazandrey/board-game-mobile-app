import { Stack } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{
          headerShown: true,
          title: "Sign in",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          title: "Sign up",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="updateUser" options={{ headerShown: true }} />
    </Stack>
  );
}
