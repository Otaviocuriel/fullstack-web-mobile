// ============================================
// DEMONSTRAÇÃO 4: API HTTP (somente JSON)
// Execute com: node 04-api-http.js
// Teste com: navegador ou curl
// ============================================

const http = require('http');
const os = require('os');

const PORTA = 3000;

// ---- Dados simulados (como se fosse um banco de dados) ----
const alunos = [
  { id: 1, nome: 'Ana Silva', curso: 'Desenvolvimento Web', nota: 9.5 },
  { id: 2, nome: 'Bruno Costa', curso: 'Desenvolvimento Web', nota: 8.0 },
  { id: 3, nome: 'Carla Dias', curso: 'Desenvolvimento Web', nota: 9.0 },
  { id: 4, nome: 'Diego Lima', curso: 'Desenvolvimento Web', nota: 7.5 },
  { id: 5, nome: 'Eva Santos', curso: 'Desenvolvimento Web', nota: 10.0 },
];

// ---- Funções auxiliares ----
function enviarJSON(res, statusCode, dados) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(dados, null, 2));
}

function enviarTexto(res, statusCode, texto) {
  res.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end(texto);
}

// ---- Criar o servidor ----
const servidor = http.createServer((req, res) => {
  const agora = new Date().toLocaleTimeString('pt-BR');
  console.log(`[${agora}] ${req.method} ${req.url}`);

  // ================================================
  // GET / - Informações gerais da API
  // ================================================
  if (req.url === '/' && req.method === 'GET') {
    enviarJSON(res, 200, {
      mensagem: 'Bem-vindo à API de demonstração!',
      versao: '1.0.0',
      rotas: {
        'GET /':               'Esta mensagem (informações da API)',
        'GET /api/alunos':     'Lista todos os alunos',
        'GET /api/alunos/:id': 'Busca aluno por ID (ex: /api/alunos/1)',
        'GET /api/estatisticas': 'Estatísticas da turma',
        'GET /api/sistema':    'Informações do servidor',
        'GET /api/hora':       'Data e hora atual do servidor',
      }
    });

  // ================================================
  // GET /api/alunos - Listar todos os alunos
  // ================================================
  } else if (req.url === '/api/alunos' && req.method === 'GET') {
    enviarJSON(res, 200, {
      sucesso: true,
      total: alunos.length,
      dados: alunos
    });

  // ================================================
  // GET /api/alunos/:id - Buscar aluno por ID
  // ================================================
  } else if (req.url.startsWith('/api/alunos/') && req.method === 'GET') {
    // Extrair o ID da URL
    const partes = req.url.split('/');
    const id = parseInt(partes[3]);

    if (isNaN(id)) {
      enviarJSON(res, 400, {
        sucesso: false,
        erro: 'ID inválido. Use um número inteiro.'
      });
      return;
    }

    const aluno = alunos.find(a => a.id === id);

    if (aluno) {
      enviarJSON(res, 200, {
        sucesso: true,
        dados: aluno
      });
    } else {
      enviarJSON(res, 404, {
        sucesso: false,
        erro: `Aluno com ID ${id} não encontrado.`
      });
    }

  // ================================================
  // GET /api/estatisticas - Estatísticas da turma
  // ================================================
  } else if (req.url === '/api/estatisticas' && req.method === 'GET') {
    const notas = alunos.map(a => a.nota);
    const soma = notas.reduce((acc, n) => acc + n, 0);
    const media = soma / notas.length;
    const maior = Math.max(...notas);
    const menor = Math.min(...notas);
    const aprovados = alunos.filter(a => a.nota >= 7).length;
    const reprovados = alunos.length - aprovados;

    enviarJSON(res, 200, {
      sucesso: true,
      estatisticas: {
        totalAlunos: alunos.length,
        media: parseFloat(media.toFixed(2)),
        maiorNota: maior,
        menorNota: menor,
        aprovados: aprovados,
        reprovados: reprovados
      }
    });

  // ================================================
  // GET /api/sistema - Informações do servidor
  // ================================================
  } else if (req.url === '/api/sistema' && req.method === 'GET') {
    enviarJSON(res, 200, {
      sucesso: true,
      servidor: {
        plataforma: os.platform(),
        arquitetura: os.arch(),
        hostname: os.hostname(),
        cpus: os.cpus().length,
        memoriaTotal: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + ' GB',
        memoriaLivre: (os.freemem() / 1024 / 1024 / 1024).toFixed(2) + ' GB',
        tempoAtivo: Math.floor(os.uptime() / 60) + ' minutos',
        nodeVersion: process.version
      }
    });

  // ================================================
  // GET /api/hora - Data e hora atual
  // ================================================
  } else if (req.url === '/api/hora' && req.method === 'GET') {
    const agora = new Date();
    enviarJSON(res, 200, {
      sucesso: true,
      dataHora: {
        iso: agora.toISOString(),
        local: agora.toLocaleString('pt-BR'),
        data: agora.toLocaleDateString('pt-BR'),
        hora: agora.toLocaleTimeString('pt-BR'),
        timestamp: agora.getTime()
      }
    });

  // ================================================
  // Rota não encontrada (404)
  // ================================================
  } else {
    enviarJSON(res, 404, {
      sucesso: false,
      erro: 'Rota não encontrada',
      rotaAcessada: `${req.method} ${req.url}`,
      dica: 'Acesse GET / para ver as rotas disponíveis'
    });
  }
});

// ---- Iniciar o servidor ----
servidor.listen(PORTA, () => {
  console.log('========================================');
  console.log('  API HTTP - Node.js');
  console.log('========================================');
  console.log(`  URL: http://localhost:${PORTA}`);
  console.log(`  Node.js: ${process.version}`);
  console.log('========================================');
  console.log('\nRotas disponíveis:');
  console.log('  GET /                  -> Info da API');
  console.log('  GET /api/alunos        -> Listar alunos');
  console.log('  GET /api/alunos/:id    -> Buscar por ID');
  console.log('  GET /api/estatisticas  -> Estatísticas');
  console.log('  GET /api/sistema       -> Info do servidor');
  console.log('  GET /api/hora          -> Data e hora');
  console.log('\nPressione Ctrl+C para parar.\n');
  console.log('Requisições:');
  console.log('----------------------------------------');
});
