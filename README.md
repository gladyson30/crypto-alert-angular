# Crypto Alert — Angular

Front-end em Angular para a [crypto-alert-api](https://github.com/gladyson30/crypto-alert-api), uma API em Spring Boot que monitora preços de criptomoedas e avisa o usuário por e-mail quando o preço atinge o valor definido.

## Funcionalidades

- Cadastro e login de usuários com autenticação JWT
- CRUD de alertas de preço (moeda, preço alvo e direção: acima ou abaixo)
- Consulta de cotação em tempo real, em BRL e USD
- Rotas protegidas por guard e envio automático do token por interceptor
- Validação de formulários e mensagens de erro de acordo com o status HTTP

## Tecnologias

- Angular 22 (componentes standalone, signals e nova sintaxe de controle de fluxo)
- TypeScript
- Reactive Forms
- RxJS e HttpClient

## Como funciona a integração

1. O usuário faz login e a API devolve um token JWT, que fica salvo no navegador.
2. Um interceptor adiciona o token (`Authorization: Bearer ...`) em todas as requisições protegidas.
3. Um guard impede o acesso às telas de alertas sem login e, se o token expirar, o usuário é deslogado.
4. No backend, um scheduler verifica os alertas periodicamente e publica os que foram atingidos em um tópico Kafka, que dispara o envio do e-mail.

## Como rodar

**Pré-requisitos:** Node.js 20+, Angular CLI e a [crypto-alert-api](https://github.com/gladyson30/crypto-alert-api) rodando em `http://localhost:8080`.

```bash
git clone https://github.com/gladyson30/crypto-alert-angular.git
cd crypto-alert-angular
npm install
ng serve
```

Acesse `http://localhost:4200`.

A URL da API pode ser alterada em `src/environments/environment.ts`.

## Estrutura

```
src/app/
├── components/    componentes reutilizáveis (consulta de cotação)
├── guards/        proteção das rotas autenticadas
├── interceptors/  envio do token JWT e tratamento de sessão expirada
├── models/        interfaces que espelham os DTOs da API
├── pages/         login, cadastro, lista e formulário de alertas
└── services/      comunicação com a API
```

## Autor

Gladyson Gabriel — [GitHub](https://github.com/gladyson30)
