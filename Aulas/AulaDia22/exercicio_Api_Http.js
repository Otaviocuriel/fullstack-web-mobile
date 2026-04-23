// ============================================
// EXERCÍCIO: API HTTP - Catálogo de Produtos
// Execute com: node exercicio.js
// Teste com: curl http://localhost:3000
// ============================================

// TODO 1: Importe os módulos http e os
const http = require('http');
const os = require('os');

const PORTA = 3000;

// TODO 2: Crie um array com pelo menos 4 produtos
// Cada produto deve ter: id, nome, preco, categoria
const produtos = [
  { id: 1, nome: 'Camiseta Node.js', preco: 59.90, categoria: 'Vestuário' },
  { id: 2, nome: 'Teclado Mecânico', preco: 299.90, categoria: 'Periféricos' },
  { id: 3, nome: 'Mouse Gamer', preco: 149.90, categoria: 'Periféricos' },
  { id: 4, nome: 'Monitor Full HD', preco: 899.90, categoria: 'Eletrônicos' }
];

// Função auxiliar para enviar JSON
function enviarJSON(res, statusCode, dados) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(dados, null, 2));
}

// TODO 3: Crie o servidor com http.createServer
const servidor = http.createServer((req, res) => {

  // TODO 4: Log da requisição no terminal
  const agora = new Date();
  const hora = agora.toTimeString().slice(0, 8);
  console.log(`[${hora}] ${req.method} ${req.url}`);

  // TODO 5: Roteamento

  // GET /
  if (req.method === 'GET' && req.url === '/') {
    enviarJSON(res, 200, {
      mensagem: 'API de Produtos',
      rotas: [
        'GET /',
        'GET /api/produtos',
        'GET /api/info'
      ]
    });

  // GET /api/produtos
  } else if (req.method === 'GET' && req.url === '/api/produtos') {
    enviarJSON(res, 200, {
      total: produtos.length,
      produtos: produtos
    });

  // GET /api/info
  } else if (req.method === 'GET' && req.url === '/api/info') {
    enviarJSON(res, 200, {
      plataforma: os.platform(),
      versaoNode: process.version,
      memoriaTotal: os.totalmem(),
      memoriaLivre: os.freemem(),
      hostname: os.hostname()
    });

  // 404
  } else {
    enviarJSON(res, 404, {
      erro: 'Rota não encontrada'
    });
  }

});

// TODO 6: Inicie o servidor
servidor.listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}`);
});