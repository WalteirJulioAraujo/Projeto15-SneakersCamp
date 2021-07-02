import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import CartContext from "../contexts/CartContext";
import { AddCircleSharp, RemoveCircleSharp } from "react-ionicons";
import UserContext from "../contexts/UserContext";

export default function Cart({ setAmILoginOrSingup }) {
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  console.log(cart);

  setAmILoginOrSingup(false);
  useEffect(() => {
    if (cart) {
      cart.forEach((item) => {
        setTotal(total + item.price * item.quantity);
      });
    }
  }, []);

  return (
    <Container cart={cart}>
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

      {!cart ? (
        ""
      ) : (
        <input
          type="button"
          value="Continuar para pagamento"
          disabled={!cart}
          onClick={() => {
            if (user) {
              history.push("/payment");
            } else {
              history.push("/login");
            }
          }}
        />
      )}

      <input
        type="button"
        value={!cart ? "Escolha seu sneaker" : "Continuar comprando"}
        onClick={() => history.push("/")}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
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
    min-width: fit-content;
    /* max-width: 630px; */
    height: 45px;

    border-radius: 5px;
    border: none;

    font-weight: bold;
    font-size: 20px;

    color: #ffc947;
    background-color: #0a1931;

    margin: 5px auto;

    :hover {
      cursor: pointer;
    }
  }

  ul {
    margin: 0 auto;
    width: 100%;
    /* max-width: 578px; */
    height: 50vh;

    padding-bottom: 15px;

    display: ${(props) => (!props.cart ? "flex" : "block")};
    justify-content: center;
    align-items: center;

    overflow: auto;
  }

  > div {
    /* max-width: 630px; */
    width: 100%;
    margin: 10px auto 0 auto;
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
