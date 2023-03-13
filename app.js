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

//define as permissões no header da api 
app.use((request, response, next) => {
    //permite gerenciar a origem das requisições da API
    //o "*" siginifica que a API sera pública, porem podemos no lugar do "*" um ip, que sera 'vip' e só ele podera fazer uso da API
    response.header('Access-Control-Allow-Origin', '*')
    //permite gerenciar quais verbo/(metodos) poderão fazer requisicões
    response.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS')
    //Ativa no cors das requsições as permissoes estabelecidas 
    app.use(cors())

    next()
})

//endpoints
const estadosCidades = require('./module/estados_cidades.js')
//endpoint para listar os estados
app.get('/estados', cors(), async function (request, response, next) {

    //import do arquivo  de funções
   

    //chama a função que retorna os estados
    let listaDeEstados = estadosCidades.getListaEstados()

    
    if (listaDeEstados) {
        //retorna o json e o staus code
        response.json(listaDeEstados)
        response.status(200)
    }
    else{
        response.status(500)
    }



})
app.get('/estado/sigla/:uf', cors(), async function(request,response,next){
    // /:uf é uma variávek qye será utilizada para passagens de valores, na RL da requisição

    let siglaEstado = request.params.uf
    //tratamento para validar os valores encaminhados no parâmetro
    if(siglaEstado == ' '|| siglaEstado == undefined|| siglaEstado.length != 2|| !isNaN(siglaEstado)){
        response.status(400)
        response.json({message: 'não é possível processar a requisição pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2 digitos)'})
    }
    else{
        //função que retorna o estado pela sigla
        let estado = estadosCidades.getDadosEstado(siglaEstado)

        //valida se houve retorno válido da função
        if (estado) {
            response.status(200)
            response.json(estado)
        }     
        else{
            response.status(404)
            response.json()
        }
    }

})
app.get('/estado/siglacap/:uf', cors(), async function(request,response,next){
    // /:uf é uma variávek qye será utilizada para passagens de valores, na RL da requisição

    let siglaEstado = request.params.uf
    //tratamento para validar os valores encaminhados no parâmetro
    if(siglaEstado == ' '|| siglaEstado == undefined|| siglaEstado.length != 2|| !isNaN(siglaEstado)){
        response.status(400)
        response.json({message: 'não é possível processar a requisição pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2 digitos)'})
    }
    else{
        //função que retorna o estado pela sigla
        let estado = estadosCidades.getCapitalEstado(siglaEstado)

        //valida se houve retorno válido da função
        if (estado) {
            response.status(200)
            response.json(estado)
        }     
        else{
            response.status(404)
            response.json()
        }
    }

})
app.get('/estado/siglareg/:regiao', cors(), async function(request,response,next){
    // /:uf é uma variávek qye será utilizada para passagens de valores, na RL da requisição

    let regiao = request.params.regiao
    //tratamento para validar os valores encaminhados no parâmetro
   
   
        //função que retorna o estado pela sigla
        let estado = estadosCidades.getEstadosRegiao(regiao)

        //valida se houve retorno válido da função
        if (estado) {
            response.status(200)
            response.json(estado)
        }     
        else{
            response.status(404)
            response.json()
        }
    }

)

//Permite carregar os endpoints criados e aguardar as requisições pelo protocolo HTTP na porta 8080
app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080');
})