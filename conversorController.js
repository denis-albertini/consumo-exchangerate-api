import Result from "./result.js";
import consumirExchangeRate from "./conversorService.js";

export default async function conversorController(conversor, formulario) {
  let validacao = Result.success(null); // Inicializa um Result qualquer

  const moedaOrigem = formulario.moedaOrigem;
  const moedaDestino = formulario.moedaDestino;
  const valor = formulario.valor;

  const validacaoMoedaOrigem = conversor.validarMoedaOrigem(moedaOrigem);
  const validacaoMoedaDestino = conversor.validarMoedaDestino(moedaDestino);
  const validacaoValor = conversor.validarValor(valor);

  if (validacaoMoedaOrigem.isFailure)
    validacao = validacao.mergeErrors(validacaoMoedaOrigem);

  if (validacaoMoedaDestino.isFailure)
    validacao = validacao.mergeErrors(validacaoMoedaDestino);

  if (validacaoValor.isFailure)
    validacao = validacao.mergeErrors(validacaoValor);

  if (validacao.errors.length > 0) return validacao;

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
