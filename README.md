# AYŌ Studio

Site autoral do AYŌ Studio de Artes para apresentação de profissionais, portfólio, catálogo, reserva/interesse e pedidos personalizados.

A V1 não possui checkout nem pagamento online.

## Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- pnpm

### Backend
- Node.js
- Fastify
- TypeScript
- PostgreSQL
- Prisma

### Integrações
- Formspree
- WhatsApp via link externo

## Identidade

- Vermelho Ayô `#820000`
- Preto Traço `#000000`
- Creme Arte `#FAF4EF`
- Cormorant Garamond
- Special Elite
- Bitter

## Arquitetura

```text
Next.js
  ↓ HTTP
Fastify
  ↓ Prisma
PostgreSQL
```

## Estado atual da persistência

Migrados para PostgreSQL/API:

- profissionais;
- serviços;
- flashes;
- artes;
- produtos.

Ainda em mock:

- vídeos.

Próximos depois de vídeos:

- reservas;
- pedidos personalizados.

## API pública atual

```text
/professionals
/flashes
/artworks
/products
```

## Rodando o frontend

```bash
pnpm install
pnpm dev
```

Validação:

```bash
pnpm tsc --noEmit
pnpm lint
pnpm build
```

## Backend

```bash
cd backend
pnpm install
pnpm typecheck
```

Prisma:

```bash
pnpm exec prisma format
pnpm exec prisma validate
pnpm exec prisma generate
pnpm exec prisma db seed
pnpm exec prisma studio
```

## Variáveis

Frontend:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT="..."
NEXT_PUBLIC_WHATSAPP_NUMBER="..."
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

Backend:

```env
DATABASE_URL="..."
```

Não versionar valores reais.

## Rotas públicas principais

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

## Produtos

Produtos podem ter autoria opcional. Isso permite itens institucionais do AYŌ e itens de autores específicos.

## Mídia

Imagens/vídeos não devem ser armazenados como binário no PostgreSQL.

Atualmente os registros podem apontar para arquivos locais em `public/`. Futuramente o plano é usar provider externo e persistir URL/key/public ID.

## Reservas e pedidos

Ainda usam Formspree como canal de submissão.

Formspree não é o banco de domínio e não confirma reserva automaticamente.

## Próximo objetivo

Migrar vídeos:

1. Prisma model;
2. migration;
3. seed;
4. API;
5. helper frontend;
6. remover `mockVideos.ts`.

## Documentação

Detalhes em `docs/`.
