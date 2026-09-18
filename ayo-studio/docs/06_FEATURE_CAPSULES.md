# AYŌ Studio — Feature Capsules

> Cápsulas de funcionalidade.  
> Cada cápsula define intenção, regras e limites antes da implementação.

---

## CAPSULE 01 — Hero da Home

### Objetivo
Apresentar o Studio com impacto visual e estabelecer a identidade do site.

### Conteúdo
- eyebrow;
- título `ARTE QUE MARCA.`;
- descrição;
- CTA;
- background com gradiente;
- primeira animação.

### Motion
Entrada progressiva:

1. background;
2. eyebrow;
3. título;
4. descrição;
5. CTA;
6. detalhe decorativo.

### Estado
PRÓXIMA IMPLEMENTAÇÃO.

---

## CAPSULE 02 — Profissionais

### Objetivo
Apresentar quem cria no Studio.

### Regras
- não limitar a tatuadores;
- cada profissional possui página própria;
- cards de profissional não usam badges de categorias;
- imagem pode reagir em 3D no hover;
- mobile não depende de hover.

### Estado
PLANEJADO.

---

## CAPSULE 03 — Página do profissional

### Conteúdo possível
- foto;
- nome;
- tipo de profissional;
- bio;
- especialidades;
- flashes;
- artes;
- vídeos;
- produtos;
- pedidos personalizados.

O conteúdo exibido depende do profissional.

### Estado
PLANEJADO.

---

## CAPSULE 04 — Flash

### Campos conceituais
- nome;
- preço;
- imagem;
- profissional;
- categorias;
- descrição;
- disponibilidade.

### Regras
- pode possuir múltiplas categorias;
- pode ser reservado;
- reservar não equivale a compra;
- envio do formulário não confirma automaticamente a reserva.

### Estado
PLANEJADO.

---

## CAPSULE 05 — Random de flashes por profissional

### Objetivo
Manter a Home dinâmica.

### Regras
- somente flashes do profissional em questão;
- selecionar conteúdos elegíveis;
- variar categorias quando possível;
- impedir duplicação do mesmo flash;
- possuir fallback quando o catálogo for pequeno.

### Exemplo
Primeiro ciclo:

`Fine Line | Geek | Preto e Branco`

Outro ciclo:

`Colorido | Old School | Geek`

### Estado
PLANEJADO.

---

## CAPSULE 06 — Artes

### Objetivo
Exibir trabalhos artísticos que não precisam funcionar como flash.

### Conteúdo
- imagem/vídeo;
- nome;
- profissional;
- categorias;
- preço opcional;
- descrição.

### Estado
PLANEJADO.

---

## CAPSULE 07 — Loja

### Objetivo
Exibir produtos no formato de catálogo.

### V1
- nome;
- preço;
- imagem;
- descrição;
- disponibilidade;
- botão de interesse/reserva.

### Não existe na V1
- carrinho;
- checkout;
- pagamento.

### Estado
PLANEJADO.

---

## CAPSULE 08 — Reserva

### Fluxo

```text
Cliente escolhe item
      ↓
abre formulário
      ↓
preenche dados
      ↓
envia
      ↓
salva solicitação
      ↓
Studio recebe aviso
      ↓
admin confirma ou cancela
```

### Dados previstos
- nome;
- WhatsApp;
- Instagram;
- e-mail;
- mensagem;
- item;
- profissional.

### Estado
PLANEJADO.

---

## CAPSULE 09 — Pedido personalizado

### Exemplo
Pedido ao tatuador:

`um coelho colorido`

### Regras
- profissional pode aceitar ou não pedidos;
- pode existir limite de pedidos em aberto;
- formulário deve ficar indisponível quando pedidos estiverem fechados.

### Estado
PLANEJADO.

---

## CAPSULE 10 — Proteção de mídia

### Objetivo
Dificultar cópia de ideias e arquivos.

### Estratégias
- original privado;
- versão web reduzida;
- watermark;
- compressão;
- bloquear drag;
- bloquear menu contextual sobre mídia;
- evitar exposição direta desnecessária do arquivo original;
- proteção contra hotlink quando possível.

### Limitação
Não é possível impedir screenshot de forma confiável em um site comum.

### Estado
PLANEJADO.

---

## CAPSULE 11 — Administração

### Objetivo
Permitir manutenção pelo responsável do Studio.

### V1
- sem contas públicas;
- sem cadastro público;
- área interna simples;
- autenticação/proteção mínima adequada;
- CRUD dos conteúdos.

### Estado
PLANEJADO.

---

## CAPSULE 12 — Motion System

### Objetivo
Dar modernidade sem transformar a interface em demonstração de efeitos.

### Níveis
- micro;
- component;
- editorial.

### Regra
A frequência da interação é inversamente proporcional à intensidade da animação.

### Estado
EM DEFINIÇÃO.
