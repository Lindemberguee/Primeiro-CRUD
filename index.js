/*
! Explicações Adicionais
*Express: É um framework para Node.js que facilita a criação de servidores web. Ele oferece funcionalidades como roteamento, middlewares e gerenciamento de requisições/respostas.

*Mongoose: É uma biblioteca que simplifica as operações com o MongoDB, um banco de dados NoSQL. O Mongoose oferece uma solução de modelagem de dados e se conecta ao banco de dados usando o padrão de promessas, facilitando a escrita de código assíncrono.

*Middlewares: São funções que têm acesso ao objeto de solicitação (req), ao objeto de resposta (res) e à próxima função de middleware no ciclo de solicitação-resposta da aplicação. Eles são usados para modificar ou analisar requisições e respostas.

*Rotas: Definem os caminhos e métodos (como GET, POST) no servidor. Cada rota pode ter um ou mais manipuladores, que são executados quando a rota é acessada.

*Conexão ao MongoDB: Estabelecer uma conexão segura e eficiente com o banco de dados é crucial. Este código utiliza o Mongoose para gerenciar essa conexão.

*Segurança: É extremamente importante manter as credenciais do banco de dados seguras e não expostas no código, especialmente em repositórios públicos.

*Iniciar o Servidor: O método listen inicia o servidor Express e o deixa pronto para receber requisições na porta especificada.

*/


require('dotenv').config()

// Importando o módulo Express para criar e gerenciar o servidor web
const express = require('express');

// Importando o Mongoose, uma biblioteca que facilita a interação com o MongoDB
const mongoose = require('mongoose');

// Criando uma instância do Express. Isso permite criar rotas, configurar middlewares, etc.
const app = express();

// Configurando middlewares para tratar os dados das requisições


// Middleware para ler dados codificados em URL (normalmente usado em formulários)
app.use(
    express.urlencoded({
        extended: true, // Permitindo dados complexos em formato de objeto e array
    })
);

// Middleware para ler JSON. Converte automaticamente JSON de requisições para objetos JavaScript
app.use(express.json());

// Configuração das rotas da API

// Importando as rotas definidas no arquivo 'personRoutes.js'
const personRoutes = require('./routes/personRoutes');

// Usando as rotas para o caminho '/person'. Qualquer requisição para '/person' usará essas rotas
app.use('/person', personRoutes);

// Definindo a rota inicial do servidor

// Rota do tipo GET para a raiz do servidor ('/')
app.get('/', (req, res) => {
    // Respondendo a requisição com um objeto JSON
    res.json({ message: "Olá express!" });
});

// Configuração do banco de dados MongoDB

// Definindo o usuário e senha para conexão com o banco de dados MongoDB

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Conectando ao MongoDB usando Mongoose
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@estudos.ig0nzy9.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    // Se a conexão for bem-sucedida, este bloco é executado
    console.log("Conectado com sucesso!");
}).catch((err) => {
    // Se houver erro na conexão, este bloco é executado
    console.log(err);
});

// Inicialização do servidor web na porta 3000

// O método 'listen' inicia o servidor na porta especificada (3000)
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
