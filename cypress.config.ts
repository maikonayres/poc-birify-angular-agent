import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4900',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        const hostRule = '--host-resolver-rules=MAP localhost 127.0.0.1';

        if (browser.name === 'electron') {
          launchOptions.preferences ??= {};
          launchOptions.preferences.additionalArguments ??= [];
          launchOptions.preferences.additionalArguments.push(hostRule);
        } else if (browser.family === 'chromium') {
          launchOptions.args.push(hostRule);
        }

        return launchOptions;
      });
    },
  },
});
