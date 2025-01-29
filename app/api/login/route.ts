import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from '../../../utils/mongodb';
import User from "../../../models/User.js";
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Parse the request body
        const body = await req.json();
        const { username, password }: { username: string; password: string } = body;

        // Search for the user
        const user = await User.findOne({ username });

        if (user) {
            // Compare the password
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                console.log('Logging in...successful!');
                return NextResponse.json({ user });
            } else {
                console.log('Invalid password');
                return NextResponse.json(
                    { message: "Invalid credentials" },
                    { status: 401 }
                );
            }
        } else {
            console.log('User not found');
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: `Error: ${error.message}` },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    console.log('GET method not supported');
    return NextResponse.json({ message: "GET method not supported" });
}