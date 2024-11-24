export default function conversorOutput(resultado) {
  console.log();

  if (resultado.isFailure) {
    resultado.errors.forEach((erro) => {
      console.log(erro);
    });

    console.log();

    return;
  }

  const dados = resultado.value;

  if (dados.result === "error") {
    console.log(dados["error-type"]);

    console.log();

    return;
  }

  const conversao =
    dados.base_code +
    " " +
    (dados.conversion_result / dados.conversion_rate)
      .toFixed(2)
      .toString()
      .replace(".", ",") +
    " => " +
    dados.target_code +
    " " +
    dados.conversion_result.toFixed(2) +
    "\n" +
    "Taxa: " +
    dados.conversion_rate.toFixed(6);

  console.log(conversao);

  console.log();
}
