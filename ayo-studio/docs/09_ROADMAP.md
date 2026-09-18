# AYŌ Studio — Roadmap Macro e Micro

> Documento vivo.  
> Marcar itens conforme forem concluídos.

## FASE 0 — Ambiente e fundação técnica

- [x] 0.1 Criar projeto Next.js
- [x] 0.2 React + TypeScript
- [x] 0.3 Tailwind CSS
- [x] 0.4 ESLint
- [x] 0.5 App Router
- [x] 0.6 Instalar Framer Motion
- [x] 0.7 Confirmar execução local
- [ ] 0.8 Organizar estrutura inicial de pastas
- [ ] 0.9 Revisar Git/.gitignore
- [ ] 0.10 Criar commit-base

## FASE 1 — Base visual / Design System

- [ ] 1.1 Configurar Architects Daughter
- [ ] 1.2 Configurar Sora
- [ ] 1.3 Definir tokens de cores
- [ ] 1.4 Definir surfaces
- [ ] 1.5 Definir vermelho principal
- [ ] 1.6 Definir gradiente principal
- [ ] 1.7 Definir cores de texto
- [ ] 1.8 Escala tipográfica provisória
- [ ] 1.9 Espaçamentos
- [ ] 1.10 Radius
- [ ] 1.11 Container
- [ ] 1.12 Breakpoints
- [ ] 1.13 Botões
- [ ] 1.14 Eyebrow
- [ ] 1.15 Badges de conteúdo
- [ ] 1.16 Cards base
- [ ] 1.17 Motion system
- [ ] 1.18 Hover/focus
- [ ] 1.19 Mobile
- [ ] 1.20 Atualizar Design System

## FASE 2 — Home: primeira seção e primeira animação

- [ ] 2.1 Limpar boilerplate do Next
- [ ] 2.2 Criar estrutura da Home
- [ ] 2.3 Header inicial
- [ ] 2.4 Hero
- [ ] 2.5 Background
- [ ] 2.6 Eyebrow
- [ ] 2.7 `ARTE QUE MARCA.`
- [ ] 2.8 Texto
- [ ] 2.9 CTA
- [ ] 2.10 Primeira animação
- [ ] 2.11 Entrada do eyebrow
- [ ] 2.12 Entrada do título
- [ ] 2.13 Entrada da descrição
- [ ] 2.14 Entrada do botão
- [ ] 2.15 Elemento decorativo/background
- [ ] 2.16 Ajustar timing
- [ ] 2.17 Mobile
- [ ] 2.18 Comparar com Figma

## FASE 3 — Fluxo Figma + Sections + Páginas adjacentes

A partir daqui:

```text
Figma Section
   +
Figma Página adjacente
        ↓
Regras
        ↓
Componentes
        ↓
Section React
   +
Página React
        ↓
Responsividade
        ↓
Motion
        ↓
Revisão
```

## FASE 4 — Profissionais + página individual

- [ ] 4.1 Figma `Quem faz a arte`
- [ ] 4.2 Card de profissional
- [ ] 4.3 Confirmar ausência de badges no profissional
- [ ] 4.4 Hover 3D
- [ ] 4.5 Mobile sem hover obrigatório
- [ ] 4.6 Section na Home
- [ ] 4.7 `ArtistCard`
- [ ] 4.8 Motion
- [ ] 4.9 `/artistas`
- [ ] 4.10 `/artistas/[slug]`
- [ ] 4.11 Cabeçalho
- [ ] 4.12 Foto
- [ ] 4.13 Nome
- [ ] 4.14 Profissão
- [ ] 4.15 Bio
- [ ] 4.16 Trabalhos
- [ ] 4.17 Vídeos
- [ ] 4.18 Produtos
- [ ] 4.19 Flashes
- [ ] 4.20 Conteúdo específico por profissional

## FASE 5 — Flash + catálogo + detalhe

- [ ] 5.1 Figma da section
- [ ] 5.2 Figma do catálogo
- [ ] 5.3 Figma do detalhe
- [ ] 5.4 `FlashCard`
- [ ] 5.5 Nome
- [ ] 5.6 Preço
- [ ] 5.7 Imagem
- [ ] 5.8 Categorias
- [ ] 5.9 Disponibilidade
- [ ] 5.10 Filtros
- [ ] 5.11 Fine Line
- [ ] 5.12 Geek
- [ ] 5.13 Old School
- [ ] 5.14 Preto e Branco
- [ ] 5.15 Colorido
- [ ] 5.16 Categorias múltiplas
- [ ] 5.17 `/flashes`
- [ ] 5.18 `/flashes/[slug]`
- [ ] 5.19 Detalhe
- [ ] 5.20 CTA
- [ ] 5.21 Estado `RESERVADO`

