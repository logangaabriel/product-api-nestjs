# Products API# Products API - NestJS# 🛍️ Products API - Enterprise NestJS Application



API REST para gerenciamento de produtos com autenticação JWT.



## StackAPI REST para gerenciamento de produtos com autenticação JWT e controle de permissões. Desenvolvida com NestJS, TypeScript e PostgreSQL.## 📋 Descrição



- NestJS + TypeScript

- PostgreSQL + TypeORM

- JWT Authentication## FuncionalidadesAPI REST completa para gerenciamento de produtos com arquitetura enterprise, sistema de autenticação JWT robusto, controle granular de permissões e documentação Swagger interativa. Desenvolvida com NestJS seguindo princípios de **Clean Architecture**, **SOLID** e **Domain-Driven Design**.

- Swagger



## Instalação

- **Autenticação JWT** com refresh tokens## ✨ Destaques Técnicos

```bash

npm install- **Gerenciamento de usuários** com roles (admin/user)

cp .env.example .env

npm run start:dev- **CRUD de produtos** com proteção por permissões- **🏗️ Clean Architecture** com separação de responsabilidades

```

- **Paginação e filtros** nas listagens- **🔐 Sistema de Autenticação** JWT com refresh tokens e validações avançadas

## Configuração (.env)

- **Documentação Swagger** automática- **👥 Gerenciamento de Usuários** com roles e controle de acesso

```env

DATABASE_HOST=localhost- **Validações** com class-validator- **📦 CRUD Completo** de produtos com proteção por permissões

DATABASE_PORT=5432

DATABASE_USERNAME=postgres- **� Filtros Avançados** e paginação otimizada

DATABASE_DATABASE=products_db

DATABASE_PASSWORD=sua_senha## Tecnologias- **📚 Documentação Swagger** completa e interativa



JWT_SECRET=sua_chave_secreta- **🗄️ PostgreSQL** com TypeORM e migrations

```

- **NestJS** - Framework Node.js- **✅ Validações Robustas** com class-validator

## Endpoints

- **TypeScript** - Linguagem tipada- **🧪 Arquitetura Testável** com serviços especializados

### Auth

- `POST /auth/register` - Registrar- **PostgreSQL** - Banco de dados

- `POST /auth/login` - Login

- **TypeORM** - ORM## � Tecnologias e Patterns

### Products (público)

- `GET /products` - Listar- **JWT** - Autenticação

- `GET /products/:id` - Buscar

- **bcrypt** - Hash de senhas### Core Technologies

### Users/Products Admin

- Todas operações CRUD requerem admin- **Swagger** - Documentação API- **NestJS 11.0.1** - Framework Node.js enterprise



## Uso- **TypeScript** - Linguagem tipada com decorators



- **API**: http://localhost:3000## Arquitetura- **PostgreSQL** - Banco de dados relacional

- **Docs**: http://localhost:3000/api
- **TypeORM** - ORM com migrations e entities

```- **JWT** - Autenticação stateless com refresh tokens

src/- **bcrypt** - Hash seguro de senhas

├── application/         # Módulo principal

├── modules/            # Módulos de domínio### Architecture Patterns

│   ├── auth/          # Autenticação- **Clean Architecture** - Separação clara de camadas

│   ├── users/         # Usuários- **SOLID Principles** - Código maintível e extensível

│   └── products/      # Produtos- **Dependency Injection** - Baixo acoplamento

├── common/            # Utilitários compartilhados- **Repository Pattern** - Abstração de dados

└── configuration/     # Configurações- **Service Layer** - Lógica de negócio isolada

```- **DTO Pattern** - Validação e transferência de dados



## Endpoints### Quality Assurance

- **class-validator** - Validação de entrada

### Authentication- **Swagger/OpenAPI** - Documentação automática

- `POST /auth/register` - Registrar usuário- **Environment Validation** - Configuração segura

- `POST /auth/login` - Login- **CORS** - Segurança de origem cruzada

- `POST /auth/refresh` - Renovar token

## 🏗️ Arquitetura do Projeto

### Users (Admin apenas)

