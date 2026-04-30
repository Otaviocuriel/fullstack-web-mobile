DEMO FASTIFY - GUIA DE DEMONSTRAÇÃO EM SALA
=============================================

Estrutura do projeto:

  demo-fastify/
    server.js                          -> Bootstrap (enxuto)
    .env                               -> Variáveis de ambiente
    package.json
    src/
      models/
        produtoModel.js                -> Dados e CRUD (camada Model)
      controllers/
        produtoController.js           -> Orquestração (camada Controller)
      routes/
        produtoRoutes.js               -> Mapeamento de URLs (camada Routes)
      plugins/
        logger.js                      -> Hook onRequest + onResponse
        auth.js                        -> Hook preHandler + decorator no request
        util.js                        -> Decorators no servidor e reply


ORDEM DE DEMONSTRAÇÃO
---------------------

1. INICIAR O SERVIDOR
   cd demo-fastify
   npm start

   Mostrar: logs de inicialização, plugins registrados


2. ROTA RAIZ (slide 6-7)
   curl http://localhost:3000/

   Mostrar: retorno JSON automático, lista de rotas disponíveis


3. ROTAS GET (slide 9)
   curl http://localhost:3000/api/produtos
   curl http://localhost:3000/api/produtos/1
   curl http://localhost:3000/api/produtos/99
   curl "http://localhost:3000/api/produtos?categoria=Tecnologia"
   curl http://localhost:3000/api/produtos/estatisticas

   Mostrar: listagem, busca por ID, 404, filtro por query string, estatísticas


4. HOOKS E LOG (slides 14-16, 19)
   Mostrar no terminal: cada requisição gera um log com método, URL, status e duração
   Explicar: o plugin logger.js usa onRequest e onResponse


5. AUTENTICAÇÃO - HOOK preHandler (slides 14-16, 19)
   curl -X POST http://localhost:3000/api/produtos -H "Content-Type: application/json" -d '{"nome":"Webcam","preco":280,"categoria":"Acessórios"}'

   Resultado: 401 - Token não fornecido

   curl -X POST http://localhost:3000/api/produtos -H "Content-Type: application/json" -H "Authorization: Bearer token-errado" -d '{"nome":"Webcam","preco":280,"categoria":"Acessórios"}'

   Resultado: 403 - Token inválido

   curl -X POST http://localhost:3000/api/produtos -H "Content-Type: application/json" -H "Authorization: Bearer meu-token-secreto" -d '{"nome":"Webcam","preco":280,"categoria":"Acessórios"}'

   Resultado: 201 - Produto criado!

   Mostrar: o hook preHandler barra a requisição ANTES do controller


6. VALIDAÇÃO COM JSON SCHEMA (slide 12)
   curl -X POST http://localhost:3000/api/produtos -H "Content-Type: application/json" -H "Authorization: Bearer meu-token-secreto" -d '{"nome":"X","preco":-5}'

   Resultado: 400 - Erro de validação (nome muito curto, preço negativo, categoria obrigatória)

   Mostrar: a validação acontece ANTES do handler, sem código extra no controller


7. PUT E DELETE (slide 11)
   curl -X PUT http://localhost:3000/api/produtos/1 -H "Content-Type: application/json" -H "Authorization: Bearer meu-token-secreto" -d '{"preco":3200}'

   curl -X DELETE http://localhost:3000/api/produtos/1 -H "Authorization: Bearer meu-token-secreto"

   Mostrar: atualização parcial, status 204 no delete


8. TRATAMENTO DE ERROS (slide 32)
   curl http://localhost:3000/rota-que-nao-existe

   Mostrar: erro centralizado com formato padronizado, log no terminal


9. ARQUITETURA MVC (slides 24-29)
   Abrir cada arquivo e explicar a responsabilidade de cada camada:
   - Model: só dados e regras
   - Controller: só orquestração
   - Routes: só mapeamento (com schemas)
   - Server.js: só bootstrap (pouquíssimas linhas de lógica)


CONCEITOS DEMONSTRADOS
----------------------

  Conceito                  Onde ver
  -------                   --------
  Rotas GET/POST/PUT/DELETE  src/routes/produtoRoutes.js
  Parâmetros de rota (:id)   src/controllers/produtoController.js
  Query strings (?cat=X)     src/controllers/produtoController.js -> listar
  JSON Schema (validação)    src/routes/produtoRoutes.js -> schemaCriar
  Hook onRequest             src/plugins/logger.js
  Hook onResponse            src/plugins/logger.js
  Hook preHandler            src/plugins/auth.js
  Decorator no request       src/plugins/auth.js -> request.usuario
  Decorator no servidor      src/plugins/util.js -> fastify.util
  Decorator no reply         src/plugins/util.js -> reply.sucesso()
  Encapsulamento de plugins  server.js -> auth só afeta rotas de produto
  Variáveis de ambiente      .env + server.js
  Error handler centralizado server.js -> setErrorHandler
  Arquitetura MVC            src/models + controllers + routes
