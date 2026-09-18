# AYŌ Studio — Business Rules

## 1. Plataforma fechada

Na V1:

- visitantes não criam conta;
- profissionais não criam conta;
- apenas a administração altera conteúdo.

## 2. Profissionais

Um profissional:

- pode ter sua própria página;
- pode possuir tipos diferentes de conteúdo;
- não precisa ser tatuador.

## 3. Badges

Badges de categoria pertencem às obras/conteúdos.

Não usar badges de estilo nos cards principais de profissionais.

## 4. Categorias

Um flash pode possuir múltiplas categorias.

Exemplo:

```text
Geek
Fine Line
Preto e Branco
```

## 5. Random

Random na Home é contextual por profissional.

Nunca misturar trabalhos de outro profissional dentro do bloco que representa o artista atual.

Quando houver diversidade suficiente:

- tentar selecionar categorias diferentes;
- não repetir o mesmo flash.

## 6. Reserva

O site não vende na V1.

O botão representa:

- interesse;
- solicitação;
- reserva pendente.

Enviar formulário não confirma automaticamente a reserva.

## 7. Status

Conceitualmente:

- disponível;
- pendente;
- reservado;
- indisponível/arquivado.

A tradução final para enum/modelo será definida no backend.

## 8. Verde

Verde é identidade de background.

Não usar como reservado.

## 9. Loja

A loja funciona como vitrine comercial.

V1:

- imagem;
- nome;
- preço;
- descrição;
- disponibilidade;
- reserva/interesse.

Sem checkout.

## 10. Pedidos personalizados

Profissional pode:

- aceitar;
- pausar;
- limitar pedidos.

## 11. Agenda

Agenda não é responsabilidade da V1.

Deixar possibilidade futura sem modelar uma agenda completa agora.

## 12. Proteção de conteúdo

Não prometer bloqueio absoluto de cópia.

A estratégia é dificultar:

- watermark;
- web versions;
- resolução controlada;
- original protegido;
- barreiras de interação.

## 13. Fonte da verdade

Quando houver conflito:

1. comportamento implementado e aprovado;
2. regras registradas nos `.md`;
3. Figma atualizado;
4. ideias antigas não documentadas.

Decisões novas devem atualizar a documentação.
