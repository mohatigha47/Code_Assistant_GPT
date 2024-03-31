import React from "react";
import { useState } from "react";
import axios from 'axios';

function HistoryCard(props) {

    const [isHovered, setIsHovered] = useState(false);

    async function deleteHistory() {
        // console.log(props.item._id)
        axios.delete(`http://localhost:3001/history/${props.item._id}`)
            .then(response => {
                console.log('History record deleted successfully.');
                props.getHistory()
            })
            .catch(error => {
                console.error('Error deleting history record:', error);
            });

    }

    function showHistory() {
        props.setData(props.item.generatedCode)
        props.setCode(props.item.pseudoCode)
    }

    return (
        <div
            onClick={showHistory}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-pointer grid grid-cols-10 my-2 text-white rounded-lg mx-1 p-1 hover:bg-[#2F2F2F]">
            <div className="col-span-9  px-2">
                <div className="capitalize text-lg font-bold">
                    Code {props.item.lang}
                </div>
                <div className="text-sm">
                    {new Date(props.item.createdAt).toLocaleString()} {/* Format the date using toLocaleString */}
                </div>
            </div>
            <div className="col-span-1  flex justify-center items-center">
                {isHovered && <div onClick={deleteHistory}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>}
            </div>
        </div>
    )
}

export default HistoryCard;