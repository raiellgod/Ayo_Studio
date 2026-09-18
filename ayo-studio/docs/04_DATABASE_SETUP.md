# AYŌ Studio — Database Setup

> Estado: PLANEJADO / NÃO IMPLEMENTADO.

## 1. Banco escolhido

PostgreSQL.

## 2. ORM planejado

Prisma.

## 3. Objetivo

Persistir:

- profissionais;
- categorias;
- flashes;
- artes;
- vídeos;
- produtos;
- solicitações de reserva;
- pedidos personalizados;
- estados de disponibilidade.

## 4. Entidades conceituais

### Professional

Representa qualquer profissional exibido no site.

Exemplos:

- tatuador;
- dublador;
- ilustrador;
- designer.

### Category

Classificações reutilizáveis.

Exemplos:

- Fine Line;
- Old School;
- Geek;
- Colorido;
- Preto e Branco.

### Flash

Trabalho reservável associado a um profissional.

### Artwork

Obra/portfólio.

### Video

Conteúdo audiovisual.

### Product

Produto exibido como catálogo sem checkout na V1.

### Reservation

Solicitação relacionada a flash/produto ou outro conteúdo reservável.

### CustomRequest

Pedido personalizado enviado a um profissional.

## 5. Regras de modelagem conhecidas

- profissional pode possuir muitos conteúdos;
- flash pode possuir várias categorias;
- categoria pode pertencer a vários flashes;
- reserva deve guardar estado;
- preço deve ser persistido de forma apropriada para valores monetários;
- conteúdo deve suportar ativação/arquivamento;
- mídia não deve ser armazenada como binário dentro do PostgreSQL;
- banco deve guardar referências/URLs/keys de mídia.

## 6. Estados conceituais de reserva

```text
PENDING
CONFIRMED
CANCELLED
```

Estado visual de um flash pode derivar das regras de negócio.

## 7. Setup futuro esperado

Exemplo conceitual:

```bash
pnpm add @prisma/client
pnpm add -D prisma
pnpm exec prisma init
```

Depois configurar:

```env
DATABASE_URL="..."
```

## 8. Não fazer ainda

Não criar schema definitivo antes de:

- páginas principais estarem melhor definidas;
- regras de conteúdo fechadas;
- fluxos de reserva confirmados;
- decisões sobre admin confirmadas.

## 9. Fonte da verdade

Quando o schema Prisma existir, ele passa a ser a fonte técnica principal da modelagem real.

Este documento deve acompanhar o schema, nunca contradizê-lo.
