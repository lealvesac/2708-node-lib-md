function extraiLinks(arrLinks) {
    return arrLinks.map((objLink) => Object.values(objLink).join());
}

async function checaStatus(listaURLs) {
  const arrStatus = await Promise.all(
    listaURLs.map(async (url) => {
      try {
        const response = await fetch(url);
        return response.status;
      } catch (erro) {
        return manejaErros(erro);
      }
    })
  );
  return arrStatus;
}

function manejaErros(erro) {
    if (erro.cause.code === "ENOTFOUND") {
        return "Link não encontrado!"
    } return "Ocorreu algum erro!"
}

export default async function listaValidada(listaDeLinks) {
  const link =  extraiLinks(listaDeLinks);
  const status = await checaStatus(link);

  return listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status: status[indice]
  }))

}
