import { defineConfig, devices } from '@playwright/test'

// Configuração do Playwright (testes end-to-end).
// Antes dos testes, o Playwright sobe o app com `npm run dev` sozinho.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Mostra o resultado no terminal e gera o relatório HTML (abrir com `npm run e2e:report`).
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
