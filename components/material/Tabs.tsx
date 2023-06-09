"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MemberData } from "@/types/member.type";
import Attendance from "@/components/Attendance";

export default function LabTabs({
  memberData,
}: {
  memberData: MemberData | undefined;
}) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Attendance" value="1" />
            <Tab label="Edit" value="2" />
            <Tab label="History" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Attendance memberData={memberData} />
        </TabPanel>
        <TabPanel value="2">Edit</TabPanel>
        <TabPanel value="3">History</TabPanel>
      </TabContext>
    </Box>
  );
}
