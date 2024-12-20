'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";
import { redirect } from 'next/navigation';


export default function NavBar () {
    const [visible, setVisible] = useState(false);
    const [loggedIn, setIsLoggedIn] = useState(false);
    const {data:session} = useSession();

    const handleNavBar = () => {
        setVisible(!visible)
    }

    const handleClick = () => {
        setVisible(false);
    }

    const handleSignOut = (e) => {
        e.preventDefault();
        signOut();
        redirect('/login');
    }

    useEffect(() => {
        if (session && session.user.id) {
            setIsLoggedIn(true);
            console.log('Logged in Navbar')
        }
    },[session])

    return (
        <div>
            <div className="flex flex-row">
                <div className="navbar bg-black drop-shadow-4xl fixed top-0 w-full z-10">
                    <div className="flex-none">
                        <button className={"btn btn-square btn-ghost " + (visible ? "bg-indigo hover:bg-violet" : "")} 
                        onClick={handleNavBar}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        </button>
                    </div>
                    <div className="flex-1">
                        <Link onClick={handleClick} href="/" className="btn btn-ghost text-xl">darkChatRooms</Link>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current">
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <ul className={"navList " + (visible ? "absolute top-16 w-64 h-64 p-4 text-clip text-center rounded-br-lg bg-black drop-shadow-4xl transition-visibility border-2 border-black" : "hidden")}>
                <li key="channels" className={"navItem mt-2 ml-4 mr-4 btn btn-ghost text-center"}>Channel List</li>
                
                { loggedIn ? 
                (
                    <>
                        <Link href="/profileManagement" key="profile manager" className={"navItem mt-2 ml-4 mr-4 btn btn-ghost text-center"}>Profile Management</Link>
                        <button className={"navItem mt-2 ml-4 mr-4 btn btn-ghost text-center"} onClick={(e) => handleSignOut(e)}>Sign Out</button>
                    </>
                ) 
                :
                (
                    <>
                        <Link onClick={handleClick} href="/login"><li key="login" className={"navItem mt-2 ml-4 mr-4 btn btn-ghost text-center"}>Login</li></Link>
                        <Link onClick={handleClick} href="/register"><li key="register" className={"navItem mt-2 ml-4 mr-4 btn btn-ghost text-center"}>Register</li></Link>
                    </>
                )
                }
            </ul>
        </div>
    );
};