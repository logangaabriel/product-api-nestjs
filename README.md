# 🛍️ Products API - NestJS

API REST para gerenciamento de produtos com autenticação JWT, controle de permissões e documentação Swagger.

## 🚀 Tecnologias

* **NestJS + TypeScript**
* **PostgreSQL + TypeORM**
* **JWT Authentication**
* **Swagger**

## ✨ Funcionalidades

* Autenticação com **access/refresh tokens**
* Controle de usuários com **roles (admin/user)**
* **CRUD de produtos** protegido por permissões
* **Paginação e filtros** em listagens
* Documentação interativa no **Swagger**

## ⚙️ Instalação

```bash
git clone <repository-url>
cd products-api
npm install
cp .env.example .env
npm run start:dev
```

### Configuração `.env`

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_DATABASE=products_db
DATABASE_PASSWORD=sua_senha

JWT_SECRET=sua_chave_jwt_super_secreta
JWT_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=86400
```

## 🎯 Endpoints Principais

### 🔐 Auth

* `POST /auth/register` → Registrar usuário
* `POST /auth/login` → Login
* `POST /auth/refresh` → Renovar token

### 👥 Users (Admin)

* `GET /users` → Listar usuários
* `POST /users` → Criar usuário
* `PUT /users/:id` → Atualizar usuário
* `DELETE /users/:id` → Deletar usuário

### 📦 Products

* `GET /products` → Listar (público)
* `GET /products/:id` → Buscar por ID
* `POST /products` → Criar (admin)
* `PUT /products/:id` → Atualizar (admin)
* `DELETE /products/:id` → Deletar (admin)

## 📚 Swagger

Acesse: [http://localhost:3000/api](http://localhost:3000/api)

## 📄 Licença

MIT
