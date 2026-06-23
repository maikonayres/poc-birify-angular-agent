import './commands';
import './commands-appearance-i18n';

beforeEach(() => {
  cy.intercept('POST', '**/api/auth/login', (req) => {
    req.url = req.url.replace('//localhost:', '//127.0.0.1:');
    req.continue();
  }).as('loginRequest');
});
