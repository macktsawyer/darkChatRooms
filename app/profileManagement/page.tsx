'use client';

import {ChangeEvent, useState, FormEvent, useRef} from 'react';
import { registration } from '../types/registration';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Register () {
    const [loading, setLoading] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [message, setMessage] = useState('');
    const { data: session } = useSession();

    console.log(session)
    return (
        <div className="w-full h-auto">
            <ul className="flex flex-col lg:mt-[20%] lg:ml-[40%] mt-[70%]">
                <li>{session?.user?.name}</li>
                <li>{session?.user?.email}</li>
            </ul>
        </div>
    )
}