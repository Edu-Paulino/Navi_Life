import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { session, loading, profile } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return; // Don't do anything while loading
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (session && profile) {
      // User is authenticated and has a profile
      if (!profile.onboarding_completed) {
        // Redirect to onboarding if not completed
        router.replace('/onboarding');
      } else if (inAuthGroup) {
        // Redirect away from auth screens if onboarding is complete
        router.replace('/(app)');
      }
    } else if (!session) {
      // User is not authenticated
      if (!inAuthGroup) {
        // Redirect to login if not already on an auth screen
        router.replace('/login');
      }
    }
  }, [session, loading, profile, segments, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary }}>
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    );
  }

  return <Slot />;
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <InitialLayout />
        <StatusBar style="light" />
      </AuthProvider>
    </ReduxProvider>
  );
}
