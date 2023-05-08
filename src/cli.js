import getFile from "./index.js";
import fs from "fs";

const caminho = process.argv;

function imprimeLista(resultado, identificador = "") {
  console.log("Lista de links ", identificador, resultado);
}

async function processaTexto(argumentos) {
  const caminho = argumentos[2];

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === "ENOENT") {
        console.log("Arquivo ou diretório não encontrado.");
        return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await getFile(argumentos[2]);
    imprimeLista(resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDeArquivo) => {
      const lista = await getFile(`${caminho}/${nomeDeArquivo}`);
      imprimeLista(lista, nomeDeArquivo);
    });
  }
}

processaTexto(caminho);
