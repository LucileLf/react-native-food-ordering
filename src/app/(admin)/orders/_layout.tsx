import { Stack } from "expo-router";

export default function OrderStack () {
  // const colorScheme = useColorScheme();

  return <Stack>
   <Stack.Screen
        name="index"
        options={{ title: 'Orders' }}
      />
  </Stack>;
}
