# 🔗 API Encurtador de Links

API REST para encurtar URLs, com autenticação de usuários, contador de cliques e gerenciamento completo de links.

---

## 📋 Índice

- Sobre o Projeto
- Funcionalidades
- Tecnologias
- Pré-requisitos
- Instalação
- Configuração
- Executando o Projeto
- Documentação da API
- Swagger (OpenAPI)
- Estrutura do Projeto
- Testes
- Segurança
- Deploy
- Autor
- Roadmap

---

## 🎯 Sobre o Projeto

Este projeto é uma API completa para encurtamento de links, permitindo que usuários autenticados criem, gerenciem e monitorem seus links encurtados.

A API conta com autenticação JWT, soft delete, paginação e contador de cliques em tempo real.

---

## ✨ Funcionalidades

- Registro e login de usuários
- Autenticação JWT
- CRUD de links encurtados
- Paginação
- Soft delete
- Contador de cliques
- Redirecionamento público

---

## 🛠️ Tecnologias

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- Bcrypt
- Zod
- Nanoid

---

## 📋 Pré-requisitos

- Node.js v18+
- PostgreSQL
- Git

---

## 🚀 Instalação

```bash
git clone https://github.com/seu-usuario/api-encurtador-links.git
cd api-encurtador-links
npm install
```

---

## ⚙️ Configuração

Crie um arquivo `.env`:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/encurtador_links
JWT_SECRET=sua_chave_secreta
PORT=3000
```

Execute as migrações:

```bash
npx prisma generate
npx prisma migrate dev
```

---

## 📚 Rotas da API

Base local:
```
http://localhost:3000
```

Produção:
```
https://seu-app.onrender.com
```

---

## 📑 Documentação da API - Swagger

```
/api-docs
```

---

## 📁 Estrutura do Projeto

```
src/
├── controllers
├── services
├── routes
├── middlewares
├── utils
└── server.js
```

---

## 🧪 Testes

Testes manuais via Postman / Insomnia.

---

## 🔒 Segurança

- Senhas criptografadas
- JWT
- Variáveis de ambiente

---

## 🚀 Deploy

Deploy recomendado: Render.

---

## 👨‍💻 Autores

Projeto desenvolvido em grupo por:

- **Luciano Junior**
- **Jefferson Santos**
- **Clara Roosenvelt**
- **Beatriz de Deus**
- **Lucas Barbosa**
- **Agda Oliveira**

---

## 🎯 Roadmap

- Analytics
- QR Code
- Dashboard web