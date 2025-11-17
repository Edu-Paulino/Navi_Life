/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/` | `/(app)/(tabs)` | `/(app)/(tabs)/` | `/(app)/(tabs)/settings` | `/(app)/(tabs)/suggestions` | `/(app)/onboarding` | `/(app)/settings` | `/(app)/suggestions` | `/(auth)` | `/(auth)/login` | `/(auth)/signup` | `/(tabs)` | `/(tabs)/` | `/(tabs)/agenda` | `/(tabs)/content` | `/(tabs)/settings` | `/(tabs)/suggestions` | `/(tabs)/wellness` | `/_sitemap` | `/agenda` | `/content` | `/login` | `/onboarding` | `/settings` | `/signup` | `/suggestions` | `/wellness`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
