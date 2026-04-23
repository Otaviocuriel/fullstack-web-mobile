"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
console.log('========================================');
console.log('  MODULO FS - Sistema de Arquivos');
console.log('========================================\n');
const pastaDemo = path.join(__dirname, 'arquivos-demo');
console.log('1. Criando diretorio...');
if (!fs.existsSync(pastaDemo)) {
    fs.mkdirSync(pastaDemo);
    console.log('   Pasta "arquivos-demo" criada!\n');
}
else {
    console.log('   Pasta ja existe, continuando...\n');
}
console.log('2. Escrevendo arquivo texto...');
const conteudo = `Projeto Node.js\nCriado em: ${new Date().toLocaleString('pt-BR')}\nGerado automaticamente pelo Node.js!`;
const caminhoTxt = path.join(pastaDemo, 'info.txt');
fs.writeFileSync(caminhoTxt, conteudo, 'utf8');
console.log(`   Salvo em: ${caminhoTxt}\n`);
console.log('3. Lendo arquivo texto...');
const lido = fs.readFileSync(caminhoTxt, 'utf8');
console.log('   Conteudo:');
lido.split('\n').forEach((linha) => console.log('   > ' + linha));
console.log();
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
console.log('5. Lendo e parseando JSON...');
const dados = JSON.parse(fs.readFileSync(caminhoJson, 'utf8'));
console.log(`   Turma: ${dados.turma}`);
dados.alunos.forEach((a) => console.log(`   - ${a.nome}: nota ${a.nota}`));
console.log();
console.log('6. Adicionando texto ao final do arquivo...');
fs.appendFileSync(caminhoTxt, '\nLinha adicionada com appendFileSync!');
console.log('   Texto adicionado!\n');
console.log('7. Listando arquivos do diretorio...');
fs.readdirSync(pastaDemo).forEach((arq) => {
    const stat = fs.statSync(path.join(pastaDemo, arq));
    const tipo = stat.isDirectory() ? '[PASTA]' : '[ARQUIVO]';
    console.log(`   ${tipo} ${arq} (${stat.size} bytes)`);
});
console.log();
console.log('8. Verificando existencia...');
console.log(`   info.txt existe? ${fs.existsSync(caminhoTxt)}`);
console.log(`   naoexiste.txt existe? ${fs.existsSync(path.join(pastaDemo, 'naoexiste.txt'))}`);
console.log();
console.log('9. Leitura ASSINCRONA (callback)...');
console.log('   ANTES do readFile');
fs.readFile(caminhoJson, 'utf8', (err, data) => {
    if (err)
        return console.error('   Erro:', err.message);
    const obj = JSON.parse(data);
    console.log(`   [Callback] JSON lido! Turma: ${obj.turma}`);
    console.log('   Perceba: esta mensagem apareceu POR ULTIMO!');
    console.log('\n   Demonstracao finalizada! Verifique a pasta arquivos-demo/');
});
console.log('   DEPOIS do readFile (aparece ANTES do callback!)');
