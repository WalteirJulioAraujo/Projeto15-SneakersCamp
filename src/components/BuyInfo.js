import { useState } from "react";
import styled from "styled-components";
import Size from './Size.js';

export default function BuyInfo({info}){
    const size = [38,39,40,41,42,43,44,45]
    const [sizeSelect,setSizeSelect] = useState("");
    return(
        <>
            <p>{info.description}</p>
            <Sizes>
                {size.map((e)=><Size id={info.id} num={e} setSizeSelect={setSizeSelect} selected={e===sizeSelect?true:false}/>)}
            </Sizes>
        </>
    )
}

const Sizes = styled.div`
    width: 80%;
    max-width: 400px;
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`