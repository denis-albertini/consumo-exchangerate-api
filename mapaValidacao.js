const mapaErros = new Map([
  [1, "Erro: moeda de origem deve ter exatamente 3 caracteres!"],
  [2, "Erro: moedas de origem e destino devem ser diferentes!"],
  [3, "Erro: moeda de destino deve ter exatamente 3 caracteres!"],
  [4, "Erro: valor deve ser maior que 0!"],
  [5, "Erro: requisição falhou!"],
]);

export { mapaErros };
