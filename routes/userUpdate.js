// Importa os módulos necessários
import express from 'express';                   // Biblioteca para criação de rotas e servidores HTTP
import bcrypt from 'bcrypt';                     // Biblioteca para hashing de senhas
import { PrismaClient } from '@prisma/client';   // Cliente do Prisma para interagir com o banco de dados

// Cria uma instância do Prisma Client para executar operações no banco de dados
const prisma = new PrismaClient();

// Cria uma instância do roteador do Express para definir rotas
const router = express.Router();

/*
===========================================
Rota PUT - Atualizar Usuário por ID
Endpoint: /usuario/:id
===========================================
Essa rota permite atualizar informações do usuário no banco de dados com base no ID fornecido.
*/
router.put('/usuario/:id', async (req, res) => {
    // Obtém o ID do usuário dos parâmetros da URL
    let { id } = req.params;

    // Obtém os dados enviados no corpo da requisição (name e password)
    const { name, password } = req.body;

    // Verifica se o ID é válido (deve ser uma string não vazia)
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'ID inválido' }); // Retorna erro 400 se o ID for inválido
    }

    try {
        // Verifica se o usuário existe no banco de dados pelo ID fornecido
        const existingUser = await prisma.user.findUnique({
            where: { id }, // Busca o usuário pelo ID
        });

        // Caso o usuário não exista, retorna um erro 404 (não encontrado)
        if (!existingUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Cria um objeto para armazenar os dados que serão atualizados
        const updateData = {};

        // Verifica se o nome foi enviado na requisição e, se sim, adiciona ao objeto de atualização
        if (name) {
            updateData.name = name;
        }

        // Verifica se a senha foi enviada e, se sim, realiza o hash antes de atualizar
        if (password) {
            updateData.password = await bcrypt.hash(password, 10); // Hash da nova senha
        }

        // Realiza a atualização no banco de dados com os dados fornecidos
        const updatedUser = await prisma.user.update({
            where: { id },      // Especifica qual usuário será atualizado pelo ID
            data: updateData,   // Passa os campos que serão atualizados
        });

        // Retorna uma resposta de sucesso com o usuário atualizado
        res.status(200).json({ message: 'Usuário atualizado com sucesso', updatedUser });
    } catch (err) {
        // Exibe o erro no console para depuração
        console.error(err);

        // Retorna uma resposta de erro 500 (erro interno no servidor)
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Exporta o roteador para ser utilizado em outros arquivos
export default router;
