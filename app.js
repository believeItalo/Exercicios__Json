/*
    * Objetivo: criar uma API para manipulação de dados de Estados e Cidades
    * Autor: Ítalo
    * Data: 10/03/2023
    * Versão: 1.0
*/

// express = depêndeca do node quue pemite a integracção enttre o protocolo http com o código
// npm install express --save
//
// cors - gerenciador de permissoespara o protocolo HTTP
// npm install cors --save
//
//Body parser - É uma dependência que permite manipular dados enviados pelo body da requisição
// npm install body-parser --save
//
//npm i - instala as dependencias do projeto

//import das dependências para criar a API
//Responsável pelas requisições
const express = require('express')
//Reponsvael pelas permissões das requicições
const cors = require('cors')
//Responsável pela manipulção do body das requisiçôes
const bodyParser = require('body-parser')

//cria um objeto com as informações da classe express
const app = express()

app.use((request, response, next) => {
    //permite gerenciar a origem das requisições da API
    //o "*" siginifica que a API sera pública, porem podemos no lugar do "*" um ip, que sera 'vip' e só ele podera fazer uso da API
    response.header('Access-Control-Allow-Origin','*')
    //permite gerenciar quais verbo/(metodos) poderão fazer requisicões
    response.header('Access-Control-Allow-Methods','GET, POST, DELETE, PUT, OPTIONS')
    //Ativa no cors das requsições as permissoes estabelecidas 
    app.use(cors())

    next()
})

//endpoints

//endpoint para listar os estados
app.get('/estados', cors(), async function(request, response, next){

    const estadosCidades = require('./module/estados_cidades.js')
    let listaDeEstados = estadosCidades.getListaEstados()
    response.json(listaDeEstados)
    response.status(200)


})
//Permite carregar os endpoints criados e aguardar as requisições pelo protocolo HTTP na porta 8080
app.listen(8080, function(){
    console.log('Servidor aguardando requisições na porta 8080');
})