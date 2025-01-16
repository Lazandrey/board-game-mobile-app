import { Stack } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: true }} />
      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
          title: "Create your event",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          headerShown: true,
          title: "Update your event",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
