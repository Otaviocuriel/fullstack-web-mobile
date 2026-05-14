import * as http from 'http';
import * as os from 'os';

const PORTA = 3000;

type Produto = {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
};

const produtos: Produto[] = [
  { id: 1, nome: 'Bola da Copa do Mundo', preco: 999.99, categoria: 'Esportes' },
  { id: 2, nome: 'Chuteira Adidas', preco: 1799.99, categoria: 'Esportes' },
  { id: 3, nome: 'Chuteira Nike', preco: 1299.99, categoria: 'Esportes' },
  { id: 4, nome: 'Camiseta do Brasil', preco: 499.99, categoria: 'Vestuário' },
  { id: 5, nome: 'Camiseta da Argentina', preco: 499.99, categoria: 'Vestuário' },
  { id: 6, nome: 'Camiseta da França', preco: 499.99, categoria: 'Vestuário' },
  { id: 7, nome: 'Camiseta da Alemanha ', preco: 499.99, categoria: 'Vestuário' },
  { id: 8, nome: 'Camiseta do Mexico ', preco: 499.99, categoria: 'Vestuário' }
];

function enviarJSON(res: http.ServerResponse, statusCode: number, dados: unknown): void {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(dados, null, 2));
}

const servidor = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const agora = new Date();
  const hora = agora.toTimeString().slice(0, 8);
  console.log(`[${hora}] ${req.method} ${req.url}`);

  if (req.method === 'GET' && req.url === '/') {
    enviarJSON(res, 200, {
      mensagem: 'API de Produtos',
      rotas: ['GET /', 'GET /api/produtos', 'GET /api/info']
    });
  } else if (req.method === 'GET' && req.url === '/api/produtos') {
    enviarJSON(res, 200, {
      total: produtos.length,
      produtos
    });
  } else if (req.method === 'GET' && req.url === '/api/info') {
    enviarJSON(res, 200, {
      plataforma: os.platform(),
      versaoNode: process.version,
      memoriaTotal: os.totalmem(),
      memoriaLivre: os.freemem(),
      hostname: os.hostname()
    });
  } else {
    enviarJSON(res, 404, {
      erro: 'Professor aqui nao tem nada para ser visto. Tente acessar outra rota.'
    });
  }
});

servidor.listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}`);
});
