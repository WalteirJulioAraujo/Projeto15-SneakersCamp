import styled from "styled-components";
import { Menu, PersonOutline, SearchOutline } from "react-ionicons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [ showClientMenu, setShowClientMenu ] = useState(false);

  function Logout(){
    setUser(undefined);
  }

  return (
    <>
    <Container>
      <div>
        <Menu
          className='icon'
          onClick={() => console.log("Abre aí")}
          color={"#ffc947"}
          height="35px"
          width="35px"
        />
      </div>
      <Link to="/">SNEAKERSCAMP</Link>
      <div>
        <SearchOutline
          className='icon'
          onClick={() => console.log("Procura aí")}
          color={"#ffc947"}
          height="30px"
          width="30px"
        />
        <PersonOutline
          className='icon'
          onClick={() => setShowClientMenu(!showClientMenu)}
          color={"#ffc947"}
          height="30px"
          width="30px"
        />
      </div>
    </Container>
    <ClientMenu showClientMenu={showClientMenu} >
      <p>Olá, {user?user.name:'visitante'}</p>
      {user
      ? <>
          <ClientMenuButton to=''>Meus pedidos</ClientMenuButton>
          <p>ou</p>
          <ExitMenuButton onClick={Logout}>Sair</ExitMenuButton>
        </>
      : <>
            <ClientMenuButton to='/login'>Faça seu login</ClientMenuButton>
            <p>ou</p>
            <ClientMenuButton to='/signup'>Cadastre-se</ClientMenuButton>
        </>
      }
    </ClientMenu>
    </>
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

    width: 70px;
    margin-left: 10px;
    margin-right: 10px;

    .icon:hover{
      cursor: pointer;
    }
  }

  @media (max-width: 640px) {
    font-size: 30px;
  }
`;

const ClientMenu = styled.div`
  display:${props=>props.showClientMenu?'':'none'};
  width: 180px;
  height: 150px;
  background-color: #0a1931;
  border-top: 1px solid  #ffc947;
  border-bottom-left-radius: 5px;
  position: fixed;
  top:63px;
  right:0px;
  z-index:10;

  p{
    text-align: center;
    margin-top: 8px;
    color: #ffc947;
    font-weight: bold;
  }
`
const ClientMenuButton = styled(Link)`
  width: 90%;
  height: 30px;
  display: block;
  margin: 10px auto 0 auto ;
  background-color: #ffc947;
  color: #0a1931;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;  

  :hover{
    cursor: pointer;
  }

`;

const ExitMenuButton = styled.div`
  width: 90%;
  height: 30px;
  display: block;
  margin: 10px auto 0 auto ;
  background-color: #ffc947;
  color: #0a1931;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;  

  :hover{
    cursor: pointer;
  }

`;
