describe('Auth / Login', () => {
  beforeEach(() => {
    cy.clearAuthSession();
    cy.clearCookies();
  });

  it('redirects unauthenticated users to login when visiting /home', () => {
    cy.visit('/home');

    cy.url().should('include', '/login');
    cy.get('#email1').should('be.visible');
  });

  it('logs in successfully with dev credentials', () => {
    cy.login();

    cy.get('.layout-topbar').should('be.visible');
    cy.get('.dashboard-page').should('exist');

    cy.window()
      .its('localStorage')
      .invoke('getItem', 'auth_session')
      .should('not.be.null')
      .then((raw) => {
        const session = JSON.parse(raw as string) as { accessToken?: string };
        expect(session.accessToken).to.be.a('string').and.not.be.empty;
      });
  });

  it('shows an error when credentials are invalid', () => {
    cy.visit('/login');
    cy.get('#email1').clear().type(Cypress.env('loginEmail'));
    cy.get('#password1 input').clear().type('wrong-password');
    cy.get('form button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
    cy.url().should('include', '/login');
    cy.get('app-inline-alert').should('be.visible');
  });

  it('keeps the authenticated session after reloading /home', () => {
    cy.login();

    cy.reload();
    cy.url().should('include', '/home');
    cy.url().should('not.include', '/login');
    cy.get('.layout-topbar').should('be.visible');
  });
});
