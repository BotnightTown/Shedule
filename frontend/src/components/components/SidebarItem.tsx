import type { JSX } from "react";
import { NavLink } from "react-router";

interface SidebarItemProps {
  icon: JSX.Element;
  label:  string;
  to: string;
}

function SidebarItem({icon, label, to} : SidebarItemProps){
  return(
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 p-2 rounded-xl transition ${
          isActive ? "bg-[#02c1eb] text-white" : "text-black hover:bg-[#46d0ff] hover:text-white"
        }`
      }
    >
      <div className="bg-white dark:bg-slate-900 text-cyan-950 dark:text-slate-200 p-3 rounded-xl shadow-sm">
        {icon}
      </div>
      <span className={`w-full text-center font-base dark:text-white text-sm md:text-base lg:text-lg truncate`}>{label}</span>
    </NavLink>
  )
}

export default SidebarItem;