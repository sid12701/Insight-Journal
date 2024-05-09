import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utilities/getDataFromToken";
import connectToDb from "@/utilities/db";
import Journal from "@/utilities/models/journalSchema";
import User from "@/utilities/models/userSchema";

connectToDb();

export async function POST(request: NextRequest) {
    const req = await request.json();
    const authHeaders = request.headers.get("Authorization");
    if (!authHeaders) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeaders.split(" ")[1];
    const userFromToken = getDataFromToken(token);

    if (!userFromToken) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { title, date, journal, insight } = req;
    const newJournal = new Journal({
        title,
        date,
        journal,
        insight,
        author: userFromToken.id
    });
    const savedJournal = await newJournal.save();

    const user = await User.findById(userFromToken.id);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    user.posts.push(savedJournal._id);
    await user.save();
    return NextResponse.json({ data: user.id });
}