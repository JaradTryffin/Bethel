import { NextApiRequest } from "next";
import prisma from "@/utils/prisma";
import { AddAttendance } from "@/types/member.type";
import { NextResponse } from "next/server";

export const POST = async (req: NextApiRequest) => {
  try {
    // @ts-ignore
    const data: AddAttendance = await req.json();
    const result = await prisma.attendance.create({
      data: {
        memberId: data.memberId,
        name: data.name,
        status: data.status,
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }
};
