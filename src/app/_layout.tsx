import { ThemeProvider } from "@/components/theme-provider";
import * as AC from "@bacons/apple-colors";
import Stack from "expo-router/stack";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { isLiquidGlassAvailable } from "expo-glass-effect";

const AppleStackPreset: NativeStackNavigationOptions =
  process.env.EXPO_OS !== "ios"
    ? {}
    : isLiquidGlassAvailable()
    ? {
        headerTransparent: true,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          color: AC.label as any,
        },
        headerBlurEffect: "none",
        headerBackButtonDisplayMode: "minimal",
      }
    : {
        headerTransparent: true,
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerBlurEffect: "systemChromeMaterial",
        headerBackButtonDisplayMode: "default",
      };

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={AppleStackPreset}>
        <Stack.Screen
          name="index"
          options={{
            title: "Nova",
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen
          name="companion"
          options={{
            title: "Your Companion",
            presentation: "formSheet",
            sheetGrabberVisible: true,
            sheetAllowedDetents: [0.65, 1.0],
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
