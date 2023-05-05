import fs from "fs";

// import chalk from "chalk";

function caseErro(erro) {
    throw new Error(erro.code, "Erro na leitura do arquivo!");
}

function getFile(file) {
    const encoding = "UTF-8";
    fs.promises.readFile(file, encoding)
    .then((texto) => console.log(texto))
    .catch(caseErro);
}

// function getFile(file) {
//     const encoding = "UTF-8";
//     fs.readFile(file, encoding, (erro, texto) => {
//         if(erro) {
//             caseErro(erro);
//         }
//         console.log (texto);
//     });
// }

getFile("./arquivos/texto.md")