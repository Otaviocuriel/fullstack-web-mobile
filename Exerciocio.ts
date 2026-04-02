const nome: string = "Otavio";
const idade: number = 25;

if (idade >= 18) {
    console.log(`${nome} é maior de idade.`);
} else {
    console.log(`${nome} é menor de idade.`);
}

const numeros: number[] = [10, 21, 30, 47, 50];

numeros.forEach((numero: number, indice: number) => {
    const tipo: string = numero % 2 === 0 ? "par" : "ímpar";
    console.log(`Posição ${indice}: ${numero} (${tipo})`);
});

export {};