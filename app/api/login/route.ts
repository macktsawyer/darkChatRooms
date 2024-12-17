import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from '../../../utils/mongodb';
import User from "../../../models/User.js";
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const { username, password } : { username: string; password: string; } = body.loginAttempt;

        const query = User.where({username: username})

        const user = await query.findOne();

        if (user) {
            const check = await bcrypt.compare(password, user.password);
            if (check) {
                console.log('Logging in...successful!');
                return NextResponse.json({ user });
            };
        } else {
            console.log('ErrCode 1005: Error with the login response from MongoDB');
            return NextResponse.json({
                message: "ErrCode 1005",
                status: 500
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error " + error,
            status: 500
        })
    }
}