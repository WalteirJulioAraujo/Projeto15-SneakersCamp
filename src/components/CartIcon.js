import { useContext } from "react";
import styled from "styled-components";
import CartContext from "../contexts/CartContext";
import { Cart } from "react-ionicons";
import { useHistory } from "react-router-dom";

export default function CartIcon() {
  const { cart } = useContext(CartContext);
  const history = useHistory();
  let amount = 0;
  cart.forEach((item) => (amount += item.quantity));
  return (
    <Circle onClick={() => history.push("/cart")}>
      <Cart color={"#FFC947"} height="40px" width="40px" />
      {amount === 0 ? "" : <Counter>{amount}</Counter>}
    </Circle>
  );
}

const Circle = styled.div`
  width: 60px;
  height: 60px;

  border-radius: 50%;

  background-color: #0a1931;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 20px;
  right: 20px;

  @media (min-width: 640px) {
    top: 93px;
  }
`;

const Counter = styled.div`
  width: 20px;
  height: 20px;

  border-radius: 50%;

  background-color: #185adb;
  color: #fff;

  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 2px;
  right: 2px;
`;
