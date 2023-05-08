import fs from "fs";

function extractorLinks (texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados.length != 0 ? resultados : "Não há links disponiveis!";
}

function caseErro(erro) {
    throw new Error(erro.code, "Erro na leitura do arquivo!");
}

// async/wait

async function getFile(file) {
    try {
        const encoding = "UTF-8";
        const texto = await fs.promises.readFile(file, encoding);
        return extractorLinks(texto)
    }
    catch (erro) {
        caseErro(erro);
    }
}

export default getFile;