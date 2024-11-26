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
    const validaMoedaOrigem = this.validarMoedaOrigem(moeda);
    if (validaMoedaOrigem.isFailure) return;

    this.#moedaOrigem = validaMoedaOrigem.value;
  }

  set moedaDestino(moeda) {
    const validaMoedaDestino = this.validarMoedaDestino(moeda);
    if (validaMoedaDestino.isFailure) return;

    this.#moedaDestino = validaMoedaDestino.value;
  }

  set valor(valor) {
    const validaValor = this.validarValor(valor);
    if (validaValor.isFailure) return;

    this.#valor = validaValor.value;
  }

  constructor() {
    if (!Conversor.#instance) Conversor.#instance = this;

    return Conversor.#instance;
  }

  validarMoedaOrigem(moeda) {
    moeda = moeda.toUpperCase();

    if (moeda.length !== 3) return Result.failure(1);

    if (moeda === this.#moedaDestino) return Result.failure(2);

    return Result.success(moeda);
  }

  validarMoedaDestino(moeda) {
    moeda = moeda.toUpperCase();

    if (moeda.length !== 3) return Result.failure(3);

    if (moeda === this.#moedaOrigem) return Result.failure(2);

    return Result.success(moeda);
  }

  validarValor(valor) {
    valor = Number(valor.replace(",", "."));

    if (valor <= 0) return Result.failure(4);

    return Result.success(valor);
  }
}
