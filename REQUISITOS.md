# Requisitos da Lojinha QA

Este documento descreve **como a loja deve funcionar**. É a referência para escrever os testes:
se o app fizer algo diferente do que está aqui, encontramos um bug.

> Todos os valores em dinheiro são guardados em **centavos** no código.
> Exemplo: R$ 19,90 é o número `1990`.

---

## 1. Catálogo

| ID | Regra |
|---|---|
| CAT-01 | A página inicial lista todos os produtos e mostra "N produtos encontrados" (ou "1 produto encontrado"). |
| CAT-02 | A busca procura o texto no **nome** do produto e **não diferencia maiúsculas de minúsculas** ("caneca", "Caneca" e "CANECA" encontram a mesma coisa). Espaços no começo e no fim são ignorados. |
| CAT-03 | O filtro de categoria mostra só os produtos daquela categoria. "Todas" mostra tudo. Busca e categoria podem ser usadas juntas. |
| CAT-04 | A ordenação pode ser por relevância (ordem original), menor preço ou maior preço. |
| CAT-05 | Quando nenhum produto combina com os filtros, aparece "Nenhum produto encontrado.". |
| CAT-06 | Produto com estoque 0 mostra a etiqueta "Esgotado" e **não pode ser adicionado ao carrinho** (botão desabilitado), tanto no catálogo quanto na página do produto. |

## 2. Página do produto

| ID | Regra |
|---|---|
| PRO-01 | Mostra nome, categoria, descrição, preço e quantidade em estoque. |
| PRO-02 | O usuário escolhe a quantidade (número inteiro, mínimo 1) e clica em "Adicionar ao carrinho". Aparece "Produto adicionado ao carrinho!". |
| PRO-03 | Quantidade vazia, zero ou negativa mostra "Quantidade inválida" e não altera o carrinho. |
| PRO-04 | Um id que não existe mostra "Produto não encontrado". |

## 3. Carrinho

| ID | Regra |
|---|---|
| CAR-01 | O contador do cabeçalho mostra o **total de unidades** no carrinho (soma das quantidades). Ex.: 2 canecas + 1 mouse = 3. |
| CAR-02 | Adicionar um produto que já está no carrinho soma as quantidades. |
| CAR-03 | A quantidade de um produto no carrinho **nunca passa do estoque**. Se o usuário tentar passar, a quantidade fica igual ao estoque. Isso vale ao adicionar e ao aumentar a quantidade no carrinho. |
| CAR-04 | A quantidade mínima no carrinho é 1 (botão "−" desabilitado). Para tirar o produto, usa-se "Remover". |
| CAR-05 | Subtotal = soma de (preço × quantidade) de todos os itens. |
| CAR-06 | Carrinho vazio mostra "Seu carrinho está vazio.". |
| CAR-07 | O carrinho fica só na memória: **ao recarregar a página ele volta vazio**. |

## 4. Cupons

| Código | Efeito |
|---|---|
| `PROMO10` | 10% de desconto no subtotal (arredondado para o centavo mais próximo). |
| `DESCONTO50` | R$ 50,00 de desconto no subtotal. **O total dos produtos nunca pode ficar negativo**: se o subtotal for menor que R$ 50,00, o desconto é igual ao subtotal. |
| `FRETEGRATIS` | Zera o frete. Não dá desconto nos produtos. |
| `NATAL2025` | 20% de desconto, válido **até 31/12/2025** (inclusive). Depois disso: "Cupom expirado". |

| ID | Regra |
|---|---|
| CUP-01 | O código não diferencia maiúsculas de minúsculas e ignora espaços nas pontas. |
| CUP-02 | Código que não existe: "Cupom inválido". Código vazio: "Digite um cupom". |
| CUP-03 | Só um cupom por vez. Ele pode ser removido com "Remover cupom". |

## 5. Frete

| ID | Regra |
|---|---|
| FRE-01 | O frete depende da região, descoberta pelo **primeiro dígito do CEP**: |
| | 0 a 3 → Sudeste → R$ 15,00 |
| | 4 a 6 → Norte/Nordeste → R$ 30,00 |
| | 7 → Centro-Oeste → R$ 25,00 |
| | 8 e 9 → Sul → R$ 20,00 |
| FRE-02 | **Frete grátis quando o subtotal for a partir de R$ 200,00** (ou seja, R$ 200,00 exatos já ganham frete grátis). O subtotal considerado é o de antes do desconto. |
| FRE-03 | CEP inválido mostra "CEP inválido". Sem CEP, o resumo mostra "Informe o CEP" e o frete não entra no total. |

**Total do pedido = subtotal − desconto + frete.**

## 6. Checkout

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Nome completo | Pelo menos duas palavras, cada uma com 2 letras ou mais | Informe nome e sobrenome |
| E-mail | Formato `algo@dominio.ext`, sem espaços | E-mail inválido |
| CPF | Com ou sem pontuação; 11 dígitos; dígitos verificadores corretos; **não pode ter todos os dígitos iguais** (ex.: 111.111.111-11) | CPF inválido |
| CEP | `00000-000` ou `00000000` | CEP inválido |
| Endereço | Pelo menos 5 caracteres | Informe o endereço completo |
| Parcelas | Só no cartão: de 1x a 3x sem juros | Número de parcelas inválido |

| ID | Regra |
|---|---|
| CHK-01 | As mensagens de erro aparecem ao clicar em "Confirmar pedido". Com erro, o pedido não é enviado. |
| CHK-02 | O resumo do checkout recalcula o frete conforme o CEP digitado. |
| CHK-03 | Formas de pagamento: Cartão de crédito, Pix ou Boleto. **Nenhum pagamento é processado de verdade.** |
| CHK-04 | Enquanto o pedido é enviado, o botão mostra "Processando..." e fica desabilitado. |
| CHK-05 | Depois de confirmado: o usuário vai para a página "Pedido confirmado!" com o número do pedido (`PED-0001`, `PED-0002`, ...) e **o carrinho é esvaziado** (inclusive o cupom). |

## 7. Meus pedidos

| ID | Regra |
|---|---|
| PED-01 | Lista os pedidos feitos, do mais recente para o mais antigo, com número, data, quantidade de itens e **total**. |
| PED-02 | O total mostrado na lista é **o mesmo total** da confirmação do pedido (com desconto e frete). |
| PED-03 | Os pedidos ficam só na memória: **ao recarregar a página a lista some**. |
| PED-04 | Sem pedidos: "Você ainda não fez nenhum pedido.". |

## Simplificações (não são bugs)

- O estoque não diminui depois de uma compra.
- Não existe login, cadastro nem servidor: a "API" (`src/services/api.ts`) só espera um pouco e devolve dados da memória.
