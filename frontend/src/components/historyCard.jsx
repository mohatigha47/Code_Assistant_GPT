import React from "react";
import { useState } from "react";

function HistoryCard(props) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="grid grid-cols-10 my-2 text-white rounded-lg mx-1 p-1 hover:bg-[#2F2F2F]">
            <div className="col-span-9  px-2">
                <div className="capitalize text-lg font-bold">
                    Code {props.item.code}
                </div>
                <div className="text-sm">
                    {props.item.date}
                </div>
            </div>
            <div className="col-span-1  flex justify-center items-center">
                {isHovered && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>}
            </div>
        </div>
    )
}

export default HistoryCard;