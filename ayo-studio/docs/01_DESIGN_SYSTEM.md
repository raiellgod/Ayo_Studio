# AYŌ Studio — Design System

> Estado: inicial / em definição.  
> Os valores exatos ainda podem mudar durante o refinamento do Figma.

## 1. Princípios

A interface deve equilibrar:

- arte;
- personalidade;
- clareza comercial;
- legibilidade;
- modernidade;
- movimento;
- simplicidade.

Evitar aparência de:

- e-commerce genérico;
- painel SaaS;
- cyberpunk exagerado;
- site de tattoo carregado de clichês visuais.

## 2. Tipografia

### Display
**Architects Daughter**

Uso recomendado:

- Hero;
- títulos de seção;
- frases de impacto;
- headings editoriais.

Evitar em:

- parágrafos longos;
- formulários;
- preços;
- navegação;
- informações funcionais.

### UI / corpo
**Sora**

Uso recomendado:

- navegação;
- parágrafos;
- botões;
- labels;
- preços;
- badges;
- inputs;
- formulários;
- painel administrativo.

Pesos previstos:

- 400;
- 500;
- 600;
- 700.

## 3. Tokens tipográficos conceituais

- `display-xl`
- `display-lg`
- `heading-xl`
- `heading-lg`
- `heading-md`
- `heading-sm`
- `body-lg`
- `body-md`
- `body-sm`
- `label`
- `caption`

Os tamanhos definitivos serão fechados após evolução do Figma.

## 4. Cores

### Preto
Funções:

- background;
- surfaces;
- cards;
- header;
- footer;
- modais.

Devem existir diferentes níveis de preto/cinza escuro para criar profundidade.

### Vermelho
Funções:

- CTA principal;
- links importantes;
- detalhes da marca;
- hover;
- eyebrow;
- estados reservados;
- elementos decorativos.

### Verde
Função exclusiva:

- background;
- glow;
- gradiente;
- iluminação atmosférica.

Não usar verde como:

- reservado;
- confirmação;
- status funcional;
- CTA;
- sucesso.

Motivo: verde comunica com frequência disponível/correto/seguir, portanto não deve ser usado para `RESERVADO`.

### Off-white
Funções:

- títulos;
- informações principais;
- preços;
- ícones.

### Cinza
Funções:

- texto secundário;
- metadata;
- placeholders;
- bordas;
- estados desabilitados.

## 5. Estados

### Disponível
Tratamento neutro.

### Reservado
Tratamento em vermelho.

Pode incluir:

- badge/texto `RESERVADO`;
- redução de saturação;
- redução de opacidade da mídia;
- bloqueio do CTA.

### Indisponível / Arquivado
Tratamento em cinza.

## 6. Eyebrow

Componente textual pequeno acima de títulos.

Exemplo:

`TATTOO • ARTE • AUTORAL`

Características:

- Sora;
- uppercase;
- vermelho;
- tracking maior;
- tamanho reduzido.

## 7. Botões

### Primary
- fundo vermelho;
- ação principal;
- ex.: `RESERVAR FLASH`.

### Secondary
- outline/surface;
- ação secundária;
- ex.: `VER TRABALHOS`.

### Ghost
- sem bloco visual pesado;
- ex.: `VER TODOS →`.

### Danger
- uso prioritário no admin;
- exclusão de conteúdo.

## 8. Cards de profissionais

Não usar badges de categorias nos profissionais.

Conteúdo básico:

- imagem;
- nome;
- tipo/profissão;
- CTA ou interação.

A animação 3D pode revelar informações extras, mas o card não deve virar um mural de tags.

## 9. Cards de conteúdo

Badges pertencem às imagens/trabalhos.

Aplicável a:

- flash;
- arte;
- produto, quando fizer sentido.

Exemplos de badges:

- Geek;
- Fine Line;
- Old School;
- Preto e Branco;
- Colorido;
- Blackwork;
- Anime;
- Floral;
- Oriental;
- Minimalista.

Um item pode possuir várias categorias.

## 10. Gradientes

Gradiente principal:

- preto;
- vermelho;
- pequena presença de verde escuro.

Uso:

- Hero;
- fundos de seção;
- iluminação;
- atmosfera.

Evitar uso excessivo dentro de todos os cards.

## 11. Radius

Prever tokens:

- `radius-sm`;
- `radius-md`;
- `radius-lg`.

Direção atual: cantos arredondados discretos, sem aparência excessivamente “SaaS”.

## 12. Motion System

### Micro
- botão;
- link;
- input;
- badge;
- pequenos hovers.

### Component
- card;
- modal;
- filtro;
- menu;
- galeria.

### Editorial
- Hero;
- transições maiores;
- profissionais;
- efeito 3D;
- seções de impacto.

Regra:

> Quanto mais frequente a interação, menos chamativa deve ser a animação.

## 13. Hover 3D de profissionais

Desktop:

- `perspective`;
- `rotateX`;
- `rotateY`;
- pequena escala;
- leve profundidade;
- revelação de conteúdo.

Mobile:

- nenhuma informação essencial pode depender de hover.

## 14. Responsividade

O código não deve copiar medidas absolutas do Figma.

Usar:

- containers;
- grid;
- flex;
- `clamp()`;
- breakpoints;
- espaçamento responsivo.

## 15. Admin

O painel interno pode reutilizar:

- cores;
- Sora;
- inputs;
- botões;
- tokens.

Porém deve priorizar funcionalidade e legibilidade em vez do nível de animação/editorial do site público.
