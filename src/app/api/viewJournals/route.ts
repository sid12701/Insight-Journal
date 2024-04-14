import { getDataFromToken } from "@/utilities/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../utilities/models/userSchema";
import Journal from "../../../utilities/models/journalSchema";

export async function GET(request: NextRequest) {
  const userData = getDataFromToken(request);
  if (!userData || !userData.id) {
    return NextResponse.json(
      { error: "Unauthorized or invalid token" },
      { status: 401 }
    );
  }
  const userId = userData.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const postIds = user.posts;
    const posts = await Journal.find({ _id: { $in: postIds } });
    return NextResponse.json({ data: posts });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


