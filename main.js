import Conversor from "./conversor.js";
import conversorController from "./conversorController.js";
import conversorForm from "./conversorForm.js";
import conversorOutput from "./conversorOutput.js";

const conversor = new Conversor();

while (1) {
  const formulario = conversorForm();

  if (!formulario) break;

  const controlador = await conversorController(conversor, formulario);

  conversorOutput(controlador);
}
