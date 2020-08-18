/*
  Não altere nada ABAIXO disso até o próximo comentário;
  -- Este código permite que tenhamos uma 
  -- experiência interativa com o usuário;
  -- Não é necessário entendê-lo neste momento.
*/
const readline = require("readline");
const { Script } = require("vm");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
  Não altere nada ACIMA deste comentário;;
*/

/**
 * Escreva seu código aqui embaixo;
 */
 const chalk = require('chalk');
 const emoji = require('node-emoji');
 console.log(`Olá, minhas queridas e queridos! \n Sentiram saudades? ${emoji.get('heart')}\n Esse é o nosso cardápio de hoje para vocês: \n* Fatia de torta \n* Bolo de pote \n* Donuts\n* Docinhos \nPode nos falar seu desejo que atendemos com pronta-entrega. ${emoji.get('sunny')} \n`);


 let totalAPagar = 0;

 const sacoladeCompras = [];

 const listaDeProdutos = [
     {
       nomeDoProduto: "Fatia de torta",
       preco: 400,
       qntDisponivel: 25
    },
    {
        nomeDoProduto: "Bolo de pote",
        preco: 500,
        qntDisponivel: 20
     },
     {
        nomeDoProduto: "Donuts",
        preco: 250,
        qntDisponivel: 30
     },
     {
        nomeDoProduto: "Docinhos",
        preco: 100,
        qntDisponivel: 50
 
     },
];

//iniciando o pedido

function procurandoPedido(){
    rl.question('O que você deseja? \n', (resposta) => {
        let produtoEncontrado = false;
        let posicao_Produto = null;
        const pedido = resposta;
        for(let i=0; i<listaDeProdutos.length; i++){
            let produtos = listaDeProdutos[i];
            if(produtos.nomeDoProduto === resposta){
                produtoEncontrado = true;
                posicao_Produto = i;
            }
        }
        achouOuNao(produtoEncontrado, pedido, posicao_Produto);
    });
}

// conferindo se o produto está disponível

function achouOuNao(produtoEncontrado, pedido, posicao_Produto){
    const resposta = pedido;
    const posicao = posicao_Produto;
    if(produtoEncontrado === false){
        console.log(chalk.blue(`Não temos o produto ${pedido}`));
        rl.question("Deseja refazer o pedido ou voltar a sua compra?\n 1- Refazer o pedido\n 2 - Voltar a compra\n 3 - Sair\n", (opcao) =>{
            if(opcao === "1"){
                procurandoPedido();
            }else if(opcao === "2"){
                maisProdutos();
            }else{
                rl.close();
            }
        })
    }else{
        console.log(chalk.red(`Yay! Temos seu produto ${pedido}`));
        rl.question("Quantos(as) você deseja? \n", (qtd) => {
            qtdSolicitada(resposta, qtd, posicao);  
        })      
    }
}

//Calculando quantidade e inserindo na sacola

function qtdSolicitada(resposta, qtd, posicao){
    const nomeDoProdutoPedido = resposta;
    let qntPedida = qtd;
    let estoque = listaDeProdutos[posicao].qntDisponivel;
    const preco_und = listaDeProdutos[posicao].preco;
    if( estoque < qntPedida){
        console.log(`Não temos essa quantidade disponível. Mas temos ${estoque} unidades em estoque.`);
        rl.question("Deseja comprar a quantidade disponível?\n 1- Sim\n 2- Não\n", (opcao) => {
          if(opcao ==="1"){
            qntPedida = estoque;
            sacoladeCompras.push(
                    {
                    nomeDoProduto: nomeDoProdutoPedido,
                    quantidade: qntPedida
                    }
                ); 
            totalAPagar += calcularValor(qntPedida, preco_und); //somando com valores anteriores para montar o total a pagar
            console.log(chalk.green(`Belezinha! O total é: R$ ${totalAPagar.toFixed(2)}.`)); 
            maisProdutos();
          }else{
              console.log(`Tudo bem. Obrigada por procurar nossos produtos. Te vejo na próxima! ${emoji.get('heart')}`);
                rl.close();  
          }
        })
    }else{
        sacoladeCompras.push({
            nomeDoProduto: nomeDoProdutoPedido,
            quantidade: qntPedida
        }); 
        totalAPagar += calcularValor(qntPedida, preco_und); //somando com valores anteriores para montar o total a pagar
        console.log(chalk.green(`Belezinha! O total é: R$ ${totalAPagar.toFixed(2)}.`));
        maisProdutos();
    }
};

// Calculando o valor a pagar por cada produto adicionado

function calcularValor(qntPedida, preco_und){
   let qnt = qntPedida;
   let preco_undReais = preco_und/100;
   let total = qntPedida*preco_undReais;

   return total;
}

// Conferindo se a pessoa deseja acrescentar mais produtos a sacola

function maisProdutos(){
    rl.question("Deseja acrescentar mais produtos a sacola?\n 1 - Sim\n 2 - Não\n", (opcao) =>{
        if(opcao === "1"){
            procurandoPedido();
        }else{
            listarSacola();
        }
    })
}

// Conferindo se a pessoa deseja listar os produtos da sacola

function listarSacola(){
    rl.question("Você deseja listar a sua sacola de compras?\n 1 - Sim\n 2 - Não\n", (opcao) => {
        if(opcao === "1"){
            console.log("Essa é a sua sacola de compras: \n")
            console.log(sacoladeCompras);
            finalizarCompra();
        }else{
            finalizarCompra(); 
        }  
    })
}

// Conferindo se a pessoa deseja finalizar a compra e enviando uma mensagem final

function finalizarCompra(){
    rl.question("Deseja finalizar a compra?\n 1- Sim\n 2- Não\n", (opcao) => {
        if(opcao === "1"){
            console.log(chalk.yellow(`Yeeew! Sua compra foi finalizada! Obrigada pela preferência! ${emoji.get('heart')} \nVolta sempre tá? Estaremos aqui para você!\n`));
            rl.close();
        }else{
            console.log(`Tudo bem. Obrigada por procurar nossos produtos. Te vejo na próxima! ${emoji.get('heart')}`)
            rl.close();  
        }
    })
}

procurandoPedido();