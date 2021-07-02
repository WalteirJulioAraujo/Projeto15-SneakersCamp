import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import Sneaker from "./Sneaker";

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
      .catch(() => {
        alert("Error");
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
              <Sneaker i={i} item={item} /> 
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