- `GET /users` - Listar usuários```

- `POST /users` - Criar usuáriosrc/

- `PUT /users/:id` - Atualizar usuário├── application/                 # 🎯 Camada de Aplicação

- `DELETE /users/:id` - Deletar usuário│   ├── app.module.ts           # Módulo raiz da aplicação

│   ├── app.controller.ts       # Controller principal

### Products│   └── app.service.ts          # Service de aplicação

- `GET /products` - Listar produtos (público)├── modules/                    # 📦 Módulos de Domínio

- `POST /products` - Criar produto (admin)│   ├── auth/                   # 🔐 Módulo de Autenticação

- `PUT /products/:id` - Atualizar produto (admin)│   │   ├── auth.service.ts     # Orquestração de autenticação

- `DELETE /products/:id` - Deletar produto (admin)│   │   ├── validation/         # Validações específicas de auth

│   │   │   └── auth-validation.service.ts

## Instalação│   │   ├── services/           # Serviços especializados

│   │   │   └── token.service.ts

```bash│   │   ├── decorators/         # @RequireAuth, @CurrentUser

# Instalar dependências│   │   ├── guards/             # JwtAuthGuard, AdminGuard

npm install│   │   ├── strategies/         # JWT & Local strategies

│   │   ├── dto/                # LoginDto, RegisterDto

# Configurar ambiente│   │   ├── interfaces/         # Contratos internos

cp .env.example .env│   │   └── config/             # Configurações JWT

# Editar .env com suas configurações│   ├── users/                  # 👥 Módulo de Usuários

│   │   ├── users.service.ts    # Orquestração de usuários

# Executar│   │   ├── validation/         # Validações de usuário

npm run start:dev│   │   │   └── user-validation.service.ts

```│   │   ├── services/           # Serviços especializados

│   │   │   ├── user-password.service.ts

## Configuração (.env)│   │   │   └── user-query.service.ts

│   │   ├── entities/           # UsersEntity

```env│   │   └── dto/                # CreateUserDto, UpdateUserDto

# Database│   └── products/               # 📦 Módulo de Produtos

DATABASE_TYPE=postgres│       ├── products.service.ts # Orquestração de produtos

DATABASE_HOST=localhost│       ├── validation/         # Validações de produto

DATABASE_PORT=5432│       │   └── product-validation.service.ts

DATABASE_USERNAME=postgres│       ├── services/           # Serviços especializados

DATABASE_DATABASE=products_db│       │   └── product-query.service.ts

DATABASE_PASSWORD=sua_senha│       ├── entities/           # Product entity

│       └── dto/                # CreateProductDto, UpdateProductDto

# JWT├── common/                     # 🔧 Utilitários Compartilhados

JWT_SECRET=sua_chave_secreta_32_caracteres│   ├── dto/                    # PaginationDto, FiltersDto

JWT_TOKEN_AUDIENCE=http://localhost:3000│   ├── interfaces/             # PaginatedResponse, contratos

JWT_TOKEN_ISSUER=http://localhost:3000│   └── schemas/                # Swagger response schemas

JWT_TOKEN_TTL=3600├── configuration/              # ⚙️ Configurações

JWT_REFRESH_TOKEN_TTL=86400│   ├── database/               # Configuração TypeORM

```│   ├── env.ts                  # Carregamento de variáveis

│   └── env.validation.ts       # Validação de ambiente

## Uso└── infrastructure/             # 🗄️ Infraestrutura

    └── database/

**API**: `http://localhost:3000`          └── migrations/         # Migrations do banco

**Swagger**: `http://localhost:3000/api````



### Teste rápido## 🎯 Principais Endpoints



```bash### 🔐 Authentication (`/auth`)

# Registrar usuário| Método | Endpoint | Descrição | Auth |

curl -X POST http://localhost:3000/auth/register \|--------|----------|-----------|------|

  -H "Content-Type: application/json" \| `POST` | `/auth/register` | Registrar novo usuário | 🔓 |

  -d '{"username":"Admin","email":"admin@test.com","password":"Admin@123"}'| `POST` | `/auth/login` | Autenticar usuário | 🔓 |

| `POST` | `/auth/refresh` | Renovar access token | 🔓 |

# Login

curl -X POST http://localhost:3000/auth/login \### 👥 Users (`/users`)

  -H "Content-Type: application/json" \| Método | Endpoint | Descrição | Auth |

  -d '{"email":"admin@test.com","password":"Admin@123"}'|--------|----------|-----------|------|

