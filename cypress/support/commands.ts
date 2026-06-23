Cypress.Commands.add('clearAuthSession', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('auth_session');
  });
});

Cypress.Commands.add('login', (email?: string, password?: string) => {
  const loginEmail = email ?? Cypress.env('loginEmail');
  const loginPassword = password ?? Cypress.env('loginPassword');

  cy.visit('/login');
  cy.get('#email1').clear().type(loginEmail);
  cy.get('#password1 input').clear().type(loginPassword);
  cy.get('form button[type="submit"]').click();

  cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
  cy.url().should('include', '/home');
});
