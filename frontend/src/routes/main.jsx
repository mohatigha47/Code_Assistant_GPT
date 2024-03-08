import React from "react";




function Main() {

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
        <div className="bg-blue-500 min-h-screen grid grid-cols-5">
            {/* HISTORY DIV */}
            <div className="bg-red-200  col-span-1">
                {/* HISTORIQUE TITLE */}
                <div className="text-lg h-[7%] bg-blue-500 m-4 flex justify-center text-bold ">
                    Historique
                </div>
                {/* SEARCH BOX */}
                <div className="h-[5%] space-x-2 p-2 text-sm rounded-lg bg-white m-2 flex justify-center items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <div>
                        Rechercher historique..
                    </div>
                </div>
                <div className="bg-yellow-500 ">
                    {/* HISTORIQUE SECTION */}
                    {historique.map((item, index) => (
                        <div className="grid grid-cols-10 my-2 bg-white">
                            <div className="col-span-8  px-2">
                                <div className="capitalize text-lg font-bold">
                                    Code {item.code}
                                </div>
                                <div className="text-sm">
                                    {item.date}
                                </div>
                            </div>
                            <div className="col-span-2 bg-red-300 flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-[7%] bg-blue-700 grid grid-cols-10 rounded-lg mx-1 p-2 justify-center items-center ">
                    <div className="rounded-full col-span-2  h-12 w-12 bg-red-900">
                        <img src="https://leadership.ng/wp-content/uploads/2023/03/davido.png" alt="" className="rounded-full h-12 w-12 " />
                    </div>
                    <div className="col-span-8">
                        <div className="font-bold">
                            Mohammed Tigha
                        </div>
                        <div className="text-sm text-grey-500">
                            mohamedtigha999@gmail.com
                        </div>
                    </div>
                </div>
            </div>
            {/* BIG DIV */}
            <div className="bg-yellow-200 col-span-4 space-y-2 p-4">
                <div className="h-[40%] bg-yellow-500">
                    <div className="h-[7%]">
                        De:
                    </div>
                    <textarea
                        className="w-full h-[93%] border rounded-md p-2 resize-none p-2"
                        placeholder="Enter your text here..."
                    ></textarea>
                </div>
                <div className="h-[8%] bg-yellow-600 flex items-center space-x-4 px-4">
                    <div>
                        Choisir langage coode généré:
                    </div>
                    <div>
                        <select className="p-2 rounded-lg">
                            <option value="Java">Java</option>
                            <option value="Python">Python</option>
                            <option value="C++">C++</option>
                        </select>
                    </div>
                    <div>
                        <button className="bg-gray-200 h-15 rounded-md p-2 m-1 font-bold">Coder</button>
                    </div>
                </div>
                <div className="h-[50%] bg-yellow-500">
                    <div className="h-[7%]">
                        Réponse:
                    </div>
                    <textarea
                        className="w-full h-[93%] border rounded-md p-2 resize-none p-2"
                        placeholder="Enter your text here..."
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default Main;