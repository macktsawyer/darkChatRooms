'use client';

import {ChangeEvent, useState, FormEvent, useRef} from 'react';
import { registration } from '../types/registration';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import classNames from 'classnames';
import Link from 'next/link';

export default function ProfileManagement () {
    const [loading, setLoading] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [message, setMessage] = useState('');
    const [labelIsHidden, setLabelIsHidden] = useState(true);
    const inputRef = useRef(null);
    const { data: session } = useSession();

    console.log(session)

    const updateUserColorPref = (e: string) => {
        console.log(e)
        setLabelIsHidden(!labelIsHidden);
        // Function to make an API call to change the database record of default color.

        // Remove the label and learn how to change session, or keep the label and force a logout...
    }

    return (
        <div className="w-full h-auto">
            <ul className="flex flex-col lg:mt-[20%] lg:ml-[40%] mt-[70%]">
                <li className={"text-indigo"}><span className={"text-teal"}>Username: </span>{session?.user?.name}</li>
                <li className={"text-indigo"}><span className={"text-teal"}>Email: </span>{session?.user?.email}</li>
                <li className={"text-indigo"}><span className={"text-teal"}>Default Message Color: </span>
                    <select 
                        value={session?.user?.defaultMessageColor || "slate"}
                        onChange={(e) => {updateUserColorPref(e.target.value)}}
                        style={{ height: "14px", lineHeight: "1", }} 
                        className={
                        classNames({[`appearance-none h-1 w-12 pt-0.5 leading-none rounded-md bg-${session?.user?.defaultMessageColor} text-white text-xs`]: session?.user?.defaultMessageColor, 'appearance-none h-1 w-12 pt-0.5 leading-none rounded-md bg-white text-white text-xs':!session?.user?.defaultMessageColor,})}>
                        <option value="black" style={{backgroundColor: "#000000", color: "white"}}> </option>
                        <option value="slate" style={{backgroundColor: "#475569", color: "white"}}> </option>
                        <option value="red" style={{backgroundColor: "#dc2626", color: "white"}}> </option>
                        <option value="orange" style={{backgroundColor: "#ea580c", color: "white"}}> </option>
                        <option value="amber" style={{backgroundColor: "#d97706", color: "white"}}> </option>
                        <option value="yellow" style={{backgroundColor: "#ca8a04", color: "white"}}> </option>
                        <option value="lime" style={{backgroundColor: "#65a30d", color: "white"}}> </option>
                        <option value="green" style={{backgroundColor: "#16a34a", color: "white"}}> </option>
                        <option value="emerald" style={{backgroundColor: "#059669", color: "white"}}> </option>
                        <option value="teal" style={{backgroundColor: "#0d9488", color: "white"}}> </option>
                        <option value="cyan" style={{backgroundColor: "#0891b2", color: "white"}}> </option>
                        <option value="sky" style={{backgroundColor: "#0284c7", color: "white"}}> </option>
                        <option value="blue" style={{backgroundColor: "#2563eb", color: "white"}}> </option>
                        <option value="indigo" style={{backgroundColor: "#4f46e5", color: "white"}}> </option>
                        <option value="violet" style={{backgroundColor: "#7c3aed", color: "white"}}> </option>
                        <option value="purple" style={{backgroundColor: "#9333ea", color: "white"}}> </option>
                        <option value="fuchsia" style={{backgroundColor: "#c026d3", color: "white"}}> </option>
                        <option value="pink" style={{backgroundColor: "#db2777", color: "white"}}> </option>
                        <option value="rose" style={{backgroundColor: "#e11d48", color: "white"}}> </option>
                    </select>
                    {!labelIsHidden && <label> - You'll need to logout and log back in for the default color to update correctly.</label>}
                </li>
            </ul>
        </div>
    )
}