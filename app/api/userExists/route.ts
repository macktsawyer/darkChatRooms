import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from '../../../utils/mongodb';
import User from "../../../models/User.js";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { email } = await req.json();
        const user = await User.findOne({ email }).select("id");
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An error occurred while checking if the user exists.",
            status: 500,
        });
    }
}