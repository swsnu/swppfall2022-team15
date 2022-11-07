import { useState } from "react"

export default function SignUp() {
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")
    

    const handleCancel = async () => {
    }
    const handleSignUp = async () => {
    }

    return (
        <div className="SignUp">
            <form>
                <label>
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br/>
                <label>
                    Username
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br/>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br/>
                <label>
                    Confirm Password
                    <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                </label>
                <br/>
                <button onClick={() => handleCancel()}>Cancel</button>
                <button onClick={() => handleSignUp()}>Sign Up</button>
            </form>
        </div>
    )

}