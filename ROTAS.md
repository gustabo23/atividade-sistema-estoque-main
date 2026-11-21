# Rotas da API de Estoque

Sem autenticação. Erros respondem `{ "message": "..." }`.

Legenda: ✅ feita · ⬜ pendente

## Categorias

| Status | Método | Rota | O que faz |
|---|---|---|---|
| ✅ | GET | `/categorias` | Lista todas, ordenadas por nome |
| ✅ | GET | `/categorias/:id` | Busca uma (400 id inválido, 404 não encontrada) |
| ✅ | POST | `/categorias` | Cria. Body: `nome` (obrigatório, até 120), `descricao` (opcional, até 255) |
| ✅ | PUT | `/categorias/:id` | Substitui os dados (mesmo body do POST; sem `descricao` vira `null`) |
| ✅ | DELETE | `/categorias/:id` | Remove, responde 204 (409 se tiver produtos vinculados) |

## Fornecedores

| Status | Método | Rota | O que faz |
|---|---|---|---|
| ✅ | GET | `/fornecedores` | Lista todos, ordenados por nome |
| ✅ | GET | `/fornecedores/:id` | Busca um (400 id inválido, 404 não encontrado) |
| ✅ | POST | `/fornecedores` | Cria. Body: `nome` (até 120), `cnpj` (14 dígitos, com ou sem máscara), `telefone` (até 20), `email` (até 80). Todos obrigatórios. 409 se o CNPJ já existir |
| ✅ | PUT | `/fornecedores/:id` | Substitui os dados (mesmo body do POST; 409 se o CNPJ for de outro fornecedor) |
| ✅ | DELETE | `/fornecedores/:id` | Remove, responde 204 (409 se tiver produtos vinculados) |

## Produtos

| Status | Método | Rota | O que faz |
|---|---|---|---|
| ✅ | GET | `/produtos` | Lista com `categoria` e `fornecedor` resumidos (id, nome). Filtros combináveis: `?categoriaId=`, `?fornecedorId=`, `?ativo=true\|false` |
| ✅ | GET | `/produtos/estoque-baixo` | Produtos **ativos** com `qntAtual <= estoqueMinimo` |
| ✅ | GET | `/produtos/:id` | Detalhe com `categoria` e `fornecedor` completos |
| ✅ | GET | `/produtos/:id/movimentacoes` | Histórico de movimentações do produto, mais recentes primeiro (404 se o produto não existir) |
| ✅ | POST | `/produtos` | Cria. Body: `nome` (até 120), `codigo` (até 50, único), `descricao` (opcional, até 1000), `unidade` (`un`\|`kg`\|`cx`), `categoriaId`, `fornecedorId` (números, precisam existir), `estoqueMinimo` (inteiro >= 0). `qntAtual` começa em 0 e `ativo` em true; se vierem no body, são ignorados. 409 se o código já existir |
| ✅ | PUT | `/produtos/:id` | Substitui os dados cadastrais (mesmo body do POST). Não altera `qntAtual` nem `ativo` |
| ✅ | PATCH | `/produtos/:id/ativo` | Body: `{ "ativo": true \| false }`. Ativa/desativa (no lugar do DELETE) |

## Movimentações

| Status | Método | Rota | O que faz |
|---|---|---|---|
| ✅ | GET | `/movimentacoes` | Lista, mais recentes primeiro. Filtros combináveis: `?produtoId=`, `?tipo=` (maiúsculo ou minúsculo), `?dataInicio=AAAA-MM-DD&dataFim=AAAA-MM-DD` (dias inteiros, fuso de Belém, fim incluso) |
| ✅ | GET | `/movimentacoes/:id` | Detalhe com o `produto` resumido |
| ✅ | POST | `/movimentacoes` | Body: `produtoId`, `tipo`, `quantidade`, `motivo` (até 500). Registra e atualiza `qntAtual` na mesma transaction. `data` é preenchida pelo servidor |

Sem PUT/DELETE: movimentação é histórico; erro se corrige com um AJUSTE.

### Regras do POST `/movimentacoes`

| Tipo | Efeito em `qntAtual` |
|---|---|
| `ENTRADA` | soma `quantidade` (inteiro > 0) |
| `SAIDA` | subtrai `quantidade` (inteiro > 0; 409 se maior que o estoque) |
| `AJUSTE` | passa a ser `quantidade` (inteiro >= 0; contagem de inventário) |

- 400 se o produto não existir; 409 se o produto estiver inativo.
- O produto é travado (`SELECT ... FOR UPDATE`) durante a transaction: movimentações simultâneas do mesmo produto esperam uma pela outra e o estoque nunca fica errado.

## Ordem de rotas no router de produtos

`/produtos/estoque-baixo` precisa ser registrada **antes** de `/produtos/:id`, senão o Express trata `estoque-baixo` como `:id`.
