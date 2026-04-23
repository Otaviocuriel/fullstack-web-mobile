import * as os from 'os';
import * as path from 'path';

console.log('========================================');
console.log('  MODULO OS - Informacoes do Sistema');
console.log('========================================\n');

console.log('Sistema Operacional:', os.platform());
console.log('Arquitetura:', os.arch());
console.log('Nome do Host:', os.hostname());
console.log('Diretorio Home:', os.homedir());

const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
console.log(`\nMemoria Total: ${totalMem} GB`);
console.log(`Memoria Livre: ${freeMem} GB`);

const cpus = os.cpus();
console.log(`\nProcessadores: ${cpus.length} nucleos`);
console.log(`Modelo: ${cpus[0].model}`);

const uptime = os.uptime();
const horas = Math.floor(uptime / 3600);
const minutos = Math.floor((uptime % 3600) / 60);
console.log(`\nTempo ligado: ${horas}h ${minutos}min`);

console.log('\n========================================');
console.log('  MODULO PATH - Manipulacao de Caminhos');
console.log('========================================\n');

const caminho = path.join('projeto', 'src', 'index.js');
console.log('path.join():', caminho);

const absoluto = path.resolve('projeto', 'src', 'index.js');
console.log('path.resolve():', absoluto);

const arquivo = '/home/usuario/projetos/app/server.js';
console.log(`\nAnalisando: "${arquivo}"`);
console.log('  Diretorio:', path.dirname(arquivo));
console.log('  Nome do arquivo:', path.basename(arquivo));
console.log('  Extensao:', path.extname(arquivo));
console.log('  Nome sem extensao:', path.basename(arquivo, '.js'));

const parsed = path.parse(arquivo);
console.log('\npath.parse() completo:', parsed);

console.log('\n--- Variaveis Especiais ---');
console.log('__dirname (pasta atual):', __dirname);
console.log('__filename (arquivo atual):', __filename);

const configPath = path.join(__dirname, 'config', 'settings.json');
console.log('Caminho para config:', configPath);
