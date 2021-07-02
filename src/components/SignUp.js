import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Logo, InputFields, SubmitButton, RedirectLink } from "../styles/GeneralStyles";
import axios from 'axios';


export default function SignUp({ setAmILoginOrSingup }){
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ cep, setCep ] = useState("");
    const [ disabled, setDisabled ] = useState(false);
    let history = useHistory();

    setAmILoginOrSingup(true);

    function sendForms(e) {
        e.preventDefault();
        setDisabled(true);

        if(password !== confirmPassword){
            setDisabled(false);
            return alert('As senhas não batem');
        } 
        if(!name.trim() || name.length<3){
            setDisabled(false);
            return alert('Você deve preencher o campo nome e deve ter ao menos 3 caracteres');
        }
        if(password.length < 3) {
            setDisabled(false);
            return alert('A senha deve ter ao menos 3 dígitos');
        }
    
        const body = { name, email, password, cep };
        const request = axios.post('http://localhost:4000/signup',body);
        request.then(()=>history.push('/login'));
        request.catch((e)=>{
            setDisabled(false);
            if(e.response.status === 409){
                alert('O email já existe')
            }else{
                alert('Erro ao enviar cadastro, tente novamente');
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
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={disabled}
                        required
                    />
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
                    <input
                        type="password"
                        placeholder="Confirme a senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={disabled}
                        required
                    />
                    <input
                        type="number"
                        min='10000000'
                        max='99999999'
                        placeholder="CEP do endereço"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        disabled={disabled}
                        required
                    />
                    <SubmitButton type="submit" disabled={disabled}>
                        {" "}
                        Cadastrar{" "}
                    </SubmitButton>
                </form>
            </InputFields>
            <RedirectLink to='/login' >
                Já tem senha? Vá para o LogIn!
            </RedirectLink>
        </>
    );
}


