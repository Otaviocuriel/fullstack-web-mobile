// ============================================
// DEMONSTRAÇÃO 1: Módulos os e path
// Execute com: node 01-os-path.js
// ============================================

const os = require('os');
const path = require('path');

console.log('========================================');
console.log('  MÓDULO OS - Informações do Sistema');
console.log('========================================\n');

console.log('Sistema Operacional:', os.platform());
console.log('Arquitetura:', os.arch());
console.log('Nome do Host:', os.hostname());
console.log('Diretório Home:', os.homedir());

const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
console.log(`\nMemória Total: ${totalMem} GB`);
console.log(`Memória Livre: ${freeMem} GB`);

const cpus = os.cpus();
console.log(`\nProcessadores: ${cpus.length} núcleos`);
console.log(`Modelo: ${cpus[0].model}`);

const uptime = os.uptime();
const horas = Math.floor(uptime / 3600);
const minutos = Math.floor((uptime % 3600) / 60);
console.log(`\nTempo ligado: ${horas}h ${minutos}min`);

console.log('\n========================================');
console.log('  MÓDULO PATH - Manipulação de Caminhos');
console.log('========================================\n');

const caminho = path.join('projeto', 'src', 'index.js');
console.log('path.join():', caminho);

const absoluto = path.resolve('projeto', 'src', 'index.js');
console.log('path.resolve():', absoluto);

const arquivo = '/home/usuario/projetos/app/server.js';
console.log(`\nAnalisando: "${arquivo}"`);
console.log('  Diretório:', path.dirname(arquivo));
console.log('  Nome do arquivo:', path.basename(arquivo));
console.log('  Extensão:', path.extname(arquivo));
console.log('  Nome sem extensão:', path.basename(arquivo, '.js'));

const parsed = path.parse(arquivo);
console.log('\npath.parse() completo:', parsed);

console.log('\n--- Variáveis Especiais ---');
console.log('__dirname (pasta atual):', __dirname);
console.log('__filename (arquivo atual):', __filename);

const configPath = path.join(__dirname, 'config', 'settings.json');
console.log('Caminho para config:', configPath);
