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
- Auth.js
- pnpm

### Backend
- Node.js
- Fastify
- TypeScript
- PostgreSQL
- Prisma

### Integrações
- Cloudinary
- Formspree
- WhatsApp via link externo

## Estado atual

Persistidos:

- profissionais e serviços;
- flashes;
- artes;
- produtos;
- vídeos;
- solicitações;
- usuários administrativos.

Admin implementado:

- solicitações;
- profissionais;
- flashes;
- artes;
- produtos;
- vídeos;
- usuários;
- roles OWNER / ADMIN / EDITOR.

## Arquitetura

```text
Next.js
  ↓
Fastify
  ↓
Prisma
  ↓
PostgreSQL

Mídia → Cloudinary
```

## Rodando localmente

Frontend:

```bash
pnpm install
pnpm dev
```

Backend:

```bash
cd backend
pnpm install
pnpm dev
```

## Validação

```bash
cd backend
pnpm typecheck
pnpm tsc --noEmit
cd ..

pnpm tsc --noEmit
pnpm lint
pnpm build
```

## Variáveis

Frontend:

```env
AUTH_SECRET="..."
ADMIN_API_KEY="..."
ADMIN_UPLOAD_KEY="..."
BACKEND_API_URL="http://localhost:3333"
NEXT_PUBLIC_API_URL="http://localhost:3333"
NEXT_PUBLIC_FORMSPREE_ENDPOINT="..."
NEXT_PUBLIC_WHATSAPP_NUMBER="..."
```

Backend:

```env
DATABASE_URL="..."
ADMIN_API_KEY="..."
ADMIN_UPLOAD_KEY="..."
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
CORS_ORIGINS="http://localhost:3000"
PORT="3333"
```

Não versionar valores reais.

## Admin

```text
/admin/login
/admin/solicitacoes
/admin/profissionais
/admin/flashes
/admin/artes
/admin/produtos
/admin/videos
/admin/usuarios
```

## Produção

Próximos passos:

1. build final;
2. PostgreSQL de produção;
3. hospedagem do backend;
4. variáveis;
5. `prisma migrate deploy`;
6. redeploy do frontend;
7. smoke tests.
