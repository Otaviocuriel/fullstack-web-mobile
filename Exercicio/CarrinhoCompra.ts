class CarrinhoCompra {
  private produtos: { nome: string; preco: number }[];

  constructor() {
    this.produtos = [];
  }

  adicionar(nome: string, preco: number): void {
    this.produtos.push({ nome, preco });
  }

  listar(): void {
    this.produtos.forEach(produto => {
      console.log(`Produto: ${produto.nome} | Preço: R$ ${produto.preco}`);
    });
  }

  total(): number {
    return this.produtos.reduce((soma, produto) => soma + produto.preco, 0);
  }
}

const carrinhoCompra = new CarrinhoCompra();

carrinhoCompra.adicionar("Álbum da Copa do Mundo 2026", 80.00);
carrinhoCompra.adicionar("Figurinhas da Copa do Mundo de 2026", 7.00);
carrinhoCompra.adicionar("Ingressos para a Copa do Mundo de 2026", 9000.00);

carrinhoCompra.listar();
console.log(`Total: R$ ${carrinhoCompra.total().toFixed(2)}`);