require('dotenv').config();

const fastify = require('fastify')({ logger: true });

// ── Swagger — gera a spec OpenAPI automaticamente ─────────────────────────
fastify.register(require('@fastify/swagger'), {
  openapi: {
    info: {
      title: 'API de Filmes',
      description: 'Exemplo de API RESTful com Fastify e NeDB.\nAcesse /docs para ver a documentação interativa.',
      version: '1.0.0',
    },
    tags: [
      { name: 'Filmes', description: 'Operações sobre o catálogo de filmes' },
    ],
  },
});

// ── Swagger UI — interface visual em /docs ────────────────────────────────
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
  },
});

// ── CORS ──────────────────────────────────────────────────────────────────
fastify.register(require('@fastify/cors'));

// ── Rotas ─────────────────────────────────────────────────────────────────
fastify.register(require('./src/routes/filmeRoutes'));

// ── Rota raiz ─────────────────────────────────────────────────────────────
fastify.get('/', async () => ({
  api: 'API de Filmes — REST + Swagger',
  versao: '1.0.0',
  documentacao: 'http://localhost:3000/docs',
  rotas: [
    'GET    /api/v1/filmes',
    'GET    /api/v1/filmes?genero=Ação',
    'GET    /api/v1/filmes/:id',
    'POST   /api/v1/filmes',
    'PUT    /api/v1/filmes/:id',
    'DELETE /api/v1/filmes/:id',
  ],
}));

// ── Tratamento de erros ───────────────────────────────────────────────────
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.code(error.statusCode || 500).send({
    sucesso: false,
    erro: error.message || 'Erro interno do servidor',
  });
});

// ── Iniciar ───────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT) || 3000;

fastify.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📄 Documentação em   http://localhost:${PORT}/docs\n`);
});
