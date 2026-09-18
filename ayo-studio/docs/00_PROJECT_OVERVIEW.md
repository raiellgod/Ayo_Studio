# AYŌ Studio — Project Overview

> Documento vivo. Atualizar sempre que o escopo geral mudar.

## 1. Visão do produto

AYŌ Studio será um site autoral de apresentação, catálogo e reserva de trabalhos artísticos.

A experiência pública deve lembrar parcialmente um e-commerce em organização e leitura comercial, porém **sem checkout e sem pagamento online na primeira versão**.

O sistema será fechado para administração. Não haverá cadastro público de clientes nem de profissionais na V1.

## 2. Objetivos principais

- apresentar o Studio e sua identidade;
- apresentar profissionais de áreas diferentes;
- permitir que cada profissional tenha sua própria página;
- exibir flashes, artes, vídeos e produtos;
- exibir nome, preço, autoria, categorias e disponibilidade quando aplicável;
- permitir reserva/interesse por formulário;
- permitir pedidos personalizados limitados;
- permitir administração interna de conteúdos;
- dificultar cópia indevida de artes;
- usar animações modernas sem prejudicar usabilidade;
- manter arquitetura preparada para expansão futura.

## 3. Tipos de profissionais previstos

A plataforma não deve ser limitada a tatuadores.

Exemplos:

- tatuador;
- ilustrador;
- dublador;
- designer;
- artista visual;
- outros profissionais criativos.

Cada profissional pode possuir combinações diferentes de conteúdo.

## 4. Módulos públicos previstos

- Home;
- Profissionais;
- Página individual de profissional;
- Flashes;
- Artes;
- Vídeos;
- Loja / catálogo de produtos;
- Reserva / interesse;
- Pedido personalizado;
- Sobre;
- Contato.

## 5. Área administrativa

A administração será privada e simples.

Não haverá sistema público de usuários na V1.

A área administrativa deverá permitir:

- adicionar, editar e excluir profissionais;
- adicionar, editar e excluir flashes;
- adicionar, editar e excluir artes;
- adicionar, editar e excluir vídeos;
- adicionar, editar e excluir produtos;
- gerenciar categorias;
- visualizar solicitações;
- confirmar/cancelar reservas;
- visualizar pedidos personalizados.

A rota pode não ser exposta na navegação pública, porém **não deve depender apenas de uma URL secreta para segurança**.

## 6. Fora do escopo atual

- checkout;
- pagamento online;
- carrinho;
- agenda;
- conta de cliente;
- conta de profissional;
- avaliações;
- marketplace aberto;
- sistema financeiro;
- comissões;
- automação de WhatsApp.

Esses itens podem entrar futuramente.

## 7. Direção visual

A identidade atual trabalha com:

- fundo preto;
- vermelho como cor principal de ação e marca;
- verde apenas como elemento atmosférico do background;
- off-white para títulos e informações principais;
- cinzas para textos secundários;
- tipografia autoral nos títulos;
- tipografia limpa no corpo do texto;
- animações editoriais e modernas.

## 8. Fontes

### Display / títulos
**Architects Daughter**

### Corpo / interface
**Sora**

## 9. Regra de desenvolvimento

A partir da primeira seção da Home, Figma e código serão evoluídos em paralelo:

1. desenhar/refinar seção no Figma;
2. desenhar/refinar página adjacente;
3. fechar comportamento;
4. desenvolver seção;
5. desenvolver página adjacente;
6. revisar responsividade;
7. revisar animações;
8. registrar decisões nos `.md`;
9. seguir para o próximo módulo.
