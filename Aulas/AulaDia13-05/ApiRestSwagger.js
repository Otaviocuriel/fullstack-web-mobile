const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/swagger'), {
  routePrefix: '/documentation',
  exposeRoute: true,
  openapi: {
    info: {
      title: 'API de Esporte',
      description: 'API RESTful para estatísticas do Esporte',
      version: '1.0.1',
    },
    tags: [
      {
        name: 'Esporte',
        description: 'Operações do Esporte',
      },
    ],
  },
});

fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
});

const esportes = [
  { id: 1, jogo: 'Paris Saint-Germain X Bayern Munich', arbitro: 'João Pinheiro', nascimento: 1988, campeonato: 'Champions League', nota: 9.5 },
  { id: 2, jogo: 'Arsenal X Atlético de Madrid', arbitro: 'Daniel Siebert', nascimento: 1984, campeonato: 'Champions League', nota: 8.1 },
  { id: 3, jogo: 'Aston Villa X Nottingham Forest', arbitro: 'Glenn Nyberg', nascimento: 1988, campeonato: 'Europa League', nota: 9 },
  { id: 4, jogo: 'Freiburg X Braga', arbitro: 'Davide Massa', nascimento: 1981, campeonato: 'Europa League', nota: 7 },
  { id: 5, jogo: 'São Paulo X Juventude', arbitro: 'Rodrigo José Pereira de Lima', nascimento: 1987, campeonato: 'Copa do Brasil', nota: 0 },
];

fastify.get('/api/esportes', async () => {
  return {
    total: esportes.length,
    esportes,
  };
});

fastify.get('/api/esportes/:id', async (request, reply) => {
  const id = Number(request.params.id);
  const esporte = esportes.find((item) => item.id === id);

  if (!esporte) {
    return reply.status(404).send({
      erro: 'Partida não encontrada',
    });
  }

  return esporte;
});

fastify.post('/api/esportes', async (request, reply) => {
  const { jogo, arbitro, nascimento, campeonato, nota } = request.body;

  if (!jogo) {
    return reply.status(400).send({
      erro: 'O campo jogo é obrigatório',
    });
  }

  const novoEsporte = {
    id: esportes.length + 1,
    jogo,
    arbitro: arbitro || '',
    nascimento: Number(nascimento) || null,
    campeonato: campeonato || '',
    nota: Number(nota) || 0,
  };

  esportes.push(novoEsporte);

  return reply.status(201).send(novoEsporte);
});

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Servidor rodando em http://localhost:3000');
  console.log('Documentação em http://localhost:3000/docs');
});