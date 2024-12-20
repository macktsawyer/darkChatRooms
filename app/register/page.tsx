'use client';

import {ChangeEvent, useState, FormEvent, useRef} from 'react';
import { registration } from '../types/registration';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register () {
    const [loading, setLoading] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [message, setMessage] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const passwordCheckRef = useRef(passwordCheck);
    const appInstance = process.env.APP_INSTANCE || false;
    const [registrationInfo, setRegistrationInfo] = useState({
        username: registration.username,
        email: registration.email,
        password: registration.password,
        confirmPassword: registration.confirmPassword
    });
    const router = useRouter();

    // Gracefully (lol) handle any failures.
    const handleFailure = (msg: string) => {
        setLoading(false);
        setIsFailure(true);
        notifyUser(msg);
    }

    // Reset any known failures
    const clearFailure = () => {
        setLoading(false);
        setIsFailure(false);
        setMessage('');
    };

    // Function designed to display and change the notification message.
    const notifyUser = (msg: string) => {
        setMessage(msg)
    };

    // Ajax request
    const attemptRegistration = async () => {

        if (!passwordCheck && !passwordCheckRef) {
            handleFailure('Your information was unable to be submitted. Please refresh and try again. ErrCode: 1001')
            return
        }

        try {
            const userRes = await fetch('api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email: registrationInfo.email 
                }),
            });

            // Check if the email is already in usage.

            const { user } = await userRes.json();

            if (user) {
                setPasswordCheck(false);
                passwordCheckRef.current = false;
                setLoading(false);
                handleFailure('User already exists. ErrCode: 1004');
            }

            // Attempt the registration

            const res = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: registrationInfo.username,
                    email: registrationInfo.email,
                    password: registrationInfo.password
                })
            })
            if (res.ok) {
                setRegistrationInfo(registration);
                router.push('/login');
            }
        } catch (error) {
            setPasswordCheck(false);
            passwordCheckRef.current = false;
            setLoading(false);
            handleFailure('Your information was unable to be submitted. Please refresh and try again. ErrCode: 1002')
            appInstance === 'DEV' ? console.log("There was an error during registration: ", error) : '';
        }
    };

    // The procedure to check and ensure that passwords are constructed appropriately for the user.
    const checkPassword = (pass: string, secondPass: string) => {
        let passwordLength = pass.length;
        let capRegex = /[A-Z]/;
        let numRegex = /\d/;
        let symRegex = /[!@#$%^&*(),?]/;
        let checkObj = {
            capCheck: false,
            numCheck: false,
            symCheck: false
        };

        if (pass !== secondPass) {
            setPasswordCheck(false);
            handleFailure('Passwords did not match.');
            return
        }

        if (passwordLength <= 7 && passwordLength >= 20) {
            setPasswordCheck(false);
            handleFailure('Passwords needs to be between 7-20 characters.');
            return
        }

        for (let i = 0; i <= passwordLength; i++) {
            capRegex.test(pass[i]) === true ? checkObj.capCheck = true : '';
            numRegex.test(pass[i]) === true ? checkObj.numCheck = true : '';
            symRegex.test(pass[i]) === true ? checkObj.symCheck = true : '';
        }

        if (!checkObj.capCheck || !checkObj.numCheck || !checkObj.symCheck) {
            setPasswordCheck(false);
            handleFailure('Passwords need to have one capital letter, one number and one symbol from the following: !@#$%^&*(),?');
            return
        }

        setPasswordCheck(true);
        passwordCheckRef.current = true;
        attemptRegistration();
    };

    // Simple submit function, makes other function calls and starts our workflow in this file.
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setMessage('');
        setIsFailure(false);
        setLoading(true);
        checkPassword(registrationInfo.password, registrationInfo.confirmPassword);
    };

    // Dynamic input field change handler
    const handleInputChange = (val: string, id: string) => {
        clearFailure();
        setRegistrationInfo((prevState) => ({
            ...prevState,
            [id]: val,
        }))
    };

    return (
        <div className="w-full h-auto">
            <label className="absolute opacity-20 top-[200px] left-[50%] lg:left-[620px] lg:top-[280px] text-5xl text-indigo">Register</label>
            <form onSubmit={(e) => submitHandler(e)} className="flex flex-col lg:mt-[20%] lg:ml-[40%] mt-[70%]">
                <div className="flex flex-row p-2">
                    <input 
                        placeholder="Username"
                        id="username"
                        className="flex bg-black border-2 border-b-indigo border-black w-[400px] placeholder-indigo placeholder: text-center hover:rounded-md hover:placeholder-teal focus:placeholder-black outline-none" 
                        onChange={(e) => {handleInputChange(e.target.value, "username")}}
                        value={registrationInfo.username}
                        type="text" 
                        required />
                </div>
                <div className="flex flex-row p-2">
                    <input 
                        placeholder="Email Address" 
                        className="flex bg-black border-2 border-b-indigo border-black w-[400px] placeholder-indigo placeholder: text-center hover:rounded-md hover:placeholder-teal focus:placeholder-black outline-none" 
                        onChange={(e) => {handleInputChange(e.target.value, "email")}}
                        value={registrationInfo.email}
                        type="email" 
                        required />
                </div>
                <div className="flex flex-row p-2">
                    <input 
                        placeholder="Password" 
                        className="flex bg-black border-2 border-b-indigo border-black w-[400px] placeholder-indigo placeholder: text-center hover:rounded-md hover:placeholder-teal focus:placeholder-black outline-none" 
                        onChange={(e) => {handleInputChange(e.target.value, "password")}}
                        value={registrationInfo.password}
                        type="password" 
                        required />
                </div>
                <div className="flex flex-row p-2">
                    <input 
                        placeholder="Repeat Password" 
                        className="flex bg-black border-2 border-b-indigo border-black w-[400px] placeholder-indigo placeholder: text-center hover:rounded-md hover:placeholder-teal focus:placeholder-black outline-none" 
                        onChange={(e) => {handleInputChange(e.target.value, "confirmPassword")}}
                        value={registrationInfo.confirmPassword}
                        type="password" 
                        required />
                </div>
                <div className="flex flex-col lg:flex-row p-2">
                    <button 
                        className={"border-indigo text-indigo w-20 rounded-md border-2 hover:bg-indigo hover:text-teal lg:ml-0 ml-[40%] " 
                        + (isFailure ? "bg-red" : "") + (loading ? "cursor-progress" : "cursor-pointer")}
                        type="submit">Submit</button>
                    <p className="text-red ml-2 mt-4 lg:mt-0 opacity-80">{message}</p>
                </div>
                <p className="lg:ml-[190px] ml-[20px] mt-[60px] opacity-60 text-indigo">Do you already have an account? <Link href="/login" className="text-teal hover:text-indigo">Login!</Link></p>
            </form>
        </div>
    )
}