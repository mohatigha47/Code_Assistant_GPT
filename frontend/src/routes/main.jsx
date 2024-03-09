import React from "react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import HistoryCard from "../components/historyCard"


function Main() {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const [isDropDownOpen, setIsDropDownOpen] = useState(false)

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            const userObject = jwtDecode(token)
            setUser(userObject)
        }
    }, [])

    function toggleDropDown() {
        setIsDropDownOpen(!isDropDownOpen)
    }

    function userDropDown() {
        console.log("hello")
    }

    function logOut() {
        Cookies.remove('token')
        navigate('/')
    }


    const historique = [
        {
            code: "java",
            date: "18 Mars, 10:09",
            content: "Some code in java"
        },
        {
            code: "python",
            date: "22 Juillet, 17:15",
            content: "Some code in python"
        },
        {
            code: "react",
            date: "24 Février, 23:05",
            content: "Some code in react"
        },
        {
            code: "C++",
            date: "06 Spetember, 02:56",
            content: "Some code on C++"
        },

    ];





    return (
        // MAIN DIV
        <div className=" min-h-screen grid grid-cols-6">
            {/* HISTORY DIV */}
            <div className="relative bg-[#171717]  col-span-1">
                {/* HISTORIQUE TITLE */}
                <div className="text-lg h-[7%] text-[32px] font-bold text-white flex justify-start px-4 items-center text-bold ">
                    Historique
                </div>
                {/* SEARCH BOX */}
                <div className=" p-2 h-[7%] max-h-16 my-1">
                    <div className="relative p-2 text-lg rounded-lg flex justify-center items-center border border-[#424242]">
                        <input type="text" className="text-white w-full pl-8 pr-2 py-1 rounded-lg bg-[#171717] placeholder-[#899090] focus:outline-none" placeholder="Rechercher historique.." />
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 text-[#899090] h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className=" h-[80%]">
                    {/* HISTORIQUE SECTION */}
                    {historique.map((item, index) => (
                        <HistoryCard item={item} />
                    ))}
                </div>
                <div className="absolute left-0 right-0 bottom-0 mb-4 mx-2">
                    <div onClick={toggleDropDown} className="h-[7%] text-white grid grid-cols-10 rounded-lg mx-1 p-2 justify-center items-center hover:bg-[#2F2F2F]">
                        <div className="rounded-full col-span-2 h-12 w-12 bg-red-900">
                            <img src={user.picture} alt="" className="rounded-full h-12 w-12" />
                        </div>
                        <div className="col-span-8">
                            <div className="font-bold">{user.name}</div>
                            <div className="text-sm text-grey-500">{user.email}</div>
                        </div>
                    </div>
                    {/* Dropdown content */}
                    {isDropDownOpen && (
                        <div onClick={logOut} className="bg-[#171717code] text-white absolute bottom-10 right-5 left-5 bg-white  rounded-lg shadow-lg p-4  hover:bg-[#2F2F2F]">
                            <div className="flex space-x-4 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                                <div>
                                    Logout
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
            {/* BIG DIV */}
            <div className="bg-[#212121] col-span-5 text-white space-y-2 p-4">
                <div className="h-[40%]">
                    <div className="h-[7%]">
                        De:
                    </div>
                    <textarea
                        className="w-full h-[93%] border rounded-md p-2 resize-none p-2 text-white bg-[#2F2F2F] border-[#424242] focus:outline-none placeholder-[#899090]"
                        placeholder="Enter your text here..."
                    ></textarea>
                </div>
                <div className="h-[8%] flex items-center space-x-4 px-4">
                    <div>
                        Choisir langage coode généré:
                    </div>
                    <div>
                        <select className="p-2 bg-[#2F2F2F] text-white rounded-lg">
                            <option value="Java">Java</option>
                            <option value="Python">Python</option>
                            <option value="C++">C++</option>
                        </select>
                    </div>
                    <div>
                        <button className="bg-gray-200 h-15 text-black rounded-md p-2 m-1 font-bold">Coder</button>
                    </div>
                </div>
                <div className="h-[50%]">
                    <div className="h-[7%]">
                        Réponse:
                    </div>
                    <textarea
                        className="w-full h-[93%] border rounded-md p-2 resize-none p-2 text-white bg-[#2F2F2F] border-[#424242] focus:outline-none placeholder-[#899090]"
                        placeholder="Enter your text here..."
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default Main;