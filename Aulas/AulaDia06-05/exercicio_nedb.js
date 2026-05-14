const fastify = require('fastify')({ logger: true });
const Datastore = require('@seald-io/nedb');

const db = new Datastore({
  filename: 'Ensino.db',
  autoload: true,
  timestampData: true,
});

fastify.get('/Ensino', async (request, reply) => {
  const Ensino = await db.findAsync({});
  return reply.send(Ensino);
});

fastify.post('/Ensino', async (request, reply) => {
  const { nome, escola, truma, nota } = request.body;

  const novoEnsino = await db.insertAsync({
    nome,
    escola,
    truma,
    nota,
  });

  return reply.status(201).send(novoEnsino);
});

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Servidor rodando em http://localhost:3000');
});
