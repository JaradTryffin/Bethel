import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import { Member } from "@/types/member.type";

export default async function MembersTable({ members }: { members: Member[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Address</TableHeaderCell>
          <TableHeaderCell>Contact No</TableHeaderCell>
          <TableHeaderCell>Department</TableHeaderCell>
          <TableHeaderCell>Zone</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              {member.first_name} {member.last_name}
            </TableCell>
            <TableCell>
              <Text>{member.address}</Text>
            </TableCell>
            <TableCell>
              <Text>{member.contact_no}</Text>
            </TableCell>
            <TableCell>
              <Text></Text>
            </TableCell>
            <TableCell>
              <Text>{member.zone}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
