import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
// import { useColorScheme } from "@/components/useColorScheme";
// import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
// }

export default function MenuStack () {
  // const colorScheme = useColorScheme();

  return <Stack
    screenOptions={{
      headerRight: () => (
            <Link href="/cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
      }}
    >
   <Stack.Screen
        name="index"
        options={{ title: 'Menu' }}
      />
   {/* <Stack.Screen
        name="[id]"
        options={{ title: 'Product details' }}
      /> */}

{/*
by default, title will be name of file (index, [id])
https://reactnavigation.org/docs/headers/#setting-the-header-title */}
  </Stack>;
}
