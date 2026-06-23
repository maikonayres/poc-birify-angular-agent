export interface AppearancePreferences {
  preset: string;
  primary: string;
  surface: string | null;
  darkTheme: boolean;
  menuMode: string;
}

export type AppearanceStoreModel = AppearancePreferences;
