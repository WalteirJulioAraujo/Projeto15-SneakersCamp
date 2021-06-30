import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

export default function Home() {
  const [sneakers, setSneakers] = useState([]);
  const [filter, setFilter] = useState([]); //adicionar os filtros aplicados nesta array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let addFilter = "?";
    if (filter.length !== 0) {
      filter.forEach((item) => (addFilter = addFilter + `filter=${item}&`));
    }
    axios
      .get(`http://localhost:4000/list/sneakers${addFilter}`)
      .then((response) => {
        setSneakers(response.data);
        setLoading(false);
      })
      .catch((e) => {
        alert("Error");
        console.log(e);
        setLoading(false);
      });
  }, [filter]);

  return (
    <Container>
      {loading ? (
        <p>
          <Loader type="Oval" color="#ffc947" height={80} width={80} />
        </p>
      ) : sneakers.length === 0 ? (
        <p>Nenhum tênis encontrado!!</p>
      ) : (
        <ul>
          {sneakers.map((item, i) => (
            <>
              <Item
                key={item.i}
                onClick={() => console.log(item.id)}
                condicao={i}
                image={item.image}
              >
                <p>{item.name}</p>
                <p>R$ {(item.price / 100).toFixed(2).replace(".", ",")}</p>
              </Item>
              <div></div>
            </>
          ))}
        </ul>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 65px;

  color: #ffc947;

  p {
    margin-top: 50%;

    text-align: center;
    font-weight: bold;
    font-size: 30px;
  }

  ul {
    padding: 10px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    div {
      width: 90%;
      height: 1px;
      background-color: #c6c6c6;
    }
  }

  @media (min-width: 640px) {
    display: flex;
    flex-wrap: nowrap;
    ul {
      margin: 65px auto;

      div {
        display: none;
      }
    }
  }
`;

const Item = styled.li`
  width: 80%;
  max-width: 300px;
  min-width: 226px;
  height: 300px;

  margin-bottom: 40px;
  padding: 10px;

  border-radius: 5px;
  border: none;

  background-image: url(${(props) => props.image});
  transform: ${(props) => (props.condicao % 2 === 0 ? "rotatey(180deg)" : "")};
  background-size: cover;
  background-position: center;

  p {
    display: flex;
    transform: ${(props) =>
      props.condicao % 2 === 0 ? "rotatey(180deg)" : ""};
    margin: 10px;
    font-weight: normal;
    font-size: 15px;
    color: #000;

    justify-content: ${(props) => (props.condicao % 2 === 0 ? "" : "flex-end")};
  }

  p:first-child {
    font-weight: bold;
    font-size: 25px;
  }

  p:nth-child(2) {
    font-size: 20px;
  }

  @media (min-width: 640px) {
    width: 50%;
    height: 350px;
  }
`;
