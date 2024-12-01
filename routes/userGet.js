// Importa os módulos necessários
import express from 'express';                  // Biblioteca para criar e gerenciar rotas
import { PrismaClient } from '@prisma/client';  // Cliente do Prisma para acessar o banco de dados

// Cria uma instância do Prisma Client para executar operações no banco de dados
const prisma = new PrismaClient();

// Cria uma instância do roteador do Express para definir as rotas
const router = express.Router();

/* 
===========================================
Rota GET - Buscar Usuário por ID
Endpoint: /usuario/:id
===========================================
Essa rota busca um usuário específico no banco de dados pelo seu ID.
*/
router.get('/usuario/:id', async (req, res) => {
    // Extrai o ID do usuário dos parâmetros da URL
    const { id } = req.params;

    try {
        // Busca o usuário no banco de dados com base no ID fornecido
        const user = await prisma.user.findUnique({
            where: { id: id.toString() }, // Converte o ID para string
        });

        // Verifica se o usuário foi encontrado
        if (!user) {
            // Retorna um erro 404 (não encontrado) caso o usuário não exista
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Retorna o usuário encontrado com status 200 (OK)
        res.status(200).json(user);
    } catch (err) {
        // Exibe o erro no console para depuração
        console.error(err);

        // Retorna uma resposta de erro 500 (erro no servidor)
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Exporta o roteador para ser utilizado em outros arquivos
export default router;
