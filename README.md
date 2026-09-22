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

## Rodando localmente

```bash
pnpm install
pnpm dev
```

O Next exibirá a URL local no terminal. Durante o desenvolvimento o projeto foi observado em `http://localhost:3001` quando a porta `3000` estava ocupada.

## Estado atual

A Home já possui:

- abertura animada;
- Hero `ARTE QUE MARCA.`;
- profissionais com hover 3D;
- modal de profissional;
- flashes em destaque com seleção aleatória balanceada;
- quadros/desenhos em carrossel editorial;
- loja com 3 produtos aleatórios disponíveis;
- Sobre;
- Contato;
- Footer.

Rotas já implementadas:

```text
/
/flashes/[slug]
/artes/[slug]
/loja
/loja/[slug]
```

## Estrutura principal

```text
src/
├── app/
├── components/
│   ├── artists/
│   ├── flashes/
│   ├── artworks/
│   ├── products/
│   └── home/
├── data/
└── lib/
```

## Dados atuais

Enquanto backend e banco não existem, o projeto usa mocks em `src/data`.

Eles serão substituídos posteriormente por API + PostgreSQL/Prisma.

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

1. revisar responsividade;
2. fechar páginas públicas ainda pendentes;
3. implementar formulário de reserva/interesse;
4. iniciar backend;
5. iniciar banco;
6. mídia/admin;
7. deploy.
