const Fastify = require('fastify');
const os = require('os');

const PORTA = 3000;


const produtos = [
  { id: 1, nome: 'Notebook', preco: 9000.00, categoria: 'tecnologia', estoque: 10 },
  { id: 2, nome: 'Smartphone', preco: 8000.00, categoria: 'tecnologia', estoque: 20 },
  { id: 3, nome: 'Tablet', preco: 7000.00, categoria: 'tecnologia', estoque: 30 },
  { id: 4, nome: 'Camera', preco: 6000.00, categoria: 'tecnologia', estoque: 40 },
  { id: 5, nome: 'Fone de Ouvido', preco: 5000.00, categoria: 'tecnologia', estoque: 50 },
];
function respostaLista(total, items) {
  return { total, produtos: items };
}

const fastify = Fastify({
  logger: true
});
fastify.get('/', async (request, reply) => {
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
