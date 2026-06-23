Cypress.Commands.add('clearAppearancePreferences', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('appearance_preferences');
  });
});

Cypress.Commands.add('clearI18nLocale', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('i18n_locale');
  });
});

const LOCALE_FLAG_ASSET: Record<'pt-BR' | 'en-US', string> = {
  'pt-BR': 'br.svg',
  'en-US': 'us.svg',
};

Cypress.Commands.add('getLanguageSelectorTrigger', () => {
  return cy.get('app-language-selector-trigger button.language-selector-trigger__button');
});

Cypress.Commands.add('openLanguageSelector', () => {
  cy.getLanguageSelectorTrigger().click();
  cy.get('app-language-selector-panel').should('be.visible');
});

Cypress.Commands.add('selectLanguage', (locale: 'pt-BR' | 'en-US') => {
  cy.openLanguageSelector();
  cy.get('app-language-selector-panel')
    .find(`img[src*="${LOCALE_FLAG_ASSET[locale]}"]`)
    .closest('button')
    .click();
  cy.get('app-language-selector-panel').should('not.exist');
});

Cypress.Commands.add('assertLocale', (locale: 'pt-BR' | 'en-US') => {
  cy.get('html').should('have.attr', 'lang', locale);

  cy.window()
    .its('localStorage')
    .invoke('getItem', 'i18n_locale')
    .should('eq', locale);
});

Cypress.Commands.add('getThemeToggle', () => {
  return cy.get('app-appearance-theme-toggle button');
});

Cypress.Commands.add('assertTheme', (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  cy.get('html').should(isDark ? 'have.class' : 'not.have.class', 'app-dark');

  cy.getThemeToggle().find('i').should('have.class', isDark ? 'pi-moon' : 'pi-sun');

  cy.window()
    .its('localStorage')
    .invoke('getItem', 'appearance_preferences')
    .should('not.be.null')
    .then((raw) => {
      const preferences = JSON.parse(raw as string) as { darkTheme?: boolean };
      expect(preferences.darkTheme).to.eq(isDark);
    });
});
