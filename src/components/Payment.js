import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../contexts/CartContext";
import UserContext from "../contexts/UserContext";
import correios from "./correios";
import Loader from "react-loader-spinner";

export default function Payment() {
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const history = useHistory();
  let total = 0;

  if (!user) {
    history.push("/");
  }

  if (cart) {
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
  }

  useEffect(() => {
    correios(setAddress, user);
  }, []);

  function payment() {
    setLoading(true);
    const body = {
      sneakers: JSON.stringify(cart),
      userId: user.id,
      shippingAndress: JSON.stringify(address),
      value: total + 1500,
    };
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    axios
      .post("http://localhost:4000/payment", body, config)
      .then(() => {
        setPaid(true);
        setCart();
        setTimeout(() => {
          history.push("/");
        }, 5000);
      })
      .catch(() => {
        alert("Compra não efetuada");
        setLoading(false);
      });
  }
  if (loading) {
    return (
      <PositionLoader>
        {paid ? (
          <p>Compra concluída com sucesso!</p>
        ) : (
          <Loader type="Oval" color="#FFC947" height={80} width={80} />
        )}
      </PositionLoader>
    );
  }

  return (
    <>
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
            Cidade{" "}
            <span>
              {address?.localidade}, {address?.uf}
            </span>
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
    </>
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

const PositionLoader = styled.div`
  margin: 150px auto 0px;
  padding: 0 15px 15px 15px;

  display: flex;
  justify-content: center;
  p {
    font-size: 25px;
    font-weight: bold;
    color: #ffc947;
  }
`;