```| `GET` | `/users` | Listar usuários (paginado) | 🔒 Admin |

| `GET` | `/users/:id` | Buscar usuário por ID | 🔒 Próprio/Admin |

## Licença| `POST` | `/users` | Criar usuário | 🔒 Admin |

| `PUT` | `/users/:id` | Atualizar usuário | 🔒 Próprio/Admin |

MIT| `PUT` | `/users/:id/password` | Alterar senha | 🔒 Próprio/Admin |
| `DELETE` | `/users/:id` | Deletar usuário | 🔒 Admin |

### 📦 Products (`/products`)
| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/products` | Listar produtos (paginado) | 🔓 Público |
| `GET` | `/products/:id` | Buscar produto por ID | 🔓 Público |
| `POST` | `/products` | Criar produto | 🔒 Admin |
| `PUT` | `/products/:id` | Atualizar produto | 🔒 Admin |
| `DELETE` | `/products/:id` | Deletar produto | 🔒 Admin |

## ⚙️ Configuração e Instalação

### 1. Pré-requisitos
- Node.js 18+ 
- PostgreSQL 12+
- npm ou yarn

### 2. Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd products-api

# Instale as dependências
npm install
```

### 3. Configuração do Ambiente
Crie o arquivo `.env` na raiz do projeto:

```env
# �️ Database Configuration
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_DATABASE=products_db
DATABASE_PASSWORD=sua_senha_segura
DATABASE_AUTOLOADENTITIES=true
DATABASE_SYNCHRONIZE=true

# 🔐 JWT Configuration  
JWT_SECRET=sua_chave_jwt_super_secreta_minimo_32_caracteres
JWT_TOKEN_AUDIENCE=http://localhost:3000
JWT_TOKEN_ISSUER=http://localhost:3000
JWT_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=86400

# 🔒 Security
HASHING_SALT_OR_ROUNDS=12

# 🌐 CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### 4. Banco de Dados
```sql
-- Crie o banco de dados
CREATE DATABASE products_db;
```

### 5. Execução
```bash
# Desenvolvimento com hot-reload
npm run start:dev

# Produção
npm run build
npm run start:prod
```

**🎉 Aplicação disponível em:**
- **API**: `http://localhost:3000`
- **Swagger Docs**: `http://localhost:3000/api`

## 🧪 Testando a API

### 🔥 Teste Rápido
```bash
# 1. Registrar usuário
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "Admin User",
    "email": "admin@example.com", 
    "password": "SecurePass@123"
  }'

# 2. Fazer login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePass@123"
  }'

# 3. Listar produtos (público)
curl http://localhost:3000/products
```

### 📚 Swagger (Recomendado)
1. Acesse `http://localhost:3000/api`
2. Use "Authorize" para configurar o JWT token
3. Teste todos os endpoints interativamente

## 🛡️ Características de Segurança

- **🔐 JWT Authentication** com access e refresh tokens
- **👥 Role-Based Access Control** (Admin/User)
- **🔒 Password Hashing** com bcrypt (salt rounds: 12)
- **✅ Input Validation** rigorosa com class-validator
- **🛡️ SQL Injection Protection** via TypeORM parametrizado
- **🌐 CORS** configurado para ambiente de produção
- **🔍 Environment Validation** na inicialização
- **⏰ Token Expiration** configurável
- **🚫 Account Status** verificação de usuários ativos

## 🎯 Qualidade do Código

### Princípios Aplicados
- ✅ **Single Responsibility Principle**
- ✅ **Open/Closed Principle** 
- ✅ **Liskov Substitution Principle**
- ✅ **Interface Segregation Principle**
- ✅ **Dependency Inversion Principle**

### Patterns Implementados
- ✅ **Repository Pattern** com TypeORM
- ✅ **Service Layer Pattern** para lógica de negócio
- ✅ **DTO Pattern** para validação de entrada
- ✅ **Factory Pattern** para configurações
- ✅ **Decorator Pattern** para autenticação
- ✅ **Strategy Pattern** para diferentes tipos de auth

## 📈 Performance e Escalabilidade

- **📄 Paginação Otimizada** em todas as listagens
- **🔍 Filtros Eficientes** com índices no banco
- **⚡ Lazy Loading** de relações
- **🗄️ Database Pooling** configurado
- **📦 Compression** habilitada
- **⏰ Timeout** configurações apropriadas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma feature branch (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'feat: add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

### Convenções de Commit
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Tarefas de build

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**🏗️ Desenvolvido com foco em arquitetura enterprise e boas práticas de desenvolvimento.**
