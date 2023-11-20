/*
! Explicações Adicionais
*Rotas: Cada rota é definida para lidar com diferentes tipos de requisições (POST, GET, PATCH, DELETE) e diferentes endpoints (como '/', '/:id').

*Async/Await: Estas palavras-chave são usadas para lidar com operações assíncronas, como interações com o banco de dados.

*Validação: Antes de adicionar ou atualizar dados, o código verifica se os dados necessários estão presentes.

*Manipulação de Erros: O uso de blocos try...catch ajuda a capturar e tratar erros que podem ocorrer durante operações de banco de dados.

*Respostas HTTP: Cada rota envia uma resposta apropriada ao cliente, seja uma confirmação de sucesso ou uma mensagem de erro.

*Este código é um exemplo clássico de como criar um CRUD (Create, Read, Update, Delete) usando Express e Mongoose. 

*/




// Importando o Router do Express para criar rotas modulares e isoladas
const router = require('express').Router();

// Importando o modelo 'Person' para interagir com a coleção 'people' no MongoDB
const Person = require('../models/Person');

// Rota para Criação de Dados (POST)

// Definindo uma rota POST para adicionar novos registros de pessoas
router.post('/', async (req, res) => {
    // Extração dos dados enviados na requisição (body)
    const { name, salary, approved } = req.body;

    // Validação: Verifica se o campo 'name' foi enviado na requisição
    if (!name) {
        res.status(422).json({ error: "O nome é obrigatório" });
        return;
    }

    // Cria um objeto person com os dados recebidos
    const person = {
        name,
        salary,
        approved
    };

    try {
        // Adiciona o objeto 'person' ao banco de dados usando o método 'create'
        await Person.create(person);
        // Resposta de sucesso
        res.status(201).json({ message: "Pessoa criada com sucesso!" });
    } catch (error) {
        // Resposta de erro do servidor
        res.status(500).json({ error: error });
    }
});

// Rota para Leitura de Dados (GET)

// Rota GET para buscar todos os registros de pessoas
router.get('/', async (req, res) => {
    try {
        // Busca todos os registros na coleção 'people' e retorna
        const people = await Person.find();
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Rota GET para buscar um registro específico por ID
router.get('/:id', async (req, res) => {
    const id = req.params.id; // Extração do ID da URL

    try {
        // Busca uma pessoa pelo ID fornecido
        const person = await Person.findOne({ _id: id });

        // Se não encontrar a pessoa, retorna erro
        if (!person) {
            res.status(422).json({ message: 'Usuário não encontrado!' });
            return;
        }

        // Retorna o registro encontrado
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Rota para Atualização de Dados (PATCH)

// Rota PATCH para atualizar um registro específico por ID
router.patch('/:id', async (req, res) => {
    const id = req.params.id; // Extração do ID da URL
    const { name, salary, approved } = req.body; // Dados para atualização

    const person = {
        name,
        salary,
        approved,
    };

    try {
        // Atualiza a pessoa com o ID fornecido usando os dados recebidos
        const updatePerson = await Person.updateOne({ _id: id }, person);

        // Se nenhum registro for encontrado, retorna erro
        if (updatePerson.matchedCount === 0) {
            res.status(422).json({ message: 'Usuário não encontrado!' });
            return;
        }

        // Retorna os dados atualizados
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Rota para Deletar Dados (DELETE)

// Rota DELETE para remover um registro específico por ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id; // Extração do ID da URL

    // Verifica se a pessoa existe antes de tentar deletar
    const person = await Person.findOne({ _id: id });

    // Se a pessoa não for encontrada, retorna erro
    if (!person) {
        res.status(422).json({ message: 'Usuário não encontrado!' });
        return;
    }

    try {
        // Deleta a pessoa com o ID fornecido
        await Person.deleteOne({ _id: id });
        // Retorna uma mensagem de sucesso
        res.status(200).json({ message: 'Usuário removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Exportando o router para ser usado no arquivo principal do servidor
module.exports = router;
