import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import User from "../../../models/User.js";
import { connectToDatabase } from "../../../utils/mongodb.js";
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const { username, email, password } : 
                { username: string; email: string; password: string; } = body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword)
            await connectToDatabase();
            const newUser = new User({
                id: uuidv4(),
                username: username,
                email: email,
                password: hashedPassword,
                creationDate: Date.now(),
                defaultMessageColor: "slate"
            })
            await newUser.save()
        } catch (error) {
            if (process.env.APP_INSTANCE === "DEV") {
                console.log("ErrCode 1003: Error when attempting to create a new user: " + error);
            } else {
                console.log("ErrCode 1003");
            }
            return NextResponse.json({
                message: "ErrCode 1003: An error occured while registering the user.",
                status: 500,
            })
        }

        return NextResponse.json({
            message: "Success",
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            message: "An error occured while registering the user.",
            status: 500,
        })
    }
}