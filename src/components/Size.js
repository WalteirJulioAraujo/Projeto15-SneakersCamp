import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function Size({num,setSizeSelect,selected,id}){

    const [ select, setSelect ] = useState(false);
    const [ availabeSizes, setAvailabeSizes ] = useState([]);
    useEffect(()=>{
        const request = axios.get(`http://localhost:4000/stock${id}`);
        request.then((e)=>setAvailabeSizes(e.data));
        request.catch(()=>console.log('erro ao procurar os tamanhos disponiveis'))
    },[])

    function selectSize(e){
        e.stopPropagation();
        setSelect(!select);
        setSizeSelect(num);
    }

    return(
        <SizeButton onClick={selectSize} select={select} selected={selected} >{num}</SizeButton>
    );
}

const SizeButton = styled.div`
    width: 40px;
    height: 40px;
    border: ${props=>props.select && props.selected ?'4px solid #0B054A':'1px solid #C1B0B0'};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover{
        cursor: pointer;
    }
`

