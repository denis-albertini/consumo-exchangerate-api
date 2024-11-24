import Result from "./result.js";

export default async function consumirExchangeRate(
  moedaOrigem,
  moedaDestino,
  valor
) {
  const apiKey = "YOUR-API-KEY";

  try {
    const resposta = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${moedaOrigem}/${moedaDestino}/${valor}`
    );

    const conversao = await resposta.json();

    return Result.success(conversao);
  } catch (error) {
    return Result.failure(error.message);
  }
}
