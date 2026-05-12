import Fastify from 'fastify';
import Datastore from '@seald-io/nedb';

interface Escola {
  nome: string;
  escola: string;
  turma: string;
  nota: number;
}

const fastify = Fastify({ logger: true });

const db = new Datastore<Escola>({
  filename: 'escolas.db',
  autoload: true,
  timestampData: true,
});

fastify.get('/escolas', async (request, reply) => {
  const escolas = await db.findAsync({});
  return reply.send(escolas);
});

fastify.post('/escola', async (request, reply) => {
  const { nome, escola, turma, nota } = request.body as Escola;

  const novoEscola = await db.insertAsync({
    nome,
    escola,
    turma,
    nota,
  });

  return reply.status(201).send(novoEscola);
});

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Servidor rodando em http://localhost:3000');
});
