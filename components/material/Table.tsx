"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { Member, MemberData } from "@/types/member.type";
import TemporaryDrawer from "@/components/material/Drawer";
import axios from "axios";

interface Column {
  id:
    | "first_name"
    | "last_name"
    | "address"
    | "contact_no"
    | "department"
    | "zone";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "first_name", label: "Name", minWidth: 100 },
  { id: "last_name", label: "Surname", minWidth: 100 },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "contact_no",
    label: "contact No",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "department",
    label: "Department",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "zone",
    label: "Zone",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

export default function MaterialTable({ members }: { members: Member[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [state, setState] = React.useState(false);
  const [memberData, setMemberData] = React.useState<MemberData>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };

  const fetchMemberData = async (id: string) => {
    try {
      const response = await axios.get(`/api/member/${id}`, {});
      setMemberData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {members
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((member) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={member.id}
                    onClick={() => fetchMemberData(member.id)}
                  >
                    {columns.map((column) => {
                      const value = member[column.id];
                      return (
                        <TableCell
                          onClick={toggleDrawer(true)}
                          key={column.id}
                          align={column.align}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TemporaryDrawer
        drawer={{ state }}
        handleToggleDrawer={toggleDrawer}
        memberData={memberData}
      />
    </Box>
  );
}
