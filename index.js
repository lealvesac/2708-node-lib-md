import fs from "fs";

function extractorLinks (texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados;
}

function caseErro(erro) {
    throw new Error(erro.code, "Erro na leitura do arquivo!");
}

// async/wait

async function getFile(file) {
    try {
        const encoding = "UTF-8";
        const texto = await fs.promises.readFile(file, encoding);
        console.log(extractorLinks(texto));
    }
    catch (erro) {
        caseErro(erro);
    }
}

getFile("./arquivos/texto.md")

//  \[([^[\]]*?)\]\((https?:\/\/[^\s#.].[^\s]*)\)