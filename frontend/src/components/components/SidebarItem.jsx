import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 p-2 rounded-xl transition ${
          isActive ? "bg-cyan-200 dark:bg-slate-800" : "hover:bg-cyan-200 dark:hover:bg-slate-800"
        }`
      }
    >
      <div className="bg-cyan-50 dark:bg-slate-900 text-cyan-950 dark:text-slate-200 p-3 rounded-xl shadow-sm">
        {icon}
      </div>
      <span className="w-full text-center text-cyan-950 dark:text-slate-200 text-sm md:text-base lg:text-lg truncate">{label}</span>
    </NavLink>
  );
}
