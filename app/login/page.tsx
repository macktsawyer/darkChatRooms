'use client';

import {useState} from 'react';

export default function Login () {
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
                    <input type="text"  placeholder="Username" className="flex bg-black border-2 border-b-indigo border-black w-[400px] placeholder: text-center hover:bg-ghost hover:rounded-md hover:placeholder-white focus:placeholder-black outline-none" />
                </div>
                <div className="flex flex-row p-2">
                    <input type="password" placeholder="Password" className="flex bg-black border-2 border-b-indigo border-black w-[400px] placeholder: text-center hover:bg-slate hover:rounded-md hover:placeholder-white focus:placeholder-black outline-none" />
                </div>
                <div className="flex flex-row p-2">
                    <button className={"border-indigo w-20 rounded-md border-2 hover:bg-green " 
                        + (isFailure ? "bg-red" : "")
                        + (loading ? 'cursor-progress' : 'cursor-pointer')}>Submit</button>
                    <p className="text-red ml-2 opacity-80">{message}</p>
                </div>
            </div>
        </div>
    )
}