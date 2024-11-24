import Result from "./result.js";

export default class Conversor {
  static #instance = null;
  #moedaOrigem;
  #moedaDestino;
  #valor;

  get moedaOrigem() {
    return this.#moedaOrigem;
  }
  get moedaDestino() {
    return this.#moedaDestino;
  }
  get valor() {
    return this.#valor;
  }

  set moedaOrigem(moeda) {
    if (this.validarMoedaOrigem(moeda).isFailure) return;

    this.#moedaOrigem = moeda.toUpperCase();
  }

  set moedaDestino(moeda) {
    if (this.validarMoedaDestino(moeda).isFailure) return;

    this.#moedaDestino = moeda.toUpperCase();
  }

  set valor(valor) {
    if (this.validarValor(valor).isFailure) return;

    this.#valor = Number(valor.replace(",", "."));
  }

  constructor() {
    if (!Conversor.#instance) Conversor.#instance = this;

    return Conversor.#instance;
  }

  validarMoedaOrigem(moeda) {
    moeda = moeda.toUpperCase();

    if (moeda.length !== 3)
      return Result.failure(
        "Moeda de origem deve ter exatamente 3 caracteres!"
      );

    if (moeda === this.#moedaDestino)
      return Result.failure("Moedas de origem e destino devem ser diferentes!");

    return Result.success(moeda);
  }

  validarMoedaDestino(moeda) {
    moeda = moeda.toUpperCase();

    if (moeda.length !== 3)
      return Result.failure(
        "Moeda de destino deve ter exatamente 3 caracteres!"
      );

    if (moeda === this.#moedaOrigem)
      return Result.failure("Moedas de origem e destino devem ser diferentes!");

    return Result.success(moeda);
  }

  validarValor(valor) {
    valor = Number(valor.replace(",", "."));

    if (valor <= 0) return Result.failure("Valor deve ser maior que 0!");

    return Result.success(valor);
  }
}
