import styled from "styled-components";
import { Menu, PersonOutline, SearchOutline } from "react-ionicons";

export default function Navbar() {
  return (
    <Container>
      <div>
        <Menu
          onClick={() => console.log("Abre aí")}
          color={"#ffc947"}
          height="30px"
          width="30px"
        />
      </div>
      SNEAKERSCAMP
      <div>
        <SearchOutline
          onClick={() => console.log("Procura aí")}
          color={"#ffc947"}
          height="25px"
          width="25px"
        />
        <PersonOutline
          onClick={() => console.log("Loga aí")}
          color={"#ffc947"}
          height="25px"
          width="25px"
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 63px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  background-color: #0a1931;
  color: #ffc947;

  font-family: "Creepster", cursive;
  font-size: 50px;

  padding-left: 10px;
  padding-right: 10px;

  box-shadow: 0px 2px rgba(255, 201, 71, 0.5);

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 60px;
  }

  @media (max-width: 640px) {
    font-size: 30px;
  }
`;
