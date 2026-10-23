# AYŌ Studio

Site autoral do AYŌ Studio de Artes para apresentação de profissionais, portfólio, catálogo, reserva/interesse e pedidos personalizados.

A V1 não possui checkout nem pagamento online.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Cormorant Garamond
- Special Elite
- Bitter
- pnpm
- Formspree
- WhatsApp via link externo

## Identidade

- Vermelho Ayô `#820000`
- Preto Traço `#000000`
- Creme Arte `#FAF4EF`

Assets oficiais ficam em:

```text
public/brand/
```

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Validação:

```bash
pnpm run lint
pnpm run build
```

## Variáveis de ambiente

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT="..."
NEXT_PUBLIC_WHATSAPP_NUMBER="..."
```

Use `.env.local` e não versione os valores.

## Rotas principais

```text
/
/artistas/[slug]
/artistas/[slug]/pedido
/artistas/[slug]/ideia
/flashes/[slug]
/artes/[slug]
/loja
/loja/[slug]
/reservar/flash/[slug]
/reservar/arte/[slug]
/reservar/produto/[slug]
/pedido
/pedido/tatuagem
/pedido/arte
/pedido/arte/[slug]
/pedido/dublagem
/pedido/dublagem/[slug]
```

## Profissionais

O frontend diferencia:

```ts
role
```

de:

```ts
services
```

Serviços atuais:

```ts
"tattoo" | "art" | "voice"
```

Um profissional pode oferecer múltiplos serviços.

O perfil/modal mantém um único CTA:

```text
FAZER UM PEDIDO
```

## Reserva/interesse

Itens existentes:

- flash;
- arte;
- produto.

Fluxo:

```text
item
↓
detalhe
↓
reserva/interesse
↓
Formspree
↓
sucesso
↓
WhatsApp opcional
```

A solicitação não confirma automaticamente a reserva.

## Pedidos personalizados

Tipos atuais:

- tatuagem;
- arte;
- dublagem/voz.

Entrada global:

```text
/pedido
```

Também é possível iniciar pelo profissional:

```text
/artistas/[slug]/pedido
```

A página exibe somente os serviços disponíveis daquele profissional.

## Dados

O frontend ainda usa mocks em:

```text
src/data/
```

`available` e `services` ainda são fontes temporárias até a persistência real.

## Backend planejado

- Node.js
- Fastify
- TypeScript
- PostgreSQL
- Prisma

Próximo objetivo: iniciar backend/banco e substituir mocks progressivamente sem quebrar o frontend.

## Admin

Ainda não implementado.

Será privado, protegido e criado somente sobre persistência real.

## Deploy

O frontend já teve deploy funcional na Vercel.

As alterações mais recentes devem passar por lint/build e novo deploy antes de serem consideradas versão publicada atual.

## Documentação

Detalhes em `docs/`:

- Project Overview
- Design System
- Architecture
- Boot
- Database Setup
- Dev State
- Feature Capsules
- Figma References
- Business Rules
- Roadmap
