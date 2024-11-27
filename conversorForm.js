import conversorController from "./conversorController.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

export default async function conversorForm() {
  let moedaOrigem, moedaDestino, valor;

  moedaOrigem = prompt("Moeda origem: ");

  if (moedaOrigem.length === 0) process.exit();

  moedaDestino = prompt("Moeda destino: ");

  valor = prompt("Valor: ");

  await conversorController({
    moedaOrigem: moedaOrigem,
    moedaDestino: moedaDestino,
    valor: valor,
  });
}
