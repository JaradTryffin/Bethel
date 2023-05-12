import { Card, Text } from "@tremor/react";
import Search from "@/components/search";
import prisma from "@/utils/prisma";
import MaterialTable from "@/components/material/Table";
import ModelForm from "@/components/material/ModelForm";

export default async function Home() {
  const results = await prisma.member.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      address: true,
      contact_no: true,
      department: {
        select: {
          name: true,
        },
      },
      zone: {
        select: {
          name: true,
        },
      },
    },
  });

  const members = results.map((result) => ({
    ...result,
    department: result.department?.name,
    zone: result.zone.name,
  }));

  const departments = await prisma.department.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const departmentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  const zones = await prisma.zone.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const zoneOptions = zones.map((zone) => ({
    value: zone.id,
    label: zone.name,
  }));

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <title>Members</title>
      <Text>A list of all church members</Text>
      <div className="flex justify-between">
        <Search />
        <ModelForm department={departmentOptions} zones={zoneOptions} />
      </div>
      <Card className="mt-6">
        <MaterialTable members={members} />
      </Card>
    </main>
  );
}
