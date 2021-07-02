import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../contexts/CartContext";
import { AddCircleSharp, RemoveCircleSharp } from "react-ionicons";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  if (cart) {
    cart.forEach((item) => {
      setTotal(total + item.price * item.quantity);
    });
  }

  return (
    <Container>
      <p>Carrinho</p>
      <ul>
        {!cart ? (
          <span>Não possui nenhum produto no carrinho</span>
        ) : (
          cart.map((item, i) => (
            <CartItem key={i} cart={item}>
              <div className="image"></div>
              <div className="text">
                <p>{item.name}</p>
                <p>Size: {item.size}</p>
                <p>
                  Qtd:
                  <RemoveCircleSharp
                    onClick={() => console.log("Remove" + item.id)}
                    color={"#B40202"}
                    height="18px"
                    width="18px"
                  />
                  {item.quantity}
                  <AddCircleSharp
                    onClick={() => console.log("Add" + item.id)}
                    color={"#30B402"}
                    height="18px"
                    width="18px"
                  />
                </p>
              </div>
              <div className="price">
                R$ {(item.price / 100).toFixed(2).replace(".", ",")}
              </div>
            </CartItem>
          ))
        )}
      </ul>
      <div>
        <p>Total:</p>
        <span>R$ {(total / 100).toFixed(2).replace(".", ",")}</span>
      </div>
      <input
        type="button"
        value="Continuar para pagamento"
        onClick={() => history.push("/payment")}
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
  height: 100%;
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
    max-width: 630px;
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
    margin: 0 auto;
    width: 100%;
    max-width: 578px;
    height: 50vh;

    padding-bottom: 15px;

    overflow: auto;
  }

  > div {
    max-width: 630px;
    margin: 10px 0;
    padding: 0 10px;
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

  box-shadow: 5px 5px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: space-between;

  margin-top: 10px;

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

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p {
      font-size: 15px;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    svg {
      margin-left: 3px;
      margin-right: 3px;
    }
  }
  .price {
    padding: 5px;
    background-color: #fff;

    display: flex;
    align-items: flex-start;
  }
`;
