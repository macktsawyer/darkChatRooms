'use client';

import {useState} from 'react';

export default function Register () {
    const [loading, setLoading] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [message, setMessage] = useState('');

    const handleFailure = () => {
        setLoading(false);
        setIsFailure(true);
        notifyUser("Either the password or username were incorrect.");
    }

    const notifyUser = (msg) => {
        setMessage(msg)
    }

    const submitHandler = () => {
        setMessage('');
        setIsFailure(false);
        setLoading(true);
    }

    return (
        <div className="w-full h-auto">
            <div className="flex flex-col lg:mt-[20%] lg:ml-[40%] mt-[70%]">
                <div className="flex flex-row p-2">
                    <input placeholder="Username" className="flex bg-black border-2 border-b-indigo border-black lg:w-[400px] w-[375px] placeholder: text-center focus:placeholder-black outline-none" />
                </div>
                <div className="flex flex-row p-2">
                    <input placeholder="Email Address" className="flex bg-black border-2 border-b-indigo border-black lg:w-[400px] w-[375px] placeholder: text-center focus:placeholder-black outline-none" />
                </div>
                <div className="flex flex-row p-2">
                    <input placeholder="Password" className="flex bg-black border-2 border-b-indigo border-black lg:w-[400px] w-[375px] placeholder: text-center focus:placeholder-black outline-none" />
                </div>
                <div className="flex flex-row p-2">
                    <input placeholder="Repeat Password" className="flex bg-black border-2 border-b-indigo border-black lg:w-[400px] w-[375px] placeholder: text-center focus:placeholder-black outline-none" />
                </div>
                <div className="flex flex-col lg:flex-row p-2">
                    <button className={"border-indigo w-20 rounded-md border-2 hover:bg-green lg:ml-0 ml-[40%] " 
                        + (isFailure ? "bg-red" : "") + (loading ? "cursor-progress" : "cursor-pointer")}>Submit</button>
                    <p className="text-red ml-2 mt-4 lg:mt-0 opacity-80">{message}</p>
                </div>
            </div>
        </div>
    )
}