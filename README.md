# AYŌ Studio

Frontend do site AYŌ Studio: uma experiência autoral para apresentar profissionais, flashes, artes e produtos, com fluxo de interesse/reserva sem checkout na V1.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Architects Daughter
- Sora
- pnpm
- Formspree para submissões atuais
- WhatsApp por link externo para continuidade de atendimento

## Rodando localmente

```bash
pnpm install
pnpm dev
```

O Next exibirá a URL local no terminal. Normalmente o projeto usa `http://localhost:3000`, podendo variar se a porta estiver ocupada.

Para lint:

```bash
pnpm lint
```

## Variáveis de ambiente

O fluxo atual de reserva usa:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT="..."
NEXT_PUBLIC_WHATSAPP_NUMBER="..."
```

Manter esses valores em `.env.local`, fora do Git.

## Estado atual

A Home já possui:

- abertura animada;
- Hero `ARTE QUE MARCA.`;
- profissionais com hover 3D;
- modal de profissional com até 3 flashes aleatórios disponíveis do artista;
- flashes em destaque com seleção aleatória balanceada;
- quadros/desenhos em carrossel editorial;
- loja com 3 produtos aleatórios disponíveis;
- Sobre;
- Contato;
- Footer.

Rotas já implementadas:

```text
/
/artistas/[slug]
/flashes/[slug]
/artes/[slug]
/loja
/loja/[slug]
/reservar/flash/[slug]
/reservar/arte/[slug]
```

## Reserva/interesse

O frontend já possui formulário funcional para flashes e artes.

Fluxo atual:

```text
item disponível
↓
detalhe
↓
solicitar reserva
↓
formulário
↓
Formspree / e-mail Studio
↓
sucesso
↓
continuação opcional no WhatsApp
```

A solicitação **não confirma automaticamente** a reserva.

Itens com `available: false`:

- exibem `RESERVADO`;
- continuam visíveis como portfólio quando aplicável;
- não oferecem CTA funcional de reserva;
- não renderizam formulário nas rotas `/reservar/...`.

## Estrutura principal

```text
src/
├── app/
├── components/
│   ├── artists/
│   ├── flashes/
│   ├── artworks/
│   ├── products/
│   ├── reservations/
│   └── home/
├── data/
└── lib/
```

## Dados atuais

Enquanto backend e banco não existem, o projeto usa mocks em `src/data`.

`available` é uma solução temporária para disponibilidade. Os mocks serão substituídos posteriormente por API + PostgreSQL/Prisma.

## Escopo da V1

Inclui:

- apresentação do Studio;
- profissionais;
- flashes;
- artes;
- produtos;
- interesse/reserva;
- administração interna futura.

Não inclui:

- checkout;
- pagamento online;
- carrinho;
- agenda;
- contas públicas;
- avaliações;
- marketplace.

## Admin

O admin real ainda não foi implementado.

Decisão atual: não construir uma versão funcional apenas em memória. A área administrativa será retomada quando backend/banco oferecerem persistência real.

## Documentação

A documentação detalhada está em `docs/`:

- visão do projeto;
- design system;
- arquitetura;
- boot;
- banco planejado;
- estado de desenvolvimento;
- feature capsules;
- referências de Figma;
- regras de negócio;
- roadmap.

## Desenvolvimento

Fluxo adotado:

```text
Figma
+
regras
↓
componentes
↓
section/página
↓
responsividade
↓
motion
↓
documentação
```

## Próximos passos

1. revisar responsividade e acessibilidade;
2. fechar páginas públicas ainda pendentes (`/artistas`, `/flashes`, `/artes`);
3. consolidar conteúdo real/mocks;
4. iniciar backend;
5. iniciar banco e persistência de reservas/disponibilidade;
6. criar admin real;
7. mídia/proteção;
8. deploy.
