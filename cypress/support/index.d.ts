declare namespace Cypress {
  interface Chainable {
    clearAuthSession(): Chainable<void>;
    login(email?: string, password?: string): Chainable<void>;
    clearAppearancePreferences(): Chainable<void>;
    clearI18nLocale(): Chainable<void>;
    getLanguageSelectorTrigger(): Chainable<JQuery<HTMLButtonElement>>;
    openLanguageSelector(): Chainable<void>;
    selectLanguage(locale: 'pt-BR' | 'en-US'): Chainable<void>;
    assertLocale(locale: 'pt-BR' | 'en-US'): Chainable<void>;
    getThemeToggle(): Chainable<JQuery<HTMLButtonElement>>;
    assertTheme(mode: 'light' | 'dark'): Chainable<void>;
  }
}
