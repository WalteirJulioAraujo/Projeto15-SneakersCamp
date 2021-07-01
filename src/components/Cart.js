import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../contexts/CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);
  const history = useHistory();
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });
  return (
    <Container>
      <p>Carrinho:</p>
      <ul>
        {cart.map((item) => (
          <CartItem cart={item}>
            <div className="image"></div>
            <div className="text">
              <p>{item.name}</p>
              <p>Size: {item.size}</p>
              <p>Qtd: {item.quantity}</p>
            </div>
            <div className="price">
              R$ {(item.price / 100).toFixed(2).replace(".", ",")}
            </div>
          </CartItem>
        ))}
      </ul>
      <div>
        <p>Total:</p>
        <span>R$ {(total / 100).toFixed(2).replace(".", ",")}</span>
      </div>
      <input
        type="button"
        value="Continuar para entrega"
        onClick={() => history.push("/shipping")}
      />
      <input
        type="button"
        value="Continuar comprando"
        onClick={() => history.push("/")}
      />
    </Container>
  );
}

const Container = styled.div`
  margin: 63px auto 0px;

  padding: 15px;

  flex-direction: column;
  display: flex;

  p {
    font-size: 30px;
    font-weight: bold;
  }

  input {
    width: 100%;
    height: 45px;

    border-radius: 5px;
    border: none;

    font-weight: bold;
    font-size: 20px;

    color: #ffc947;
    background-color: #0a1931;

    margin: 5px auto;
  }

  ul {
    width: 100%;
    height: 350px;
    overflow-y: hidden;
  }

  > div {
    margin: 10px 0;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 20px;
    }
  }
`;

const CartItem = styled.li`
  width: 95%;
  height: 80px;

  margin: 0 auto;

  border-radius: 5px;
  border: 1px solid #c6c6c6;

  box-shadow: 5px 5px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: space-between;

  margin-top: 10px;
  ${(props) => console.log(props.cart)}

  .image {
    width: 80px;
    height: 80px;
    background-image: url(${(props) => props.cart.image});
    background-position: center;
    background-size: cover;
  }
  .text {
    width: 50%;
    padding: 5px;
    background-color: #ffc947;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p {
      font-size: 15px;
    }
  }
  .price {
    padding: 5px;
    background-color: #fff;

    display: flex;
    align-items: flex-start;
    justify-content: end;
  }
`;
