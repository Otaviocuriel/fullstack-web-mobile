const nome = "Otavio";
const idade = 25;

if (idade >= 18) {
    console.log(`${nome} é maior de idade.`);
} else {
    console.log(`${nome} é menor de idade.`);
}

const numeros = [10, 21, 30, 47, 50];

numeros.forEach((numero, indice) => {
    const tipo = numero % 2 === 0 ? "par" : "ímpar";
    console.log(`Posição ${indice}: ${numero} (${tipo})`);
});
