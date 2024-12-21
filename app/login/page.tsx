'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { login } from '../types/login';
import { signIn, useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function Login () {
    const [loading, setLoading] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [loginAttempt, setLoginAttempt ] = useState({
        username: login.username,
        password: login.password
    })
    const [message, setMessage] = useState('');
    const {data:session} = useSession();
    const router = useRouter();

    if (session?.user?.name) {
        redirect('/');
    }

       // Reset any known failures
    const clearFailure = () => {
        setLoading(false);
        setIsFailure(false);
        setMessage('');
    };

    const handleFailure = ( msg: String ) => {
        setLoading(false);
        setIsFailure(true);
        notifyUser(msg);
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
            const authAttempt = await signIn("credentials",
                {
                    username:loginAttempt.username,
                    password:loginAttempt.password,
                    redirect:false,
                }
            );

            if (authAttempt.error) {
                console.log(authAttempt)
                handleFailure('ErrCode 1007: Unable to establish user authentication.');
                return
            };

            if (authAttempt.ok) {
                redirect('/');
            };
            
        } catch (error) {
            handleFailure('ErrCode 1007: Unable to establish user authentication. ' + error);
        }
    }

    return (
        <div className="w-full h-auto">
            <label className="absolute opacity-20 top-[200px] left-[50%] lg:left-[620px] lg:top-[280px] text-5xl text-indigo">Login</label>
            <form onSubmit={(e) => submitHandler(e)} className="flex flex-col lg:mt-[20%] lg:ml-[40%] mt-[70%]">
                <div className="flex flex-row p-2">
                    <input 
                        type="text"  
                        placeholder="Username" 
                        className="flex bg-black border-2 border-b-indigo border-black w-[400px] placeholder-indigo placeholder: text-center hover:rounded-md hover:placeholder-teal focus:placeholder-black outline-none" 
                        onChange={(e) => handleInputChange(e.target.value, "username")} 
                        />
                </div>
                <div className="flex flex-row p-2">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="flex bg-black border-2 border-b-indigo border-black w-[400px] placeholder-indigo placeholder: text-center hover:rounded-md hover:placeholder-teal focus:placeholder-black outline-none" 
                        onChange={(e) => handleInputChange(e.target.value, "password")}
                        />
                </div>
                <div className="flex flex-row p-2">
                    <button className={"border-indigo hover:text-teal hover:bg-indigo text-indigo w-20 rounded-md border-2 " 
                        + (isFailure ? "bg-red" : "")
                        + (loading ? 'cursor-progress' : 'cursor-pointer')}>Submit</button>
                    <p className="text-red ml-2 opacity-80">{message}</p>
                </div>
                <p className="opacity-70 text-indigo">Don't have an account? <Link href="/register" className="text-teal hover:text-indigo">Click here.</Link></p>
            </form>
        </div>
    )
}