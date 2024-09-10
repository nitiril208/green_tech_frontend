import React from "react";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";

interface DrawerProps {
  open?: boolean;
  hideClose?: boolean;
  onClose: () => void;
  label?: React.ReactNode;
  children: React.ReactNode;
  headerConent?: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}
const Drawer = ({
  open,
  onClose,
  label,
  headerConent,
  children,
  className,
  side = "left",
  hideClose = false,
}: DrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      {label}
      <SheetContent hideClose={hideClose} side={side} className={className}>
        <SheetHeader>{headerConent}</SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
