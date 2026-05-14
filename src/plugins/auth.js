// ============================================
// PLUGIN: Autenticação simples por token
// Demonstra: hook preHandler e decorator
// preHandler executa ANTES do handler da rota
// ============================================

const fp = require('fastify-plugin');

async function authPlugin(fastify, options) {
  // Registrar plugin @fastify/jwt para suporte a JWT
  fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || 'meu_super_segredo'
  });
  // DECORATOR: adiciona propriedade 'usuario' ao request
  // Decorators estendem objetos existentes sem modificar o código original
  // É como instalar um acessório novo no carro
  fastify.decorateRequest('usuario', null);

  // HOOK: preHandler - executa antes de cada handler
  // Verifica se o header 'authorization' está presente
  fastify.addHook('preHandler', async (request, reply) => {
    // Rotas públicas: GET (listar e buscar são públicos)
    if (request.method === 'GET') {
      return; // Permite acesso sem token
    }

    const authHeader = request.headers['authorization'];

    // Rotas protegidas: POST, PUT, DELETE precisam de token
    if (!authHeader) {
      return reply.code(401).send({
        sucesso: false,
        erro: 'Token de autenticação não fornecido',
        dica: 'Envie o header: Authorization: Bearer <seu-jwt-token>'
      });
    }

    // Extrai o token (Bearer <token>)
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return reply.code(401).send({ sucesso: false, erro: 'Formato do header Authorization inválido' });
    }

    const token = parts[1];

    // Valida o JWT utilizando o método fornecido pelo plugin
    try {
      const payload = await fastify.jwt.verify(token);
      // Decora o request com os dados do usuário a partir do payload
      request.usuario = payload;
    } catch (err) {
      return reply.code(403).send({ sucesso: false, erro: 'Token inválido ou expirado' });
    }
  });

  console.log('Plugin de autenticação registrado!');
}

// fp (fastify-plugin) faz o plugin NÃO encapsular
// Assim o hook de auth se propaga para as rotas registradas no mesmo escopo
module.exports = fp(authPlugin);
