# AYŌ Studio — Architecture

> Documento de arquitetura de alto nível.  
> Não representa schema final nem contrato definitivo de API.

## 1. Stack atual

### Frontend
- Next.js 16;
- React 19;
- TypeScript;
- Tailwind CSS 4;
- Framer Motion.

### Fontes
- `next/font/google`;
- Architects Daughter;
- Sora.

### Backend planejado
- Node.js;
- Fastify;
- TypeScript.

### Banco planejado
- PostgreSQL;
- Prisma ORM.

### Mídia planejada
Avaliar:

- Cloudinary;
- Cloudflare R2 / S3-like storage.

Cloudinary é especialmente relevante por:

- transformações;
- otimização;
- CDN;
- watermark;
- imagens e vídeos.

## 2. Estrutura lógica

```text
Usuário público
      |
      v
Next.js
      |
      +--> páginas públicas
      |
      +--> área administrativa
      |
      v
Fastify API
      |
      v
Prisma
      |
      v
PostgreSQL

Mídia
      |
      v
Cloudinary/R2
```

## 3. Site público

Rotas conceituais:

```text
/
├── /artistas
├── /artistas/[slug]
├── /flashes
├── /flashes/[slug]
├── /artes
├── /loja
├── /loja/[slug]
└── rotas auxiliares
```

As rotas finais serão confirmadas durante o desenvolvimento do Figma.

## 4. Administração

A área administrativa será:

- privada;
- não divulgada na navegação pública;
- protegida;
- simples;
- sem sistema de contas complexo na V1.

Apenas conhecer a URL não deve permitir ações administrativas.

Todas as operações destrutivas devem ser validadas no backend.

## 5. Domínios principais previstos

- Professional;
- Category;
- Flash;
- Artwork;
- Video;
- Product;
- Reservation;
- CustomRequest.

## 6. Categorias

Flashes podem pertencer a múltiplas categorias.

Exemplo:

```text
Flash
├── Geek
├── Fine Line
└── Preto e Branco
```

Portanto a modelagem deverá suportar relação muitos-para-muitos.

## 7. Reserva

Fluxo previsto:

```text
AVAILABLE
    |
    v
solicitação enviada
    |
    v
PENDING
    |
    +--> confirmação administrativa --> RESERVED
    |
    +--> recusa/cancelamento ---------> AVAILABLE
```

Enviar formulário não significa confirmar automaticamente uma reserva.

## 8. Random de flashes

O random da Home é **por profissional**.

Regras:

- somente conteúdo daquele profissional;
- apenas itens elegíveis;
- tentar variar categorias;
- impedir repetição do mesmo flash;
- respeitar disponibilidade;
- possuir fallback quando houver pouco conteúdo.

Exemplo:

```text
Tatuador A

[ Fine Line ] [ Geek ] [ Preto e Branco ]
```

em outro ciclo:

```text
Tatuador A

[ Colorido ] [ Old School ] [ Geek ]
```

## 9. Mídia e proteção

Ideal:

```text
upload original
      |
      v
storage privado
      |
      v
processamento
      |
      +--> resize
      +--> compressão
      +--> watermark
      |
      v
versão web pública
```

O arquivo original não deve ser exposto desnecessariamente.

## 10. Princípio de evolução

Não antecipar complexidade de:

- autenticação de usuários públicos;
- pagamentos;
- agenda;
- chat;
- marketplace;
- avaliações.

Arquitetura deve permitir evolução, mas a V1 deve continuar simples.
