"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LabTabs from "@/components/material/Tabs";
import { MemberData } from "@/types/member.type";

type Anchor = "top" | "left" | "bottom" | "right";

interface Drawer {
  state: boolean;
}
interface ToggleDrawerFunction {
  (open: boolean): (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function TemporaryDrawer({
  drawer,
  handleToggleDrawer,
  memberData,
}: {
  drawer: Drawer;
  handleToggleDrawer: ToggleDrawerFunction;
  memberData: MemberData | undefined;
}) {
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
      role="presentation"
      // onClick={handleToggleDrawer(false)}
      onKeyDown={handleToggleDrawer(false)}
    >
      <LabTabs memberData={memberData} />
    </Box>
  );

  return (
    <div>
      <React.Fragment key="right">
        <Drawer
          anchor="right"
          open={drawer.state}
          onClose={handleToggleDrawer(false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
