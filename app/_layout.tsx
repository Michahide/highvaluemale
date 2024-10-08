import { Link, Stack } from "expo-router";
import { Button, Pressable, Text } from "react-native";
import { Circle, Path, Rect, Svg, SvgProps } from "react-native-svg";

export default function RootLayout(props: SvgProps) {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "High Value Male",
          headerStyle: {
            backgroundColor: "#fff700",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // headerRight: () => {
          //   return (
          //     <Link push href="/create">
          //       <Pressable>
          //         <Text
          //           style={{
          //             color: "white",
          //             marginRight: 10,
          //           }}
          //         >Create</Text>
          //       </Pressable>
          //     </Link>
          //   );
          // },
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: "Create new task",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => {
            return (
              <Link replace href={'/'}>
                <Pressable>
                  <Text
                    style={{
                      color: "white",
                      marginRight: 10,
                    }}
                  >Back</Text>
                </Pressable>
              </Link>
            );
          },
        }}
      />
      <Stack.Screen
        name="update"
        options={{
          title: "Update the task",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => {
            return (
              <Link replace href={'/'}>
                <Pressable>
                  <Text
                    style={{
                      color: "white",
                      marginRight: 10,
                    }}
                  >Back</Text>
                </Pressable>
              </Link>
            );
          },
        }}
      />
    </Stack>
  );
}
