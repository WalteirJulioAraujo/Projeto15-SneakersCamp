import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import Sneaker from "./Sneaker";

export default function Home({ setAmILoginOrSingup }) {
  const [sneakers, setSneakers] = useState(undefined);
  const [filter, setFilter] = useState([]); //adicionar os filtros aplicados nesta array
  const [loading, setLoading] = useState(false);
  setAmILoginOrSingup(false);
  useEffect(() => {
    setLoading(true);
    let addFilter = "?";
    if (filter.length !== 0) {
      filter.forEach((item) => (addFilter = addFilter + `filter=${item}&`));
    }
    axios
      .get(`https://back-projeto-sneakercamp.herokuapp.com/list/sneakers${addFilter}`)
      .then((response) => {
        setSneakers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [filter]);

  if (!sneakers) {
    return "";
  }

  return (
    <Container>
      {sneakers.map((e) => (
        <Sneaker info={e} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 85%;
  margin: 90px auto 0 auto;
`;