## FASE 6 — Random por profissional

- [ ] 6.1 Buscar apenas conteúdo do profissional
- [ ] 6.2 Ignorar itens não elegíveis
- [ ] 6.3 Agrupar por categorias
- [ ] 6.4 Variar categorias
- [ ] 6.5 Impedir duplicação
- [ ] 6.6 Alternar seleção
- [ ] 6.7 Fallback
- [ ] 6.8 Motion da troca
- [ ] 6.9 Frequência
- [ ] 6.10 Controle de excesso de movimento

## FASE 7 — Artes

- [ ] 7.1 Figma Home
- [ ] 7.2 Figma página de artes
- [ ] 7.3 Tipos de obra
- [ ] 7.4 `ArtworkCard`
- [ ] 7.5 Section Home
- [ ] 7.6 `/artes`
- [ ] 7.7 Decidir `/artes/[slug]`
- [ ] 7.8 Galeria
- [ ] 7.9 Filtros
- [ ] 7.10 Badges
- [ ] 7.11 Autoria
- [ ] 7.12 Nome
- [ ] 7.13 Preço opcional
- [ ] 7.14 Lightbox

## FASE 8 — Loja

- [ ] 8.1 Figma section
- [ ] 8.2 Figma loja
- [ ] 8.3 Figma produto
- [ ] 8.4 `ProductCard`
- [ ] 8.5 Nome
- [ ] 8.6 Preço
- [ ] 8.7 Fotos
- [ ] 8.8 Descrição
- [ ] 8.9 Disponibilidade
- [ ] 8.10 `/loja`
- [ ] 8.11 `/loja/[slug]`
- [ ] 8.12 Reservar produto
- [ ] 8.13 Sem carrinho
- [ ] 8.14 Sem checkout
- [ ] 8.15 Sem pagamento

## FASE 9 — Formulário de reserva/interesse

- [ ] 9.1 Figma
- [ ] 9.2 Nome
- [ ] 9.3 WhatsApp
- [ ] 9.4 Instagram
- [ ] 9.5 E-mail
- [ ] 9.6 Mensagem
- [ ] 9.7 Item automático
- [ ] 9.8 Profissional automático
- [ ] 9.9 Validação
- [ ] 9.10 Loading
- [ ] 9.11 Sucesso
- [ ] 9.12 Erro
- [ ] 9.13 Explicar que envio != confirmação
- [ ] 9.14 Integração futura com backend

## FASE 10 — Pedidos personalizados

- [ ] 10.1 Figma
- [ ] 10.2 CTA
- [ ] 10.3 Formulário
- [ ] 10.4 Profissional
- [ ] 10.5 Pedido
- [ ] 10.6 Estilo
- [ ] 10.7 Referências
- [ ] 10.8 Orçamento opcional
- [ ] 10.9 Limite
- [ ] 10.10 Abrir/fechar
- [ ] 10.11 Estado fechado

## FASE 11 — Sobre + contato + footer

- [ ] 11.1 Sobre
- [ ] 11.2 Texto
- [ ] 11.3 Mídia
- [ ] 11.4 Motion
- [ ] 11.5 Contato
- [ ] 11.6 WhatsApp
- [ ] 11.7 Instagram
- [ ] 11.8 Outros canais
- [ ] 11.9 Footer
- [ ] 11.10 Links
- [ ] 11.11 Copyright
- [ ] 11.12 Redes

## FASE 12 — Backend

- [ ] 12.1 Criar backend
- [ ] 12.2 Fastify
- [ ] 12.3 TypeScript
- [ ] 12.4 CORS
- [ ] 12.5 Env
- [ ] 12.6 Rotas
- [ ] 12.7 Services/controllers
- [ ] 12.8 API
- [ ] 12.9 Integração
- [ ] 12.10 Healthcheck

## FASE 13 — Banco de dados

- [ ] 13.1 PostgreSQL
- [ ] 13.2 Prisma
- [ ] 13.3 Professional
- [ ] 13.4 Category
- [ ] 13.5 Flash
- [ ] 13.6 Artwork
- [ ] 13.7 Video
- [ ] 13.8 Product
- [ ] 13.9 Reservation
- [ ] 13.10 CustomRequest
- [ ] 13.11 Relações
- [ ] 13.12 Categorias N:N
- [ ] 13.13 Migrations
- [ ] 13.14 Seeds

## FASE 14 — Mídia

