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

 console.log("Olá, minhas queridas e queridos! \n Sentiram saudades? \n Esse é o nosso cardápio de hoje para vocês: \n* Fatia de torta \n* Bolo de pote \n* Donuts\n* Docinhos \nPode nos falar seu desejo que atendemos com pronta-entrega. ;) \n");

 const chalk = require('chalk');
 const emoji = require('node-emoji');

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
        rl.question("Quantos você deseja? \n", (qtd) => {
            qtdSolicitada(resposta, qtd, posicao);  
        })      
    }
}

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
            totalAPagar = calcularValor(qntPedida, preco_und);
            console.log(chalk.green(`Belezinha! O total é: R$ ${totalAPagar.toFixed(2)}.`));
            console. log(`Essa é a sua sacola:\n ${sacoladeCompras}`);
            maisProdutos();
          }else{
              console.log("Tudo bem. Obrigada por procurar nossos produtos. Te vejo na próxima! ;)")
                rl.close();  
          }
        })
    }else{
        sacoladeCompras.push({
            nomeDoProduto: nomeDoProdutoPedido,
            quantidade: qntPedida
        }); 
        totalAPagar += calcularValor(qntPedida, preco_und);
        console.log(chalk.green(`Belezinha! O total é: R$ ${totalAPagar.toFixed(2)}.`));
        maisProdutos();
    }
};

function calcularValor(qntPedida, preco_und){
   let qnt = qntPedida;
   let preco_undReais = preco_und/100;
   let total = qntPedida*preco_undReais;

   return total;
}


function maisProdutos(){
    rl.question("Deseja acrescentar mais produtos ao carrinho?\n 1 - Sim\n 2 - Não\n", (opcao) =>{
        if(opcao === "1"){
            procurandoPedido();
        }else{
            listarSacola();
        }
    })
}

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

function finalizarCompra(){
    rl.question("Deseja finalizar a compra?\n 1- Sim\n 2- Não\n", (opcao) => {
        if(opcao === "1"){
            console.log(chalk.yellow("Yeeew! Sua compra foi finalizada! Obrigada pela preferência! ;) \nVolta sempre tá? Estaremos sempre aqui para você!\n"));
            rl.close();
        }else{
            console.log("Tudo bem. Obrigada por procurar nossos produtos. Te vejo na próxima! ;)")
            rl.close();  
        }
    })
}

procurandoPedido();