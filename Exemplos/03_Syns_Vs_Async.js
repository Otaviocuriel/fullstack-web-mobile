// ============================================
// DEMONSTRAÇÃO 3: Síncrono vs Assíncrono
// Execute com: node 03-sync-vs-async.js
// ============================================

const fs = require('fs');
const path = require('path');

const pastaDemo = path.join(__dirname, 'arquivos-demo');
if (!fs.existsSync(pastaDemo)) fs.mkdirSync(pastaDemo);
const arquivo = path.join(pastaDemo, 'teste-async.txt');
fs.writeFileSync(arquivo, 'Conteúdo do arquivo de teste para demonstração.');

// ========================================
// EXEMPLO 1: SÍNCRONO
// ========================================
console.log('========================================');
console.log('  EXEMPLO 1: Leitura SÍNCRONA');
console.log('========================================\n');

console.log('[1] Antes da leitura síncrona');
const dados = fs.readFileSync(arquivo, 'utf8');
console.log('[2] Conteúdo:', dados);
console.log('[3] Depois da leitura síncrona');
console.log('\n-> Ordem: 1, 2, 3 (sequencial, previsível)\n');

// ========================================
// EXEMPLO 2: ASSÍNCRONO
// ========================================
console.log('========================================');
console.log('  EXEMPLO 2: Leitura ASSÍNCRONA');
console.log('========================================\n');

console.log('[A] Antes da leitura assíncrona');

fs.readFile(arquivo, 'utf8', (err, conteudo) => {
  if (err) throw err;
  console.log('[B] Conteúdo:', conteudo);
  console.log('\n-> Ordem: A, C, B (C aparece antes de B!)');
  console.log('-> O Node.js não ficou esperando o arquivo ser lido!');

  // ========================================
  // EXEMPLO 3: MÚLTIPLAS OPERAÇÕES
  // ========================================
  console.log('\n========================================');
  console.log('  EXEMPLO 3: Múltiplas operações');
  console.log('========================================\n');

  console.log('Criando 5 arquivos de forma assíncrona...\n');
  let concluidos = 0;

  for (let i = 1; i <= 5; i++) {
    const caminho = path.join(pastaDemo, `arquivo-${i}.txt`);
    const texto = `Arquivo ${i} - Criado em: ${new Date().toISOString()}`;

    fs.writeFile(caminho, texto, (err) => {
      if (err) throw err;
      concluidos++;
      console.log(`  arquivo-${i}.txt criado (${concluidos}/5)`);

      if (concluidos === 5) {
        console.log('\nTodos os 5 arquivos foram criados!');
        console.log('A ordem de conclusão pode variar a cada execução.');
      }
    });
  }

  console.log('-> Este log aparece ANTES dos arquivos serem criados!');
  console.log('   (O Node.js delegou a escrita e continuou executando)');
});

console.log('[C] Depois da leitura assíncrona');
