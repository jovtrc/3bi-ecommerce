// EXEMPLO DE TESTE END-TO-END (Playwright)
// Rode com: npm run e2e   (o Playwright sobe a loja sozinho)
import { expect, test } from '@playwright/test'

test('abre a página de um produto pelo catálogo', async ({ page }) => {
  // '/' vira http://localhost:5173/ por causa do baseURL no playwright.config.ts
  await page.goto('/')

  await page.getByRole('link', { name: 'Caneca Térmica' }).click()

  // Não precisa de waitForTimeout: o expect espera a página atualizar sozinho.
  await expect(page).toHaveURL('/produto/8')
  await expect(page.getByRole('heading', { name: 'Caneca Térmica' })).toBeVisible()
  await expect(page.getByText('R$ 49,90')).toBeVisible()
})
