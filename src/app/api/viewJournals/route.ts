import { getDataFromToken } from "@/utilities/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../utilities/models/userSchema";
import Journal from "../../../utilities/models/journalSchema";
import jwt from "jsonwebtoken";

// export async function GET(request: NextRequest) {
//   const userData = getDataFromToken(request);
//   if (!userData || !userData.id) {
//     return NextResponse.json(
//       { error: "Unauthorized or invalid token" },
//       { status: 401 }
//     );
//   }
//   const userId = userData.id;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json(
//         { message: "User not found", success: false },
//         { status: 404 }
//       );
//     }
//     const postIds = user.posts;
//     const posts = await Journal.find({ _id: { $in: postIds } });
//     return NextResponse.json({ data: posts });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const userDetails = getDataFromToken(token);
  if (!userDetails) {
    console.error("User details not found or token invalid");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = userDetails.id as string;
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