import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    //const [authorized, setAuthorized] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSignIn = async () => {
        navigate(`/home`);
    };
    const handleSignUp = () => {
        navigate(`/signup`);
    };

    return (
        <div className="SignIn">
            <form>
                <label>
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br/>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br/>
                <button onClick={() => handleSignIn()}>Sign In</button>
                <button onClick={() => handleSignUp()}>Sign Up</button>
            </form>
        </div>
    )
}