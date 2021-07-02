import { useEffect, useState } from 'react';
import styled from "styled-components";
import Size from './Size.js';
import axios from 'axios';

export default function BuyInfo({info}){
    const size = [38,39,40,41,42,43,44,45]
    const [sizeSelect,setSizeSelect] = useState(0);
    const [ availabeSizes, setAvailabeSizes ] = useState([]);
    const [ maxQtd, setMaxQtd ] = useState(0);
    const [ qtd, setQtd ] = useState(0);

    console.log(availabeSizes);
    useEffect(()=>{
        const request = axios.get(`http://localhost:4000/stock/${info.id}`);
        request.then((e)=>{
            const allsizes =[];
            const qtdsizes = [];
            e.data.map((i)=>{
                allsizes.push(i.size);
                qtdsizes.push({size:i.size,quantity:i.quantity});
            });
            setAvailabeSizes(allsizes);
            setMaxQtd(qtdsizes);

        });
        request.catch(()=>console.log('erro ao procurar os tamanhos disponiveis'))
    },[])

    function Add(e){
        e.stopPropagation();
        if(sizeSelect===0){
            return;
        }
        let max = 0;
        maxQtd.map((e)=>{
            if(e.size===sizeSelect){
                max=e.quantity;
            }
        })
        if(qtd===max){
            return;
        }
        setQtd(qtd+1);
    }

    function Remove(e){
        e.stopPropagation();
        if(qtd===0){
            return;
        }
        let max = 0;
        maxQtd.map((e)=>{
            if(e.size===sizeSelect){
                max=e.quantity;
            }
        })
        setQtd(qtd-1);
    }

    return(
        <>
            <p>{info.description}</p>
            <Sizes>
                {size.map((e)=><Size num={e} setSizeSelect={setSizeSelect} selected={e===sizeSelect?true:false} availabeSizes={availabeSizes}/>)}
            </Sizes>
            <Quantity>
                <div onClick={Remove} >-</div>
                <p>{qtd}</p>
                <div onClick={Add} >+</div>
            </Quantity>
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
const Quantity = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    div{
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color:#0a1931;
        color: #ffc947;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        :hover{
            cursor: pointer;
        }
    }
    p{
        font-size: 25px;
        margin-left: 5px;
        margin-right: 5px;
    }

`;