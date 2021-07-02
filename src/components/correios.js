import { calcularPrecoPrazo, consultarCep } from "correios-brasil";

export default function correios(setAddress, user) {
  consultarCep(user?.cep).then((response) => {
    setAddress(response);
  });
  return;
}
