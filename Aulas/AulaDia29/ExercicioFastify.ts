import Fastify from 'fastify';
import os from 'os';

const PORTA = 3000;

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  estoque?: number;
}

interface ProdutoParams {
  id: string;
}

interface ProdutoBody {
  nome?: string;
  preco?: number;
  categoria?: string;
  estoque?: number;
}

const produtos: Produto[] = [
  { id: 1, nome: 'Notebook', preco: 9000.00, categoria: 'tecnologia', estoque: 10 },
  { id: 2, nome: 'Smartphone', preco: 8000.00, categoria: 'tecnologia', estoque: 20 },
  { id: 3, nome: 'Tablet', preco: 7000.00, categoria: 'tecnologia', estoque: 30 },
  { id: 4, nome: 'Camera', preco: 6000.00, categoria: 'tecnologia', estoque: 40 },
  { id: 5, nome: 'Fone de Ouvido', preco: 5000.00, categoria: 'tecnologia', estoque: 50 }
];

function respostaLista(total: number, items: Produto[]) {
  return { total, produtos: items };
}

const fastify = Fastify({
  logger: true
});

fastify.get('/', async () => {
  return {
    mensagem: 'API Catálogo Fastify',
    rotas: [
      'GET /',
      'GET /api/produtos',
      'GET /api/produtos/:id',
      'POST /api/produtos',
      'GET /api/info'
    ]
  };
});

fastify.get('/api/produtos', async (request, reply) => {
  return reply.status(200).send(respostaLista(produtos.length, produtos));
});

fastify.get<{ Params: ProdutoParams }>('/api/produtos/:id', async (request, reply) => {
  const id = Number(request.params.id);
  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    return reply.status(404).send({
      erro: 'Produto não encontrado'
    });
  }

  return reply.status(200).send(produto);
});

fastify.post<{ Body: ProdutoBody }>('/api/produtos', async (request, reply) => {
  const { nome, preco, categoria, estoque } = request.body;

  if (!nome || typeof nome !== 'string') {
    return reply.status(400).send({
      erro: 'O campo nome é obrigatório e deve ser uma string'
    });
  }

  if (preco === undefined || typeof preco !== 'number') {
    return reply.status(400).send({
      erro: 'O campo preco é obrigatório e deve ser um number'
    });
  }

  if (categoria !== undefined && typeof categoria !== 'string') {
    return reply.status(400).send({
      erro: 'O campo categoria deve ser uma string'
    });
  }

  if (estoque !== undefined && typeof estoque !== 'number') {
    return reply.status(400).send({
      erro: 'O campo estoque deve ser um number'
    });
  }

  const maxId = produtos.reduce((maior, produto) => {
    return produto.id > maior ? produto.id : maior;
  }, 0);

  const novoProduto: Produto = {
    id: maxId + 1,
    nome,
    preco,
    categoria: categoria || 'Sem categoria'
  };

  if (estoque !== undefined) {
    novoProduto.estoque = estoque;
  }

  produtos.push(novoProduto);

  return reply.status(201).send(novoProduto);
});

fastify.get('/api/info', async () => {
  return {
    sistema: {
      plataforma: os.platform(),
      arquitetura: os.arch(),
      cpus: os.cpus().length,
      memoriaLivreMB: Math.round(os.freemem() / 1024 / 1024),
      memoriaTotalMB: Math.round(os.totalmem() / 1024 / 1024)
    },
    servidor: {
      porta: PORTA,
      framework: 'Fastify'
    }
  };
});

fastify.listen({ port: PORTA, host: '0.0.0.0' }, (erro, address) => {
  if (erro) {
    fastify.log.error(erro);
    process.exit(1);
  }

  console.log(`Servidor rodando em ${address}`);
});
