/*
!Explicações Adicionais
* Mongoose e Modelos: O Mongoose é uma biblioteca para o Node.js que facilita a interação com o banco de dados MongoDB. Um dos principais conceitos do Mongoose são os Modelos, que são construtores que pegam um Schema e criam uma instância de um documento equivalente a um registro em uma coleção do MongoDB.

* Schemas: O Schema é uma forma de definir a estrutura e os tipos de dados que um documento (ou registro) em uma coleção específica do MongoDB deve ter. Aqui, o Schema do modelo 'Person' é definido com três propriedades: name, salary, approved, com os tipos String, Number, e Boolean, respectivamente.

* Exportação do Modelo: Ao exportar o modelo Person, você permite que ele seja usado em outras partes do seu aplicativo Node.js. Isso é útil para criar, ler, atualizar e deletar documentos na coleção 'Person' do seu banco de dados MongoDB.


*/


// Importando o Mongoose, uma biblioteca que facilita a interação com o MongoDB
const mongoose = require('mongoose');

// Definição do Modelo 'Person'

// mongoose.model é uma função que define um modelo no Mongoose.
// O modelo representa uma coleção no MongoDB e define a forma dos documentos dentro dessa coleção.

// O primeiro argumento é o nome do modelo, 'Person', que é também o nome da coleção no MongoDB.
// O segundo argumento é um objeto Schema que descreve a estrutura dos documentos na coleção.
// Este Schema define que cada documento na coleção 'Person' terá três campos: 'name', 'salary' e 'approved'.

const Person = mongoose.model('Person', {
    name: String,     // Campo 'name' do tipo String
    salary: Number,   // Campo 'salary' do tipo Number
    approved: Boolean // Campo 'approved' do tipo Boolean
});

// Exportando o modelo 'Person'
// Isso permite que outros arquivos importem e usem este modelo para interagir com a coleção 'Person' no MongoDB.
module.exports = Person;
