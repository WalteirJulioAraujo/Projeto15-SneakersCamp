import { useState } from "react";
import styled from "styled-components";
import BuyInfo from "./BuyInfo";

export default function Sneaker( { info } ){
    const [ showBuyInfo, setShowBuyInfo ] = useState(false);

    console.log(info)

    function Buy(){
        setShowBuyInfo(!showBuyInfo);
    }

    const priceFormat = ((info.price/100).toFixed(2)).replace('.',',');
    return(
        <>
        <SneakerContainer  onClick={Buy} image={info.image} showBuyInfo={showBuyInfo}>
            <div className="imageDiv" ></div>
            <span>{`${info.name}`}<br/>{`R$ ${priceFormat}`}</span>
            {showBuyInfo
            ?<BuyInfo info={info} />
            :""
            }
        </SneakerContainer>
        </>
    );
}

const SneakerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: ${props=>props.showBuyInfo? '600px':'300px'};
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 5px 5px #ededed;
    border: 1px solid #ededed;
    border-radius: 5px;

    transition: 1s;

    .imageDiv{
        width: 90%;
        max-width: 300px;
        height: 300px;
        margin: 0 auto;
        background-image: url(${props=>props.image});
        background-size: cover;
        background-position: bottom;
    }

    span{
        font-size: 20px;
        font-weight: 600;
        font-style: italic;
        margin-bottom: 10px;
        margin-left: 10px;
    }
`;

const BuySection = styled.div`
`
