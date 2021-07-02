import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Size from "./Size.js";
import axios from "axios";
import CartContext from "../contexts/CartContext.js";

export default function BuyInfo({ info, setShowBuyInfo }) {
  const size = [38, 39, 40, 41, 42, 43, 44, 45];
  const [sizeSelect, setSizeSelect] = useState(0);
  const [availabeSizes, setAvailabeSizes] = useState([]);
  const [maxQtd, setMaxQtd] = useState(0);
  const [qtd, setQtd] = useState(0);
  const [lastUnits, setLastUnits] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    const request = axios.get(`https://back-projeto-sneakercamp.herokuapp.com/stock/${info.id}`);
    request.then((e) => {
      const allsizes = [];
      const qtdsizes = [];
      e.data.map((i) => {
        allsizes.push(i.size);
        qtdsizes.push({ size: i.size, quantity: i.quantity });
      });
      setAvailabeSizes(allsizes);
      setMaxQtd(qtdsizes);
    });
    request.catch(() =>
      console.log("erro ao procurar os tamanhos disponiveis")
    );
  }, []);

  function Add(e) {
    e.stopPropagation();
    if (sizeSelect === 0) {
      return;
    }
    const max = checkMaxQuantity();
    if (qtd === max) {
      return;
    }
    setQtd(qtd + 1);
  }

  function Remove(e) {
    e.stopPropagation();
    if (qtd === 0) {
      return;
    }
    setQtd(qtd - 1);
  }

  function ToCart(e) {
    e.stopPropagation();
    if (sizeSelect === 0) {
      return;
    }
    setShowBuyInfo(false);
    setCart([
      ...cart,
      {
        name: info.name,
        price: info.price,
        id: info.id,
        size: sizeSelect,
        quantity: qtd,
        image: info.image,
      },
    ]);
  }

  function checkMaxQuantity() {
    let max = 0;
    if (maxQtd === 0) {
      return;
    }
    maxQtd.map((e) => {
      if (e.size === sizeSelect) {
        max = e.quantity;
      }
    });
    if (max < 3) {
      setLastUnits(max);
    } else {
      setLastUnits(false);
    }
    return max;
  }

  return (
    <>
      <p>{info.description}</p>
      <Sizes>
        {size.map((e) => (
          <Size
            num={e}
            setSizeSelect={setSizeSelect}
            selected={e === sizeSelect ? true : false}
            availabeSizes={availabeSizes}
            checkMaxQuantity={checkMaxQuantity}
            setQtd={setQtd}
          />
        ))}
      </Sizes>
      {lastUnits && sizeSelect ? (
        <LastUnits>{`Corra,temos apenas ${lastUnits} unidade!`}</LastUnits>
      ) : (
        ""
      )}
      <Quantity>
        <div onClick={Remove}>-</div>
        <p>{qtd}</p>
        <div onClick={Add}>+</div>
      </Quantity>
      <AddToCart onClick={ToCart}>Adicionar ao carrinho</AddToCart>
    </>
  );
}

const Sizes = styled.div`
  width: 80%;
  max-width: 400px;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Quantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  div {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #0a1931;
    color: #ffc947;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    :hover {
      cursor: pointer;
    }
  }
  p {
    font-size: 25px;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const AddToCart = styled.button`
  width: fit-content;
  height: 46px;
  display: block;
  border: none;
  border-radius: 5px;
  background-color: #0a1931;
  color: #ffc947;
  font-size: 20px;
  font-weight: bold;
  margin: 15px auto 0 auto;

  :hover {
    cursor: pointer;
  }
`;

const LastUnits = styled.div`
  width: fit-content;
  margin: 5px auto;
  color: red;
`;
