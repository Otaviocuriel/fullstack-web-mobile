// ============================================
// DEMONSTRAÇÃO 2: Módulo fs (File System)
// Execute com: node 02-filesystem.js
// ============================================

const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  MÓDULO FS - Sistema de Arquivos');
console.log('========================================\n');

const pastaDemo = path.join(__dirname, 'arquivos-demo');

// 1. Criar diretório
console.log('1. Criando diretório...');
if (!fs.existsSync(pastaDemo)) {
  fs.mkdirSync(pastaDemo);
  console.log('   Pasta "arquivos-demo" criada!\n');
} else {
  console.log('   Pasta já existe, continuando...\n');
}

// 2. Escrever arquivo texto
console.log('2. Escrevendo arquivo texto...');
const conteudo = `Projeto Node.js\nCriado em: ${new Date().toLocaleString('pt-BR')}\nGerado automaticamente pelo Node.js!`;
const caminhoTxt = path.join(pastaDemo, 'info.txt');
fs.writeFileSync(caminhoTxt, conteudo, 'utf8');
console.log(`   Salvo em: ${caminhoTxt}\n`);

// 3. Ler arquivo texto
console.log('3. Lendo arquivo texto...');
const lido = fs.readFileSync(caminhoTxt, 'utf8');
console.log('   Conteúdo:');
lido.split('\n').forEach(linha => console.log('   > ' + linha));
console.log();

// 4. Escrever JSON
console.log('4. Escrevendo arquivo JSON...');
const alunos = {
  turma: 'Desenvolvimento Web',
  semestre: '2025.1',
  alunos: [
    { nome: 'Ana Silva', nota: 9.5 },
    { nome: 'Bruno Costa', nota: 8.0 },
    { nome: 'Carla Dias', nota: 9.0 }
  ]
};
const caminhoJson = path.join(pastaDemo, 'alunos.json');
fs.writeFileSync(caminhoJson, JSON.stringify(alunos, null, 2), 'utf8');
console.log(`   JSON salvo em: ${caminhoJson}\n`);

// 5. Ler e parsear JSON
console.log('5. Lendo e parseando JSON...');
const dados = JSON.parse(fs.readFileSync(caminhoJson, 'utf8'));
console.log(`   Turma: ${dados.turma}`);
dados.alunos.forEach(a => console.log(`   - ${a.nome}: nota ${a.nota}`));
console.log();

// 6. Append
console.log('6. Adicionando texto ao final do arquivo...');
fs.appendFileSync(caminhoTxt, '\nLinha adicionada com appendFileSync!');
console.log('   Texto adicionado!\n');

// 7. Listar diretório
console.log('7. Listando arquivos do diretório...');
fs.readdirSync(pastaDemo).forEach(arq => {
  const stat = fs.statSync(path.join(pastaDemo, arq));
  const tipo = stat.isDirectory() ? '[PASTA]' : '[ARQUIVO]';
  console.log(`   ${tipo} ${arq} (${stat.size} bytes)`);
});
console.log();

// 8. Verificar existência
console.log('8. Verificando existência...');
console.log(`   info.txt existe? ${fs.existsSync(caminhoTxt)}`);
console.log(`   naoexiste.txt existe? ${fs.existsSync(path.join(pastaDemo, 'naoexiste.txt'))}`);
console.log();

// 9. Leitura assíncrona
console.log('9. Leitura ASSÍNCRONA (callback)...');
console.log('   ANTES do readFile');

fs.readFile(caminhoJson, 'utf8', (err, data) => {
  if (err) return console.error('   Erro:', err.message);
  const obj = JSON.parse(data);
  console.log(`   [Callback] JSON lido! Turma: ${obj.turma}`);
  console.log('   Perceba: esta mensagem apareceu POR ÚLTIMO!');
  console.log('\n   Demonstração finalizada! Verifique a pasta arquivos-demo/');
});

console.log('   DEPOIS do readFile (aparece ANTES do callback!)');
