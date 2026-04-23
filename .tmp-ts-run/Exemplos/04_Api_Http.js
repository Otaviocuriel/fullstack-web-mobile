"use strict";
// ============================================
// DEMONSTRACAO 4: API HTTP (somente JSON)
// Execute com: ts-node 04_Api_Http.ts
// Teste com: navegador ou curl
// ============================================
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const os = __importStar(require("os"));
const PORTA = 3000;
// ---- Dados simulados (como se fosse um banco de dados) ----
const alunos = [
    { id: 1, nome: 'Ana Silva', curso: 'Desenvolvimento Web', nota: 9.5 },
    { id: 2, nome: 'Bruno Costa', curso: 'Desenvolvimento Web', nota: 8.0 },
    { id: 3, nome: 'Carla Dias', curso: 'Desenvolvimento Web', nota: 9.0 },
    { id: 4, nome: 'Diego Lima', curso: 'Desenvolvimento Web', nota: 7.5 },
    { id: 5, nome: 'Eva Santos', curso: 'Desenvolvimento Web', nota: 10.0 }
];
// ---- Funcoes auxiliares ----
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
    // GET / - Informacoes gerais da API
    // ================================================
    if (req.url === '/' && req.method === 'GET') {
        enviarJSON(res, 200, {
            mensagem: 'Bem-vindo a API de demonstracao!',
            versao: '1.0.0',
            rotas: {
                'GET /': 'Esta mensagem (informacoes da API)',
                'GET /api/alunos': 'Lista todos os alunos',
                'GET /api/alunos/:id': 'Busca aluno por ID (ex: /api/alunos/1)',
                'GET /api/estatisticas': 'Estatisticas da turma',
                'GET /api/sistema': 'Informacoes do servidor',
                'GET /api/hora': 'Data e hora atual do servidor'
            }
        });
        // ================================================
        // GET /api/alunos - Listar todos os alunos
        // ================================================
    }
    else if (req.url === '/api/alunos' && req.method === 'GET') {
        enviarJSON(res, 200, {
            sucesso: true,
            total: alunos.length,
            dados: alunos
        });
        // ================================================
        // GET /api/alunos/:id - Buscar aluno por ID
        // ================================================
    }
    else if (req.url?.startsWith('/api/alunos/') && req.method === 'GET') {
        // Extrair o ID da URL
        const partes = req.url.split('/');
        const id = parseInt(partes[3], 10);
        if (Number.isNaN(id)) {
            enviarJSON(res, 400, {
                sucesso: false,
                erro: 'ID invalido. Use um numero inteiro.'
            });
            return;
        }
        const aluno = alunos.find((a) => a.id === id);
        if (aluno) {
            enviarJSON(res, 200, {
                sucesso: true,
                dados: aluno
            });
        }
        else {
            enviarJSON(res, 404, {
                sucesso: false,
                erro: `Aluno com ID ${id} nao encontrado.`
            });
        }
        // ================================================
        // GET /api/estatisticas - Estatisticas da turma
        // ================================================
    }
    else if (req.url === '/api/estatisticas' && req.method === 'GET') {
        const notas = alunos.map((a) => a.nota);
        const soma = notas.reduce((acc, n) => acc + n, 0);
        const media = soma / notas.length;
        const maior = Math.max(...notas);
        const menor = Math.min(...notas);
        const aprovados = alunos.filter((a) => a.nota >= 7).length;
        const reprovados = alunos.length - aprovados;
        enviarJSON(res, 200, {
            sucesso: true,
            estatisticas: {
                totalAlunos: alunos.length,
                media: parseFloat(media.toFixed(2)),
                maiorNota: maior,
                menorNota: menor,
                aprovados,
                reprovados
            }
        });
        // ================================================
        // GET /api/sistema - Informacoes do servidor
        // ================================================
    }
    else if (req.url === '/api/sistema' && req.method === 'GET') {
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
    }
    else if (req.url === '/api/hora' && req.method === 'GET') {
        const agoraData = new Date();
        enviarJSON(res, 200, {
            sucesso: true,
            dataHora: {
                iso: agoraData.toISOString(),
                local: agoraData.toLocaleString('pt-BR'),
                data: agoraData.toLocaleDateString('pt-BR'),
                hora: agoraData.toLocaleTimeString('pt-BR'),
                timestamp: agoraData.getTime()
            }
        });
        // ================================================
        // Rota nao encontrada (404)
        // ================================================
    }
    else {
        enviarJSON(res, 404, {
            sucesso: false,
            erro: 'Rota nao encontrada',
            rotaAcessada: `${req.method} ${req.url}`,
            dica: 'Acesse GET / para ver as rotas disponiveis'
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
    console.log('\nRotas disponiveis:');
    console.log('  GET /                  -> Info da API');
    console.log('  GET /api/alunos        -> Listar alunos');
    console.log('  GET /api/alunos/:id    -> Buscar por ID');
    console.log('  GET /api/estatisticas  -> Estatisticas');
    console.log('  GET /api/sistema       -> Info do servidor');
    console.log('  GET /api/hora          -> Data e hora');
    console.log('\nPressione Ctrl+C para parar.\n');
    console.log('Requisicoes:');
    console.log('----------------------------------------');
});
// Mantida para equivalencia de exemplo com funcoes auxiliares.
void enviarTexto;
