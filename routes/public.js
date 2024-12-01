// Importa os módulos necessários para a aplicação
import express from 'express';           // Para criar e gerenciar rotas
import bcrypt from 'bcrypt';             // Para criptografar senhas
import jwt from 'jsonwebtoken';          // Para gerar e verificar tokens JWT
import { PrismaClient } from '@prisma/client'; // Para interagir com o banco de dados

// Cria uma instância do Prisma Client para operações no banco de dados
const prisma = new PrismaClient();

// Cria um roteador do Express para gerenciar as rotas de autenticação
const router = express.Router();

// Obtém a chave secreta do JWT das variáveis de ambiente
const JWT_SECRET = process.env.JWT_SECRET;

// ================================
// Rota POST - Cadastro de Usuário
// Endpoint: /cadastro
// ================================
router.post('/cadastro', async (req, res) => {
    try {
        const user = req.body; // Obtém os dados enviados no corpo da requisição

        // Gera um salt para aumentar a segurança da senha
        const salt = await bcrypt.genSalt(10);

        // Gera o hash da senha informada pelo usuário
        const hashPassword = await bcrypt.hash(user.password, salt);

        // Cria o usuário no banco de dados com a senha criptografada
        const userDB = await prisma.user.create({
            data: {
                email: user.email,      // Email do usuário
                name: user.name,        // Nome do usuário
                password: hashPassword, // Senha criptografada
            },
        });

        // Retorna o usuário criado com status 201 (Criado)
        res.status(201).json(userDB);

    } catch (err) {
        console.error(err); // Exibe o erro no console para depuração
        res.status(500).json({ message: 'Erro no Servidor, tente novamente' }); // Retorna erro genérico de servidor
    }
});

// ================================
// Rota POST - Login de Usuário
// Endpoint: /login
// ================================
router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body; // Obtém as credenciais enviadas no corpo da requisição

        // Busca o usuário pelo email no banco de dados
        const user = await prisma.user.findUnique({
            where: { email: userInfo.email },
        });

        // Verifica se o usuário existe no banco de dados
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Compara a senha informada com a senha armazenada no banco
        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        // Verifica se a senha está incorreta
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha inválida' });
        }

        // Gera um token JWT com o ID do usuário e validade de 5 minutos
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '5m' });

        // Retorna o token JWT com status 200 (OK)
        res.status(200).json(token);

    } catch (err) {
        console.error(err); // Exibe o erro no console para depuração
        res.status(500).json({ message: 'Erro no Servidor, tente novamente' }); // Retorna erro genérico de servidor
    }
});

// =====================================================
// Rota GET - Listar Usuários (sem autenticação)
// Endpoint: /listar-usuarios-publico
// =====================================================
router.get('/listar-usuarios-publico', async (req, res) => {
    try {
        // Busca todos os usuários no banco de dados, retornando apenas ID, nome e email
        const users = await prisma.user.findMany({
            select: {
                id: true,   // Retorna o ID do usuário
                name: true, // Retorna o nome do usuário
                email: true // Retorna o email do usuário
            }
        });

        // Retorna a lista de usuários com status 200 (OK)
        res.status(200).json({
            message: 'Usuários listados com sucesso',
            users
        });

    } catch (err) {
        console.error(err); // Exibe o erro no console para depuração
        res.status(500).json({ message: 'Erro no servidor' }); // Retorna erro genérico de servidor
    }
});

// Exporta o roteador para ser utilizado em outros arquivos
export default router;


