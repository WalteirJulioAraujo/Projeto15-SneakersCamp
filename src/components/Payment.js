import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../contexts/CartContext";
import UserContext from "../contexts/UserContext";
import correios from "./correios";

export default function Payment() {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState();
  const history = useHistory();

  if (!user) {
    history.push("/");
  }

  if (cart) {
    cart.forEach((item) => {
      setTotal(total + item.price * item.quantity);
    });
  }

  useEffect(() => {
    correios(setAddress, user);
  }, []);

  function payment() {
    const body = {};
    // const body = {
    //   sneakers: { sneakerId, size, quantity },
    //   userId,
    //   shippingAddress,
    //   value,
    // };
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    axios
      .post("#", body, config)
      .then()
      .catch(() => console.log("não comprado"));
  }

  return (
    <Container>
      <p>{user.name}, vamos para o último passo!</p>
      <div className="subtotal">
        <p>Subtotal</p>
        <p>
          R$ <span>{(total / 100).toFixed(2).replace(".", ",")}</span>
        </p>
      </div>
      <p>Frete</p>
      <Address>
        <p>
          Rua <span>{address?.logradouro}</span>
        </p>
        <p>
          Bairro <span>{address?.bairro}</span>
        </p>
        <p>
          Cidade <span>{address?.localidade}</span>
        </p>
        <p>
          CEP <span>{address?.cep}</span>
        </p>
      </Address>
      <div>
        <p>Valor</p>
        <p>
          R$ <span>15,00</span>
        </p>
      </div>
      <div className="total">
        <p>TOTAL</p>
        <p>R$ {((total + 1500) / 100).toFixed(2).replace(".", ",")}</p>
      </div>
      <input type="button" value="Pagar" onClick={payment} />
    </Container>
  );
}

const Container = styled.div`
  margin: 83px auto 0px;
  padding: 0 15px 15px 15px;

  display: flex;
  flex-direction: column;

  p {
    font-weight: bold;
    font-size: 20px;

    margin-bottom: 15px;

    span {
      font-weight: 400;
    }
  }
  input {
    width: 100%;
    max-width: 630px;
    height: 45px;

    border-radius: 5px;
    border: none;

    font-weight: bold;
    font-size: 20px;

    color: #ffc947;
    background-color: #0a1931;
  }
  div {
    width: 100%;

    border: 1px solid #000;

    display: flex;
    justify-content: space-between;
    border: none;
  }

  .subtotal {
    margin-bottom: 20px;
    border: none;
  }

  .total {
    margin-bottom: 20px;
    margin-top: 20px;
    border: none;
  }
`;

const Address = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  p {
    span {
      font-weight: 400;
    }
  }
`;
