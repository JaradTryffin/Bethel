import { NextApiRequest } from "next";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest, { params }: any) => {
  try {
    const result = await prisma.member.findUnique({
      where: { id: params.id },
      select: {
        first_name: true,
        last_name: true,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }
};
