import { useState } from "react";
import { Logo, InputFields, SubmitButton } from "../styles/GeneralStyles";

export default function SignUp() {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ cep, setCep ] = useState("");
    const [ disabled, setDisabled ] = useState(false);

    function sendForms(e) {
        e.preventDefault();
        return alert("teste");
    }

    return (
        <>
            <Logo>
                SneakersCamp
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
                        type="text"
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
        </>
    );
}


