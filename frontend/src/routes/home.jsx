import React from "react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "js-cookie"




function Home() {

    const [user, setUser] = useState({})

    function handleCallbackResponse(res) {
        const userObject = jwtDecode(res.credential)
        console.log(userObject)
        setUser(userObject)
        Cookies.set('token', res.credential)
        document.getElementById("signInDiv").hidden = true
    }

    function signOut() {
        setUser({})
        document.getElementById("signInDiv").hidden = false
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
        console.log(token)
    }




    return (
        <div>
            <div id="signInDiv"></div>
            {user.name && <button onClick={signOut} >Sign out</button>}
            <img src={user.picture} alt="" />
            <h3>{user.name}</h3>
            <h1 className="">
                Helloooo
            </h1>
            <button onClick={getCookie}>GET COOKIE</button>
        </div>
    )
}

export default Home;