import { useState } from "react";
import styled from "styled-components";

export default function SignUp() {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ cep, setCep ] = useState("");
    const [ disabled, setDisabled ] = useState(false);
    function sendForms() {

        return alert("teste");
    }

    return (
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
                    type="text"
                    placeholder="CEP do endereço"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    disabled={disabled}
                    required
                />
                <button type="submit" disabled={true}>
                    {" "}
                    Cadastrar{" "}
                </button>
            </form>
        </InputFields>
    );
}

const InputFields = styled.div`
    display: flex;
    input {
        display: block;
        border: none;
    }
`;
