# AYŌ Studio — Boot

> Como iniciar o projeto localmente.

## 1. Pré-requisitos

- Node.js compatível com a versão do Next;
- pnpm;
- Git;
- VS Code ou editor equivalente.

## 2. Estado observado em 2026-09-16

O projeto foi criado com `create-next-app`.

Pacotes observados:

- Next.js `16.3.5`;
- React `19.2.8`;
- React DOM `19.2.8`;
- Tailwind CSS `4.3.3`;
- TypeScript `5.9.3`;
- Framer Motion `13.4.0`.

## 3. Instalação

Na raiz do frontend:

```bash
pnpm install
```

## 4. Desenvolvimento

```bash
pnpm dev
```

Abrir no navegador o endereço exibido pelo Next.

No teste inicial observado, o projeto estava disponível em:

```text
http://localhost:3001
```

A porta pode variar caso `3000` esteja ocupada.

## 5. Build

```bash
pnpm build
```

## 6. Produção local

```bash
pnpm start
```

## 7. Estrutura inicial desejada

```text
src/
├── app/
├── components/
├── lib/
└── ...
```

Conforme o projeto crescer, registrar aqui alterações estruturais importantes.

## 8. Fontes

Usar `next/font/google`.

- Architects Daughter;
- Sora.

Não instalar pacotes de fontes sem necessidade.

## 9. Animações

Framer Motion já está instalado.

Preferência:

- Tailwind para layout e estilo;
- Framer Motion para motion;
- `globals.css` para tokens, reset e estilos realmente globais.

## 10. Regra

Sempre que a inicialização do projeto mudar:

1. atualizar este arquivo;
2. atualizar `DEV_STATE.md`;
3. registrar impacto em `ARCHITECTURE.md` se houver.
