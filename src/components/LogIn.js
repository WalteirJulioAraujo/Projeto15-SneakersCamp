import { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Logo, InputFields, SubmitButton, RedirectLink } from "../styles/GeneralStyles";
import axios from 'axios';
import UserContext from '../contexts/UserContext';

export default function LogIn({ setAmILoginOrSingup }){

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ disabled, setDisabled ] = useState(false);
    const { setUser } = useContext(UserContext);
    let history = useHistory();

    setAmILoginOrSingup(true);

    function sendForms(e){
        e.preventDefault();
        setDisabled(true);
        if(!email.trim()){
            setDisabled(false);
            return alert('Você deve preencher o campo email!')
        }
        if(!password.trim()){
            setDisabled(false);
            return alert('Você deve preencher o campo senha!')
        }
        const body = { email, password };
        const request = axios.post('https://back-projeto-sneakercamp.herokuapp.com/login',body);
        request.then((e)=>{
            //Vai chegar do back { name, token }
            setUser(e.data);
            history.push('/');
        })
        request.catch((e)=>{
            setDisabled(false);
            if(e.response.status === 401){
                return alert('Email e/ou senha incorreto(s)');
            }
        })
    }

    return (
        <>
            <Logo>
                <Link to="/" >SneakersCamp</Link>
            </Logo>
            <InputFields>
                <form onSubmit={sendForms}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={disabled}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={disabled}
                        required
                    />
                    <SubmitButton type="submit" disabled={disabled}>
                        {" "}
                        Entrar{" "}
                    </SubmitButton>
                </form>
            </InputFields>
            <RedirectLink to='/signup'>
                Ainda não tem conta? Cadastre-se Aqui!
            </RedirectLink>
        </>
    );
}