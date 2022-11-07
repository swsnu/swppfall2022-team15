import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function SignIn() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [authorized, setAuthorized] = useState<boolean>(false);

    const handleSignIn = async () => {
    };
    const handleSignUp = () => {
        return <Navigate to="/signup" />
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