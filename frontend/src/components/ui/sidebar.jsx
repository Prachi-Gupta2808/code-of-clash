"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useState } from "react";

/* ================= CONTEXT ================= */

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp ?? openState;
  const setOpen = setOpenProp ?? setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, open, setOpen, animate }) => (
  <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
    {children}
  </SidebarProvider>
);

export const SidebarBody = (props) => (
  <>
    <DesktopSidebar {...props} />
    <MobileSidebar {...props} />
  </>
);

/* ================= DESKTOP ================= */

const DesktopSidebar = ({ className, children }) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <motion.div
      className={cn(
        "hidden md:flex md:flex-col h-full shrink-0 px-4 py-6 bg-[#0C0C0C] border-r border-white/10",
        className
      )}
      animate={{ width: animate ? (open ? 280 : 64) : 280 }}
      transition={{ type: "spring", stiffness: 220, damping: 36 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </motion.div>
  );
};

/* ================= MOBILE ================= */

const MobileSidebar = ({ className, children }) => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="md:hidden bg-[#0C0C0C] px-4 py-4">
      <IconMenu2
        className="text-white cursor-pointer"
        onClick={() => setOpen(true)}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
            className={cn("fixed inset-0 z-50 bg-[#0C0C0C] p-8", className)}
          >
            <IconX
              className="absolute top-6 right-6 text-white cursor-pointer"
              onClick={() => setOpen(false)}
            />
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ================= LINK ================= */

export const SidebarLink = ({ link, className }) => {
  const { open, animate } = useSidebar();

  return (
    <button
      type="button"
      onClick={link.onClick}
      className={cn(
        `
        group/sidebar w-full relative
        flex items-center gap-3
        py-2 px-2 rounded-lg
        text-white/80 text-left
        transition-all duration-300 ease-out
        hover:text-white
        hover:bg-[linear-gradient(90deg,rgba(242,97,63,0.18),transparent)]
        `,
        className
      )}
    >
      <div className="transition-transform group-hover/sidebar:scale-105">
        {link.icon}
      </div>

      <motion.span
        animate={{
          opacity: animate ? (open ? 1 : 0) : 1,
          x: animate ? (open ? 0 : -8) : 0,
          display: animate ? (open ? "block" : "none") : "block",
        }}
        transition={{ duration: 0.25 }}
        className="text-sm whitespace-nowrap"
      >
        {link.label}
      </motion.span>
    </button>
  );
};
