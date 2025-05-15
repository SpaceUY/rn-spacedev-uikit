import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { UIKitProvider } from 'rn-spacedev-uikit';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  Sora_300Light,
  Sora_400Regular,
  Sora_500Medium,
  Sora_700Bold,
  useFonts,
} from '@expo-google-fonts/sora';
import { useUIKitTheme } from 'rn-spacedev-uikit';
import { Platform, useColorScheme } from 'react-native';
import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Sora_300Light,
    Sora_400Regular,
    Sora_500Medium,
    Sora_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded || Platform.OS === 'web') {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // On web, we don't need to wait for fonts to load
  if (!loaded && Platform.OS !== 'web') {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Layout />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const Layout = () => {
  const insets = useSafeAreaInsets();

  return (
    <UIKitProvider
      initialTheme={{
        colors: {
          light: {
            primary: '#09090B',
            foregroundOnPrimary: '#FFFFFF',
            background: '#FFFFFF',
            altBackground: '#FFFFFF',
            foreground: '#09090B',
            altForeground: '#FAFAFA',
            border: '#E4E4E7',
            destructive: '#DC2626',
            foregroundOnDestructive: '#FFFFFF',
          },
          dark: {
            primary: '#FAFAFA',
            foregroundOnPrimary: '#09090B',
            background: '#09090B',
            altBackground: '#09090B',
            foreground: '#FAFAFA',
            altForeground: '#18181B',
            border: '#27272A',
            destructive: '#DC2626',
            foregroundOnDestructive: '#FFFFFF',
          },
        },
        fonts: {
          light: 'Sora_300Light',
          regular: 'Sora_400Regular',
          medium: 'Sora_500Medium',
          bold: 'Sora_700Bold',
        },
        roundness: 6,
        insets,
      }}
    >
      <RootNavigator />
    </UIKitProvider>
  );
};

const RootNavigator = () => {
  const { setColorScheme, colors } = useUIKitTheme();
  const colorScheme = useColorScheme();

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme, setColorScheme]);

  const BackButton = () => (
    <Pressable
      {...(Platform.OS === 'web' && {
        style: { marginStart: 16, marginEnd: 8 },
      })}
      onPress={() => router.back()}
    >
      <ArrowLeft size={24} color={colors.foreground} />
    </Pressable>
  );

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.background,
        },
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.foreground },
        headerLeft: BackButton,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="ui-kit/tabs"
        options={{
          title: 'Tabs',
        }}
      />
      <Stack.Screen
        name="ui-kit/buttons"
        options={{
          title: 'Buttons',
        }}
      />
      <Stack.Screen
        name="ui-kit/inputs"
        options={{
          title: 'Inputs',
        }}
      />
      <Stack.Screen
        name="ui-kit/textarea"
        options={{
          title: 'Textarea',
        }}
      />
      <Stack.Screen
        name="ui-kit/texts"
        options={{
          title: 'Texts',
        }}
      />
      <Stack.Screen
        name="ui-kit/select"
        options={{
          title: 'Select',
        }}
      />
      <Stack.Screen
        name="ui-kit/checkboxes"
        options={{
          title: 'Checkboxes',
        }}
      />
      <Stack.Screen
        name="ui-kit/chips"
        options={{
          title: 'Chips',
        }}
      />
      <Stack.Screen
        name="ui-kit/icons"
        options={{
          title: 'Icons',
        }}
      />
      <Stack.Screen
        name="ui-kit/icon-buttons"
        options={{
          title: 'Icon Buttons',
        }}
      />
      <Stack.Screen
        name="ui-kit/otp-input"
        options={{
          title: 'Otp Input',
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          title: 'Theme',
        }}
      />
    </Stack>
  );
};
