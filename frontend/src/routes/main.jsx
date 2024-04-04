import React from "react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import HistoryCard from "../components/historyCard"
import axios from 'axios';


function Main() {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [history, setHistory] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const [isDropDownOpen, setIsDropDownOpen] = useState(false)

    function toggleTab() {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            const userObject = jwtDecode(token)
            setUser(userObject)
            getHistory();
        }
    }, [])

    const [code, setCode] = useState("")
    const [data, setData] = useState("")
    // const [lang, setLang] = useState("")
    const [selectedLanguage, setSelectedLanguage] = useState('Java');

    const handleSelectChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };
    async function getHistory() {
        var userObject = ""
        const token = Cookies.get('token')
        if (token) {
            userObject = jwtDecode(token)
        }

        try {
            const response = await axios.get(`http://localhost:3001/history/${userObject.sub}`);
            console.log(response.data)
            setHistory(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    async function getCode() {

        try {
            const response = await axios.get('http://localhost:3001/generate', {
                params: {
                    code: code,
                    lang: selectedLanguage,
                }
            });
            setData(response.data.message.content);
            console.log(response.data.message.content);
            saveHistory(response.data.message.content);
        } catch (error) {
            console.error('Error fetching data:', error);
            setData("Error has been happened try again..")
        }
    }

    async function saveHistory(generatedCode) {
        var userObject = ""
        const token = Cookies.get('token')
        if (token) {
            userObject = jwtDecode(token)
        }
        try {
            const response = await axios.put('http://localhost:3001/addHistory', {
                user: userObject.sub,
                pseudoCode: code,
                lang: selectedLanguage,
                generatedCode: generatedCode
            });
            console.log("History has been saved successfully.")
            getHistory();
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }

    function toggleDropDown() {
        setIsDropDownOpen(!isDropDownOpen)
    }



    function logOut() {
        Cookies.remove('token')
        setUser(null)
        navigate('/')
    }







    return (
        // MAIN DIV
        <div className=" min-h-screen grid grid-cols-6">
            {/* HISTORY DIV */}
            {!isOpen && <div className="absolute left-2 top-2">
                <button onClick={toggleTab}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                </button>
            </div>}
            <div className={`${isOpen ? "absolute" : "hidden"} h-full w-[50%] lg:block lg:relative bg-[#171717] lg:w-full lg:col-span-1`}>
                {<button onClick={toggleTab} className={` absolute lg:hidden right-0  bottom-0 top-0 `}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                    </svg>
                </button>}
                {/* HISTORIQUE TITLE */}
                <div className="lg:flex text-lg h-[7%] text-[30px] font-bold text-white flex justify-start px-4 items-center text-bold ">
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
                    {!user && <button onClick={() => navigate("/")} className="mx-4 my-2 bg-[#2F2F2F]  hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-lg shadow">
                        Connectez-vous pour accéder à l'historique
                    </button>}

                    {history.map((item, index) => (
                        <HistoryCard key={item._id} item={item} getHistory={getHistory} setData={setData} setCode={setCode} />
                    ))}
                </div>
                {user && <div className="absolute left-0 right-0 bottom-0 mb-4 mx-2">
                    <div onClick={toggleDropDown} className="cursor-pointer h-[7%] text-white grid grid-cols-10 rounded-lg mx-1 p-2 justify-center items-center hover:bg-[#2F2F2F]">
                        {<div className="rounded-full col-span-3 h-12 w-12 bg-red-900">
                            <img src={user.picture} alt="" className="rounded-full h-12 w-12" />
                        </div>}
                        <div className="hidden 2xl:block col-span-7">
                            <div className="font-bold">{user.name}</div>
                            <div className="text-[11px] text-grey-500">{user.email}</div>
                        </div>
                        <div className="hidden xl:block 2xl:hidden col-span-7">
                            <div className="font-bold">
                                {user.name.split(' ').length > 1 &&
                                    `${user.name.split(' ')[1].charAt(0)}. ${user.name.split(' ')[0]}`}
                            </div>
                            {/* <div className="text-sm text-grey-500">{user.email}</div> */}
                        </div>
                    </div>
                    {/* Dropdown content */}
                    {user && isDropDownOpen && (
                        <div onClick={logOut} className="cursor-pointer bg-[#2F2F2F] text-white absolute bottom-10 right-5 left-5   rounded-lg shadow-lg p-4 hover:bg-opacity-80 ">
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
                </div>}
            </div>
            {/* BIG DIV */}
            <div onClick={()=>setIsOpen(false)} className="bg-[#212121] col-span-6 lg:col-span-5 text-white space-y- p-4 grid grid-rows-10">
                <div className=" flex justify-center items-center font-bold text-2xl p-4 row-span-1">
                    Générateur de Code assistant
                </div>
                <div className=" row-span-4 grid grid-rows-10">
                    <div className="row-span-1">
                        De:
                    </div>
                    <textarea
                        value={code}
                        onChange={handleCodeChange}
                        className="my-3 w-full row-span-9 border rounded-md p-2 resize-none p-2 text-white bg-[#2F2F2F] border-[#424242] focus:outline-none placeholder-[#899090]"
                        placeholder="Enter your text here..."
                    ></textarea>
                </div>
                <div className=" flex items-center space-x-4 px-4 row-span-1">
                    <div className="">
                        Choisir langage code généré:
                    </div>
                    <div>
                        <select
                            className="p-2 bg-[#2F2F2F] text-white rounded-lg"
                            value={selectedLanguage} // Bind the value to the state
                            onChange={handleSelectChange} // Call handleSelectChange on change
                        >
                            <option value="Java">Java</option>
                            <option value="Python">Python</option>
                            <option value="C++">C++</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={getCode} className="bg-gray-200 h-15 text-black rounded-md p-2 m-1 font-bold">Coder</button>
                    </div>
                </div>
                {data && <div className=" row-span-4 grid grid-rows-10">
                    <div className="row-span-1">
                        Réponse:
                    </div>
                    <textarea
                        readOnly
                        value={data}
                        className="my-3 w-full  row-span-9 border rounded-md p-2 resize-none p-2 text-white bg-[#2F2F2F] border-[#424242] focus:outline-none placeholder-[#899090]"
                    ></textarea>
                </div>}
            </div>
        </div>
    )
}

export default Main;