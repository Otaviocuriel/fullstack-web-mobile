// ============================================
// EXERCÍCIO: PERSISTÊNCIA COM NEDB + FASTIFY
// Versão TypeScript
// ============================================

import Fastify from 'fastify';
import Datastore from '@seald-io/nedb';

interface Jogo {
  titulo: string;
  genero: string;
  ano: number;
  nota: number;
}

const fastify = Fastify({ logger: true });

const db = new Datastore<Jogo>({
  filename: 'jogos.db',
  autoload: true,
  timestampData: true,
});

fastify.get('/jogos', async (request, reply) => {
  const jogos = await db.findAsync({});
  return reply.send(jogos);
});

fastify.post('/jogos', async (request, reply) => {
  const { titulo, genero, ano, nota } = request.body as Jogo;

  const novoJogo = await db.insertAsync({
    titulo,
    genero,
    ano,
    nota,
  });

  return reply.status(201).send(novoJogo);
});

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Servidor rodando em http://localhost:3000');
});
