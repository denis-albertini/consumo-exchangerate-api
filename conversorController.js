import consumirExchangeRate from "./conversorService.js";
import conversorOutput from "./conversorOutput.js";
import Conversor from "./conversor.js";
import Result from "./result.js";

export default async function conversorController(formulario) {
  const moedaOrigem = formulario.moedaOrigem;
  const moedaDestino = formulario.moedaDestino;
  const valor = formulario.valor;

  const conversor = new Conversor();

  const erros = [];

  const validaMoedaOrigem = conversor.validarMoedaOrigem(moedaOrigem);
  const validaMoedaDestino = conversor.validarMoedaDestino(moedaDestino);
  const validaValor = conversor.validarValor(valor);

  if (validaMoedaOrigem.isFailure) erros.push(...validaMoedaOrigem.errors);
  if (validaMoedaDestino.isFailure) erros.push(...validaMoedaDestino.errors);
  if (validaValor.isFailure) erros.push(...validaValor.errors);

  if (erros.length > 0) {
    conversorOutput(Result.failure(erros));
    return;
  }

  conversor.moedaOrigem = moedaOrigem;
  conversor.moedaDestino = moedaDestino;
  conversor.valor = valor;

  const requisicao = await consumirExchangeRate(
    conversor.moedaOrigem,
    conversor.moedaDestino,
    conversor.valor
  );

  conversorOutput(requisicao);
}
