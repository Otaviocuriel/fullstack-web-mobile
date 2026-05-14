const Fastify = require('fastify');
const authPlugin = require('../src/plugins/auth');

async function run() {
  const fastify = Fastify({ logger: false });

  // Registrar plugin de autenticação (que por sua vez registra @fastify/jwt)
  await fastify.register(authPlugin);

  // Rota protegida (POST) que retorna os dados do usuário decorados
  fastify.post('/protected', async (request, reply) => {
    return { usuario: request.usuario };
  });

  await fastify.ready();

  // Gerar token de exemplo
  const token = fastify.jwt.sign({ id: 1, nome: 'Admin', role: 'admin' });
  console.log('Token gerado para teste:\n', token);

  // Fazer um inject (requisição interna) com o token
  const res = await fastify.inject({
    method: 'POST',
    url: '/protected',
    headers: { authorization: `Bearer ${token}` },
    payload: {}
  });

  console.log('Resposta da rota protegida (status):', res.statusCode);
  console.log('Payload:', res.json());

  await fastify.close();
}

run().catch(err => {
  console.error('Erro no teste:', err);
  process.exit(1);
});
