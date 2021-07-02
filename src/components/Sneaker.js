import styled from "styled-components";

export default function Sneaker({ item,i }){
    return(
        <Item
        onClick={() => console.log(item.id)}
        condition={i}
        image={item.image}
        >
            <p>{item.name}</p>
            <p>R$ {(item.price / 100).toFixed(2).replace(".", ",")}</p>
        </Item> 
);
}


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
  transform: ${(props) => (props.condition % 2 === 0 ? "rotatey(180deg)" : "")};
  background-size: cover;
  background-position: center;

  p {
    display: flex;
    transform: ${(props) =>
      props.condition % 2 === 0 ? "rotatey(180deg)" : ""};
    margin: 10px;
    font-weight: normal;
    font-size: 15px;
    color: #000;

    justify-content: ${(props) =>
      props.condition % 2 === 0 ? "" : "flex-end"};
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
