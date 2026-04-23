class Carrinho {
  constructor() {
    this.produtos = [];
  };

  adicionar(nome, preco) {
    this.produtos.push({ nome, preco });
  };

  listar() {
    this.produtos.forEach(produto => {
      console.log(`Produto: ${produto.nome} | Preço: R$ ${produto.preco}`);
    });
  };

  total() {
    return this.produtos.reduce((soma, produto) => soma + produto.preco, 0);
  };
};


const carrinho = new Carrinho();
carrinho.adicionar("Álbum da Copa do Mundo 2026", 80.00);
carrinho.adicionar("Figurinhas da Copa do Mundo de 2026", 7.00);
carrinho.adicionar("Ingressos para a Copa do Mundo de 2026", 9000.00);

carrinho.listar();
console.log(`Total: R$ ${carrinho.total().toFixed(2)}`);