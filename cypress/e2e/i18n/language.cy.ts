const LOGIN_TITLE_BY_LOCALE = {
  'pt-BR': 'Acesse sua conta',
  'en-US': 'Access your account',
} as const;

describe('I18n / Language', () => {
  beforeEach(() => {
    cy.clearAuthSession();
    cy.clearI18nLocale();
  });

  describe('on login page', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('starts with the default locale', () => {
      cy.contains(LOGIN_TITLE_BY_LOCALE['pt-BR']).should('be.visible');
      cy.get('html').should('have.attr', 'lang', 'pt-BR');
    });

    it('switches from default to English', () => {
      cy.contains(LOGIN_TITLE_BY_LOCALE['pt-BR']).should('be.visible');

      cy.selectLanguage('en-US');

      cy.assertLocale('en-US');
      cy.contains(LOGIN_TITLE_BY_LOCALE['en-US']).should('be.visible');
      cy.contains(LOGIN_TITLE_BY_LOCALE['pt-BR']).should('not.exist');
    });

    it('persists selected locale after reload', () => {
      cy.selectLanguage('en-US');
      cy.assertLocale('en-US');

      cy.reload();

      cy.assertLocale('en-US');
      cy.contains(LOGIN_TITLE_BY_LOCALE['en-US']).should('be.visible');
    });
  });
});