- [ ] 14.1 Escolher provider
- [ ] 14.2 Upload
- [ ] 14.3 Imagens
- [ ] 14.4 Vídeos
- [ ] 14.5 Thumbnails
- [ ] 14.6 Otimização
- [ ] 14.7 Original privado
- [ ] 14.8 Versão web
- [ ] 14.9 Exclusão
- [ ] 14.10 Associação

## FASE 15 — Proteção

- [ ] 15.1 Watermark flashes
- [ ] 15.2 Watermark artes
- [ ] 15.3 Watermark vídeos
- [ ] 15.4 Resolução controlada
- [ ] 15.5 Bloquear drag
- [ ] 15.6 Bloquear context menu nas mídias
- [ ] 15.7 Proteger original
- [ ] 15.8 Anti-hotlink
- [ ] 15.9 Documentar limitação de screenshot

## FASE 16 — Admin

- [ ] 16.1 Rota interna
- [ ] 16.2 Proteção
- [ ] 16.3 Dashboard
- [ ] 16.4 CRUD profissional
- [ ] 16.5 CRUD flash
- [ ] 16.6 CRUD arte
- [ ] 16.7 CRUD vídeo
- [ ] 16.8 CRUD produto
- [ ] 16.9 Categorias
- [ ] 16.10 Reservas
- [ ] 16.11 Pedidos personalizados

## FASE 17 — Notificações

- [ ] 17.1 Persistir form
- [ ] 17.2 E-mail Studio
- [ ] 17.3 Confirmação cliente opcional
- [ ] 17.4 Eventos de reserva
- [ ] 17.5 Futuro WhatsApp
- [ ] 17.6 Futuro agenda

## FASE 18 — Refinamento de Motion

- [ ] 18.1 Page transitions
- [ ] 18.2 Scroll reveal
- [ ] 18.3 Hover 3D
- [ ] 18.4 Hover de trabalhos
- [ ] 18.5 Filtros
- [ ] 18.6 Modais
- [ ] 18.7 Random motion
- [ ] 18.8 Menu mobile
- [ ] 18.9 `prefers-reduced-motion`
- [ ] 18.10 Performance

## FASE 19 — Responsividade + acessibilidade

- [ ] 19.1 Desktop
- [ ] 19.2 Notebook
- [ ] 19.3 Tablet
- [ ] 19.4 Mobile
- [ ] 19.5 Teclado
- [ ] 19.6 Focus
- [ ] 19.7 Contraste
- [ ] 19.8 Alt
- [ ] 19.9 Labels
- [ ] 19.10 Reduced motion

## FASE 20 — SEO

- [ ] 20.1 Metadata
- [ ] 20.2 Open Graph
- [ ] 20.3 Sitemap
- [ ] 20.4 Robots
- [ ] 20.5 URLs
- [ ] 20.6 Slugs
- [ ] 20.7 Metadata artista
- [ ] 20.8 Metadata conteúdo

## FASE 21 — Testes e segurança

- [ ] 21.1 Forms
- [ ] 21.2 Concorrência de reserva
- [ ] 21.3 Backend validation
- [ ] 21.4 Rate limit
- [ ] 21.5 Admin protection
- [ ] 21.6 Upload validation
- [ ] 21.7 Exclusão
- [ ] 21.8 404
- [ ] 21.9 Empty states
- [ ] 21.10 Network errors

## FASE 22 — Documentação

- [x] 22.1 Project Overview inicial
- [x] 22.2 Design System inicial
- [x] 22.3 Architecture inicial
- [x] 22.4 Boot inicial
- [x] 22.5 Database Setup inicial
- [x] 22.6 Dev State inicial
- [x] 22.7 Feature Capsules inicial
- [x] 22.8 Figma References inicial
- [x] 22.9 Business Rules inicial
- [x] 22.10 Roadmap inicial
- [ ] 22.11 Atualizar continuamente

## FASE 23 — Deploy

- [ ] 23.1 Build
- [ ] 23.2 Warnings
- [ ] 23.3 Frontend
- [ ] 23.4 Backend
- [ ] 23.5 Banco
- [ ] 23.6 Storage
- [ ] 23.7 Env
- [ ] 23.8 Domínio
- [ ] 23.9 HTTPS
- [ ] 23.10 Teste produção
- [ ] 23.11 Backup
- [ ] 23.12 Monitoramento

## FASE 24 — Futuro

- [ ] Agenda
- [ ] Pagamento
- [ ] Carrinho
- [ ] Checkout
- [ ] Conta de cliente
- [ ] Conta de profissional
- [ ] Avaliações
- [ ] WhatsApp automatizado
- [ ] Financeiro
- [ ] Estoque avançado
- [ ] Histórico de cliente
- [ ] Comissões
- [ ] Marketplace
