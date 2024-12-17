'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent} from 'react';
import { login } from '../types/login';

export default function Login () {
    const [loading, setLoading] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [loginAttempt, setLoginAttempt ] = useState({
        username: login.username,
        password: login.password
    })
    const [message, setMessage] = useState('');
    const router = useRouter();

       // Reset any known failures
    const clearFailure = () => {
        setLoading(false);
        setIsFailure(false);
        setMessage('');
    };

    const handleFailure = () => {
        setLoading(false);
        setIsFailure(true);
        notifyUser("Either the password or username were incorrect.");
    }

    const notifyUser = (msg) => {
        setMessage(msg)
    }

    // Dynamic input field change handler
    const handleInputChange = (val: string, id: string) => {
        clearFailure();
        setLoginAttempt((prevState) => ({
            ...prevState,
            [id]: val,
        }))
    };

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsFailure(false);
        setLoading(true);
        try {
            const tryLoggingIn = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({ 
                    loginAttempt 
                }),
            })
            console.log(tryLoggingIn)
            if (tryLoggingIn.status === 200) {
                router.push('/');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full h-auto">
            <form onSubmit={(e) => submitHandler(e)} className="flex flex-col lg:mt-[20%] lg:ml-[40%] mt-[70%]">
                <div className="flex flex-row p-2">
                    <input 
                        type="text"  
                        placeholder="Username" 
                        className="flex bg-black border-2 border-b-indigo border-black w-[400px] placeholder: text-center hover:bg-ghost hover:rounded-md hover:placeholder-white focus:placeholder-black outline-none" 
                        onChange={(e) => handleInputChange(e.target.value, "username")} 
                        />
                </div>
                <div className="flex flex-row p-2">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="flex bg-black border-2 border-b-indigo border-black w-[400px] placeholder: text-center hover:bg-slate hover:rounded-md hover:placeholder-white focus:placeholder-black outline-none" 
                        onChange={(e) => handleInputChange(e.target.value, "password")}
                        />
                </div>
                <div className="flex flex-row p-2">
                    <button className={"border-indigo w-20 rounded-md border-2 hover:bg-green " 
                        + (isFailure ? "bg-red" : "")
                        + (loading ? 'cursor-progress' : 'cursor-pointer')}>Submit</button>
                    <p className="text-red ml-2 opacity-80">{message}</p>
                </div>
            </form>
        </div>
    )
}