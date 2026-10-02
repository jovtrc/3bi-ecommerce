# 🧪 Lojinha QA

E-commerce **fictício** feito com React + TypeScript + Vite para as aulas de
Qualidade de Software e Testes. Não tem servidor, banco de dados nem pagamento:
tudo fica na memória e **some quando a página é recarregada**.

> ⚠️ Esta loja tem **bugs de propósito**. A missão da turma é encontrá-los
> escrevendo testes. As regras de como a loja deveria funcionar estão em
> [REQUISITOS.md](REQUISITOS.md).

## Como rodar

Precisa do [Node.js](https://nodejs.org/) 20 ou mais novo.

```bash
npm install
npx playwright install chromium   # só na primeira vez (baixa o navegador dos testes E2E)
npm run dev                       # abre a loja em http://localhost:5173
```

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe a loja em modo de desenvolvimento |
| `npm test` | Roda os testes unitários e de componente (Vitest) e fica observando mudanças |
| `npm run test:ui` | Mesmo que o anterior, com interface no navegador |
| `npm run coverage` | Roda os testes uma vez e mostra a cobertura de código |
| `npm run e2e` | Roda os testes end-to-end (Playwright) |
| `npm run e2e:ui` | Testes E2E com interface visual (dá para ver cada passo) |
| `npm run e2e:report` | Abre o relatório do último `npm run e2e` |
| `npx playwright codegen localhost:5173` | Grava seus cliques e gera código de teste (a loja precisa estar rodando) |

## Onde fica cada coisa

```
src/
  lib/          regras de negócio (funções puras) → testes UNITÁRIOS
  components/   pedaços da tela                   → testes de COMPONENTE
  pages/        páginas da loja                   → testes de COMPONENTE
  context/      carrinho e pedidos (na memória)
  services/     API falsa
  data/         produtos falsos
  test/         configuração e ajudantes dos testes
e2e/            testes END-TO-END (Playwright)
```

Já existe um teste de exemplo de cada tipo para servir de modelo:

- `src/lib/currency.test.ts` (unitário)
- `src/components/ProductCard.test.tsx` (componente)
- `e2e/exemplo.spec.ts` (end-to-end)

Os testes unitários e de componente ficam ao lado do arquivo testado, com o
final `.test.ts` ou `.test.tsx` (ex.: `src/lib/currency.ts` → `src/lib/currency.test.ts`).
Os testes E2E ficam em `e2e/` com o final `.spec.ts`.

## Ferramentas

- [Vitest](https://vitest.dev/): roda os testes unitários e de componente
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/): renderiza componentes e interage com eles como um usuário
- [Playwright](https://playwright.dev/): controla um navegador de verdade nos testes E2E
