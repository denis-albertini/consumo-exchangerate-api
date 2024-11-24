import PromptSync from "prompt-sync";
const prompt = PromptSync();

export default function conversorForm() {
  let moedaOrigem;
  let moedaDestino;
  let valor;

  moedaOrigem = prompt("Moeda origem: ");

  if (moedaOrigem.length === 0) return false;

  moedaDestino = prompt("Moeda destino: ");

  valor = prompt("Valor: ");

  return {
    moedaOrigem: moedaOrigem,
    moedaDestino: moedaDestino,
    valor: valor,
  };
}
