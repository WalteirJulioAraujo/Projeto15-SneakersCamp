import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function Cart() {
  const history = useHistory();
  return (
    <Container>
      <button onClick={() => history.push("/")}>Voltar po</button>
    </Container>
  );
}

const Container = styled.div`
  margin: 65px auto;
  display: flex;
  justify-content: center;
  div[button] {
    width: 100%;
  }
`;
