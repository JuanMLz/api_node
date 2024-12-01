// Importa o módulo express para criar o servidor HTTP
import express from "express";

// Importa as rotas públicas (acessíveis sem autenticação)
import publicRoutes from './routes/public.js';

// Importa as rotas privadas (acessíveis apenas com autenticação)
import privateRoutes from './routes/private.js';

// Importa as rotas responsáveis por atualizar informações de usuários
import userUpdateRoutes from './routes/userUpdate.js';

// Importa as rotas responsáveis por buscar informações de usuários
import userGetRoutes from './routes/userGet.js';

// Importa o middleware de autenticação para proteger as rotas privadas
import auth from './middlewares/auth.js';

// Cria uma instância do aplicativo Express
const app = express();

// Configura o middleware para processar requisições JSON
app.use(express.json());

// Define as rotas públicas
// Essas rotas não exigem autenticação e são acessadas pelo prefixo "/public"
app.use('/public', publicRoutes);

// Define as rotas privadas
// Essas rotas exigem autenticação e são protegidas pelo middleware "auth"
app.use('/private', auth, privateRoutes);

// Rotas para atualização de usuários protegidas por autenticação
app.use('/private', auth, userUpdateRoutes);

// Rotas para obtenção de informações dos usuários, também protegidas
app.use('/private', auth, userGetRoutes);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console indicando que ele está rodando
app.listen(3000, () => console.log("Servidor rodando"));
