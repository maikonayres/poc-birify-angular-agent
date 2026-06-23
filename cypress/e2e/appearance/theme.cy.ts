describe('Appearance / Theme', () => {
  beforeEach(() => {
    cy.clearAuthSession();
    cy.clearAppearancePreferences();
  });

  describe('on login page', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('starts in light mode by default', () => {
      cy.get('html').should('not.have.class', 'app-dark');
      cy.getThemeToggle().find('i').should('have.class', 'pi-sun');
    });

    it('toggles to dark and back to light', () => {
      cy.getThemeToggle().click();
      cy.assertTheme('dark');

      cy.getThemeToggle().click();
      cy.assertTheme('light');
    });

    it('persists dark theme after reload', () => {
      cy.getThemeToggle().click();
      cy.assertTheme('dark');

      cy.reload();
      cy.assertTheme('dark');
    });
  });

  describe('on authenticated home', () => {
    it('toggles theme from topbar', () => {
      cy.login();

      cy.get('html').should('not.have.class', 'app-dark');
      cy.getThemeToggle().find('i').should('have.class', 'pi-sun');

      cy.getThemeToggle().click();
      cy.assertTheme('dark');

      cy.getThemeToggle().click();
      cy.assertTheme('light');
    });
  });
});
