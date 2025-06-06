// Sidebar.js
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Links from "./links/Links";
import "./sidebar.scss";
import ToggleButton from "./toggleButton/ToggleButton";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const variants = {
    open: {
      clipPath: "circle(1200px at 50px 50px)",
      transition: {
        type: "spring",
        stiffness: 20,
      },
    },
    closed: {
      clipPath: "circle(30px at 50px 50px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <motion.div
      className="sidebar"
      animate={open ? "open" : "closed"}
      ref={sidebarRef}
    >
      <motion.div className="bg" variants={variants}>
        <Links closeSidebar={() => setOpen(false)} />
      </motion.div>
      <ToggleButton setOpen={setOpen} />
    </motion.div>
  );
}
