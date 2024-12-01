// Importa o módulo express para gerenciar as rotas
import express from 'express';

// Importa o cliente Prisma para interagir com o banco de dados
import { PrismaClient } from '@prisma/client';

// Cria um roteador do Express para definir rotas específicas
const router = express.Router();

// Cria uma instância do PrismaClient para realizar operações no banco de dados
const prisma = new PrismaClient();

// Rota GET para listar todos os usuários
// Endpoint: /listar-usuarios
router.get('/listar-usuarios', async (req, res) => {

    try {
        // Busca todos os usuários da tabela "user" no banco de dados
        const users = await prisma.user.findMany();

        // Retorna a lista de usuários com o status 200 (OK)
        res.status(200).json({
            message: 'Usuários listados com sucesso',
            users, // Lista de usuários retornada pelo Prisma
        });

    } catch (err) {
        // Exibe o erro no console para fins de depuração
        console.log(err);

        // Retorna uma mensagem de erro com o status 500 (Erro interno do servidor)
        res.status(500).json({ message: 'Falha no servidor' });
    }
});

// Exporta o roteador para ser utilizado em outros arquivos
export default router;
