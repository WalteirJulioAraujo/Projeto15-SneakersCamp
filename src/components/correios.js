import { calcularPrecoPrazo, consultarCep } from "correios-brasil";

export default function correios(setAddress, user, cep) {
  let args = {
    sCepOrigem: "20230012",
    sCepDestino: "25651077",
    nVlPeso: "1",
    nCdFormato: "1",
    nVlComprimento: "20",
    nVlAltura: "20",
    nVlLargura: "20",
    nCdServico: ["04014", "04510"],
    nVlDiametro: "0",
  };
  consultarCep(user?.cep).then((response) => {
    setAddress(response);
  });
  calcularPrecoPrazo(args).then((response) => {
    console.log(response);
  });
  return;
}
