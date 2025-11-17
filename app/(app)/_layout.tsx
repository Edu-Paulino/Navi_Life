import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      {/* A tela de onboarding foi movida para o nível raiz para corrigir o fluxo de roteamento */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
