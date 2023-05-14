import { MemberData } from "@/types/member.type";
import { Button, Divider, Metric, Text, Title } from "@tremor/react";
import RadioButtonsGroup from "@/components/material/RadioButtons";

export default function Attendance({
  memberData,
}: {
  memberData: MemberData | undefined;
}) {
  return (
    <div className="flex flex-col">
      <Metric>
        {memberData?.first_name} {memberData?.last_name}
      </Metric>
      <Text>{memberData?.address}</Text>
      <Text>{memberData?.contact_no}</Text>
      <Divider />

      <RadioButtonsGroup />

      <Button className="mt-2">Register</Button>

      <Divider />
      <Title>Attendance Summary</Title>
    </div>
  );
}
