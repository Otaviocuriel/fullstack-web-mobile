// ============================================
// EXERCÍCIO: PERSISTÊNCIA COM NEDB + FASTIFY
// Versão JavaScript
// ============================================

// FAÇA 1: Importe o Fastify e o Datastore do NeDB
const fastify = require('fastify')({ logger: true });
const Datastore = require('@seald-io/nedb');

// FAÇA 2: Crie o banco de dados
// O arquivo jogos.db será criado automaticamente na pasta atual
const db = new Datastore({
  filename: 'jogos.db',
  autoload: true,
  timestampData: true, // adiciona createdAt e updatedAt automaticamente
});

// FAÇA 3: Rota GET /jogos
// Busca todos os jogos salvos no banco e retorna como JSON
fastify.get('/jogos', async (request, reply) => {
  const jogos = await db.findAsync({});
  return reply.send(jogos);
});

// FAÇA 4: Rota POST /jogos
// Lê o body da requisição e salva no banco
// Campos esperados: titulo, genero, ano, nota
fastify.post('/jogos', async (request, reply) => {
  const { titulo, genero, ano, nota } = request.body;

  const novoJogo = await db.insertAsync({
    titulo,
    genero,
    ano,
    nota,
  });

  return reply.status(201).send(novoJogo);
});

// Inicie o servidor
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Servidor rodando em http://localhost:3000');
});

// ─── Exemplos de teste ───────────────────────────────────────────────────────
//
// Criar um jogo:
//   curl -X POST http://localhost:3000/jogos \
//     -H "Content-Type: application/json" \
//     -d "{\"titulo\":\"The Last of Us\",\"genero\":\"Aventura\",\"ano\":2013,\"nota\":9.5}"
//
// Listar todos os jogos:
//   curl http://localhost:3000/jogos
