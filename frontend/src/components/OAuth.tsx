import {useSearchParams} from "react-router-dom";
import {Navigate} from "react-router";
import axios from "axios";
import {useEffect} from "react";


export default function OAuth() {
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code");
    console.log(code)

    const sendCode = async () => {
        try {
            const response = await axios.post("/api/gmail/", {code: code});
            console.log(response);
        } catch (error) {

        }
    }
    useEffect(() => {
        if (code) {
            sendCode();
        }
    })

    return (
        <Navigate to={"/home"}/>
    )
}