import React from "react";

type Anchor = "top" | "left" | "bottom" | "right";

interface Drawer {
  setDraw: (newState: boolean) => void;
}
export const toggleDrawer =
  (anchor: Anchor, open: boolean, drawer: Drawer) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    drawer.setDraw(open);
  };
