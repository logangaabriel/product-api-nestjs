# 📚 Documentação Swagger API

## 🎯 Acesso à Documentação

Após iniciar a aplicação com `npm run start:dev`, acesse:

**🔗 URL do Swagger**: `http://localhost:3000/api`

## 🔐 Autenticação no Swagger

### Como Testar com JWT no Swagger:

1. **Primeiro, faça login**:
   - Vá para `POST /auth/login`
   - Use as credenciais:
     ```json
     {
       "email": "admin@example.com", 
       "password": "123456"
     }
     ```

2. **Copie o accessToken** da resposta

3. **Configure a autorização**:
   - Clique no botão **"Authorize"** (🔒) no topo da página
   - Cole o token no campo "Value"
   - Clique em "Authorize"

4. **Agora você pode testar endpoints protegidos** como:
   - `POST /products` (apenas admin)
   - `PUT /products/{id}` (apenas admin)
   - `DELETE /products/{id}` (apenas admin)

## 📋 Endpoints Documentados

### 🔐 **Auth** (`/auth`)
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Fazer login
- `POST /auth/refresh` - Renovar tokens

### 👥 **Users** (`/users`)
- `GET /users` - Listar usuários (com filtros)
- `GET /users/{id}` - Buscar usuário por ID
- `POST /users` - Criar usuário
- `PUT /users/{id}` - Atualizar usuário
- `PUT /users/{id}/password` - Alterar senha
- `DELETE /users/{id}` - Deletar usuário

### 📦 **Products** (`/products`)
- `GET /products` - Listar produtos (público)
- `GET /products/{id}` - Buscar produto (público)
- `POST /products` - Criar produto (**🔒 Admin apenas**)
- `PUT /products/{id}` - Atualizar produto (**🔒 Admin apenas**)
- `DELETE /products/{id}` - Deletar produto (**🔒 Admin apenas**)

## 🎨 Recursos do Swagger

### ✅ **Configurado**:
- **Bearer JWT Authentication** - Suporte completo a JWT
- **Schemas detalhados** - DTOs com exemplos e validações
- **Responses documentadas** - Códigos de status e exemplos
- **Filtros de paginação** - Parâmetros query documentados
- **Tags organizadas** - Endpoints agrupados por funcionalidade

### 📊 **Exemplos Incluídos**:
- Todos os DTOs têm exemplos práticos
- Códigos de erro documentados (400, 401, 403, 404, 409)
- Responses de sucesso com estruturas completas
- Filtros de paginação explicados

## 🔍 **Testando Cenários**

### Cenário 1: Usuário Público
```
1. GET /products - ✅ Funciona (público)
2. POST /products - ❌ 401 Unauthorized
```

### Cenário 2: Usuário Normal Autenticado
```
1. POST /auth/login - ✅ Recebe tokens
2. GET /products - ✅ Funciona
3. POST /products - ❌ 403 Forbidden (não é admin)
```

### Cenário 3: Admin Autenticado
```
1. POST /auth/login - ✅ Recebe tokens
2. POST /products - ✅ Cria produto
3. PUT /products/1 - ✅ Atualiza produto
4. DELETE /products/1 - ✅ Deleta produto
```

## 🛠️ **Configurações Técnicas**

### JWT Bearer Auth:
```json
{
  "type": "http",
  "scheme": "bearer", 
  "bearerFormat": "JWT",
  "description": "Enter JWT token"
}
```

### Swagger Options:
```json
{
  "persistAuthorization": true
}
```

## 📝 **Schemas Principais**

### AuthResponse:
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "User Name", 
    "isAdmin": false
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### PaginatedResponse:
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasPrevious": false,
    "hasNext": true
  }
}
```

---

**💡 Dica**: Mantenha a aba do Swagger aberta durante o desenvolvimento para testar rapidamente as mudanças na API!