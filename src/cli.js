import getFile from "./index.js";
import fs from "fs";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function imprimeLista(valida, resultado, identificador = "") {

  if (valida) {
    console.log("Lista de validada ", identificador, await listaValidada(resultado));
  } else {  
  console.log("Lista de links ", identificador, resultado);
  }
}

async function processaTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === "--valida";

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
    imprimeLista(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDeArquivo) => {
      const lista = await getFile(`${caminho}/${nomeDeArquivo}`);
      imprimeLista(valida, lista, nomeDeArquivo);
    });
  }
}

processaTexto(caminho);


