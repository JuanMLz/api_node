﻿
# Sistema de Gerenciamento de Usuários

Este projeto é uma API RESTful desenvolvida em **Node.js** com **Express** e **Prisma**, utilizando um banco de dados relacional para gerenciar usuários. A aplicação permite o cadastro, login, atualização e listagem de usuários.

## 🔧 Funcionalidades

- **Cadastro de Usuário**: Permite registrar novos usuários no banco de dados.
- **Login de Usuário**: Gera um token JWT para autenticação.
- **Atualização de Usuário**: Atualiza as informações do usuário autenticado (nome e senha).
- **Listagem de Usuários**: Exibe todos os usuários cadastrados (apenas para teste).

## 🚀 Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do código JavaScript no lado do servidor.
- **Express**: Framework web minimalista para Node.js.
- **Prisma**: ORM (Object-Relational Mapping) para facilitar a comunicação com o banco de dados.
- **bcrypt**: Biblioteca para hashing de senhas.
- **JWT (JsonWebToken)**: Gerenciamento de autenticação por token.
- **MongoDB**: Banco de dados utilizado.

## 📂 Estrutura do Projeto

```bash
📦 Projeto
├── 📂 node_modules
├── 📂 routes
│   ├── public.js            # Rotas públicas: Cadastro e Login
│   ├── private.js           # Rotas privadas protegidas por autenticação
│   ├── userUpdate.js        # Rota para atualização de usuário
│   └── userGet.js           # Rota para buscar usuários
├── 📂 middlewares
│   └── auth.js              # Middleware para autenticação via JWT
├── 📂 prisma
│   └── schema.prisma        # Esquema do banco de dados Prisma
├── 📜 .env                  # Variáveis de ambiente
├── 📜 package.json          # Configurações do projeto
├── 📜 server.js             # Arquivo principal do servidor
└── 📜 README.md             # Documentação do projeto
```

## 📄 Endpoints da API

### 1. **Cadastro de Usuário**

**POST** `/public/cadastro`

- **Body**:
  ```json
  {
    "name": "Nome do usuário",
    "email": "email@example.com",
    "password": "senha123"
  }
  ```

---

### 2. **Login de Usuário**

**POST** `/public/login`

- **Body**:
  ```json
  {
    "email": "email@example.com",
    "password": "senha123"
  }
  ```

- **Resposta** (200 OK):
  ```json
  {
    "token": "JWT_Token_Aqui"
  }
  ```

---

### 3. **Atualização de Usuário**

**PUT** `/private/usuario/:id`

- **Headers**:  
  `Authorization: Bearer <JWT_Token>`

- **Body** (opcional):
  ```json
  {
    "name": "Novo Nome",
    "password": "NovaSenha123"
  }
  ```

---

### 4. **Listar Usuários** (Somente para Teste)

**GET** `/listar-usuarios-publico`

- **Resposta**:
  ```json
  {
    "message": "Usuários listados com sucesso",
    "users": [
      {
        "id": "1",
        "name": "Nome do usuário",
        "email": "email@example.com"
      }
    ]
  }
  ```

---

## 🔑 Autenticação

A API utiliza **JWT (JSON Web Token)** para proteger rotas privadas. Após o login, o token JWT deve ser incluído no cabeçalho `Authorization` para acessar as rotas protegidas.

## 🛠️ Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/projeto-gerenciamento-usuarios.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   JWT_SECRET=seu_segredo_jwt
   DATABASE_URL=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```
4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```

## ⚙️ Variáveis de Ambiente

As seguintes variáveis de ambiente devem ser configuradas:

- `JWT_SECRET`: Segredo utilizado para assinar os tokens JWT.
- `DATABASE_URL`: URL de conexão ao banco de dados MongoDB.

## 📝 Licença

Este projeto é de uso acadêmico e faz parte de uma atividade avaliativa.

## Agradecimentos
Este trabalho foi desenvolvido para a disciplina de **Sistemas distribuidos e mobile**, lecionada pelo professor Jean Paul. A equipe de desenvolvimento foi composta por:

- Juan Moraes Lopes – RA: 12523219000
- Bruno Almeida Vilela – RA: 323124929
- Luiz Henrique Fernandes do Carmo – RA: 323118606
