import {useSearchParams} from "react-router-dom";
import {Navigate} from "react-router";
import axios from "axios";
import {useEffect} from "react";

const settings = {
    "client_id": "857740213815-e07aikaf41mia75u98l19i5d1fng9cd2.apps.googleusercontent.com",
    "project_id": "linear-listener-371112",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "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",
    "redirect_uris": [
        "http://localhost:8000/receive-code.html",
        "http://localhost:8000/api/gmail/",
        "http://localhost:3000/email",
        "http://localhost:3000/user"
    ],
    "javascript_origins": [
        "http://localhost:8000",
        "http://localhost:3000",
    ]
}


export default function OAuth() {
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code");

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