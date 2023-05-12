import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { AddMember } from "@/types/member.type";
import dayjs from "dayjs";

export const POST = async (req: NextApiRequest) => {
  try {
    // @ts-ignore
    const data: AddMember = await req.json();
    const result = await prisma.member.create({
      data: {
        ...data,
        date_of_birth: dayjs(data.date_of_birth).toISOString(),
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 403 });
    // return NextResponse.json("something went wrong");
  }
};
