import * as fs from 'fs';
import * as path from 'path';

const pastaDemo = path.join(__dirname, 'arquivos-demo');
if (!fs.existsSync(pastaDemo)) fs.mkdirSync(pastaDemo);
const arquivo = path.join(pastaDemo, 'teste-async.txt');
fs.writeFileSync(arquivo, 'Conteudo do arquivo de teste para demonstracao.');

// ========================================
// EXEMPLO 1: SINCRONO
// ========================================
console.log('========================================');
console.log('  EXEMPLO 1: Leitura SINCRONA');
console.log('========================================\n');

console.log('[1] Antes da leitura sincrona');
const dados = fs.readFileSync(arquivo, 'utf8');
console.log('[2] Conteudo:', dados);
console.log('[3] Depois da leitura sincrona');
console.log('\n-> Ordem: 1, 2, 3 (sequencial, previsivel)\n');

// ========================================
// EXEMPLO 2: ASSINCRONO
// ========================================
console.log('========================================');
console.log('  EXEMPLO 2: Leitura ASSINCRONA');
console.log('========================================\n');

console.log('[A] Antes da leitura assincrona');

fs.readFile(arquivo, 'utf8', (err, conteudo) => {
  if (err) throw err;
  console.log('[B] Conteudo:', conteudo);
  console.log('\n-> Ordem: A, C, B (C aparece antes de B!)');
  console.log('-> O Node.js nao ficou esperando o arquivo ser lido!');

  // ========================================
  // EXEMPLO 3: MULTIPLAS OPERACOES
  // ========================================
  console.log('\n========================================');
  console.log('  EXEMPLO 3: Multiplas operacoes');
  console.log('========================================\n');

  console.log('Criando 5 arquivos de forma assincrona...\n');
  let concluidos = 0;

  for (let i = 1; i <= 5; i++) {
    const caminho = path.join(pastaDemo, `arquivo-${i}.txt`);
    const texto = `Arquivo ${i} - Criado em: ${new Date().toISOString()}`;

    fs.writeFile(caminho, texto, (erro) => {
      if (erro) throw erro;
      concluidos++;
      console.log(`  arquivo-${i}.txt criado (${concluidos}/5)`);

      if (concluidos === 5) {
        console.log('\nTodos os 5 arquivos foram criados!');
        console.log('A ordem de conclusao pode variar a cada execucao.');
      }
    });
  }

  console.log('-> Este log aparece ANTES dos arquivos serem criados!');
  console.log('   (O Node.js delegou a escrita e continuou executando)');
});

console.log('[C] Depois da leitura assincrona');
