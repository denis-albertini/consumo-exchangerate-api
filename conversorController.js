import Result from "./result.js";
import consumirExchangeRate from "./conversorService.js";

export default async function conversorController(conversor, formulario) {
  const moedaOrigem = formulario.moedaOrigem;
  const moedaDestino = formulario.moedaDestino;
  const valor = formulario.valor;

  const erros = [];

  const validaMoedaOrigem = conversor.validarMoedaOrigem(moedaOrigem);
  const validaMoedaDestino = conversor.validarMoedaDestino(moedaDestino);
  const validaValor = conversor.validarValor(valor);

  if (validaMoedaOrigem.isFailure) erros.push(...validaMoedaOrigem.errors);
  if (validaMoedaDestino.isFailure) erros.push(...validaMoedaDestino.errors);
  if (validaValor.isFailure) erros.push(...validaValor.errors);

  if (erros.length > 0) return Result.failure(erros);

  conversor.moedaOrigem = moedaOrigem;
  conversor.moedaDestino = moedaDestino;
  conversor.valor = valor;

  const requisicao = await consumirExchangeRate(
    conversor.moedaOrigem,
    conversor.moedaDestino,
    conversor.valor
  );

  return requisicao;
}
