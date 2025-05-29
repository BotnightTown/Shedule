import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 p-2 rounded-xl transition ${
          isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`
      }
    >
      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl shadow-sm">
        {icon}
      </div>
      <span className="w-full text-center text-gray-700 dark:text-gray-200 text-sm md:text-base lg:text-lg truncate">{label}</span>
    </NavLink>
  );
}
