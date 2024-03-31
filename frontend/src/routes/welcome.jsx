import React from "react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.svg';
import axios from 'axios';





function Welcome() {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    function handleCallbackResponse(res) {
        const userObject = jwtDecode(res.credential)
        console.log(userObject)
        setUser(userObject)
        Cookies.set('token', res.credential)
        document.getElementById("signInDiv").hidden = true
        saveUser(userObject,res.credential)
        navigate('/main')
    }

    async function saveUser(userObject,token) {
        try {
            const response = await axios.put('http://localhost:3001/addUser', {
                id: userObject.sub,
                email: userObject.email,
                token: token
            });
            console.log("User has been saved successfully.")
        } catch (error) {
            console.error('Error saving user:', error);
        }
    }


    function anonymousSign() {
        navigate('/main')
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "201019731303-7550ja695dq9msr44r5mr5gjaki249eb.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );


    }, [])


    function getCookie() {
        const token = Cookies.get('token')
        // console.log(token)
        const userObject = jwtDecode(token)
        console.log(userObject)
    }




    return (
        <div className="h-screen justify-center items-center flex flex-col">
            <h3 className="font-bold text-[38px] font-link">Bienvenue au Générateur Code Assistant</h3>
            <img className="w-[20%]" src={Logo} alt="My SVG Icon" />
            <br />
            <div className="flex flex-col justify-center h-100 p-1  gap-5">
                <div className="flex justify-center" id="signInDiv"></div>
                <div className="cursor-pointer flex justify-center items-center h-11 font-bold p-4 border border-black gap-4" onClick={anonymousSign}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    Sign in anonymously</div>
            </div>
            <br />
        </div>
    )
}

export default Welcome;