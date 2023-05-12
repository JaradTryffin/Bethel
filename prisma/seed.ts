import prisma from "../utils/prisma";
import { date } from "zod";

async function main() {
  await prisma.member.deleteMany();
  await prisma.zone.deleteMany();
  await prisma.department.deleteMany();
  const departmentResult = await prisma.department.create({
    data: {
      name: "IT",
    },
  });

  const zoneResult = await prisma.zone.create({
    data: {
      name: "Zone One",
    },
  });

  await prisma.member.create({
    data: {
      first_name: "Jarad",
      last_name: "Tryffin",
      address: "23A Hatton Avenue",
      email_address: "jarad@avochoc.com",
      contact_no: "0813644612",
      date_of_birth: new Date(),
      material_status: "taken",
      departmentId: departmentResult.id,
      zoneId: zoneResult.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
