import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { AddMember } from "@/types/member.type";
import dayjs from "dayjs";

// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
//   const result = await prisma.member.findMany();
//   return NextResponse.json(result);
// };

export const POST = async (req: NextApiRequest) => {
  try {
    // @ts-ignore
    const data: AddMember = await req.json();
    const result = await prisma.member.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        email_address: data.email_address,
        contact_no: data.contact_no,
        date_of_birth: dayjs(data.date_of_birth).toISOString(),
        material_status: data.material_status,
        departmentId: data.departmentId,
        zoneId: data.zoneId,
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 400 });
    // return NextResponse.json("something went wrong");
  }
};
