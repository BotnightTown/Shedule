import type { JSX } from "react";
import { NavLink } from "react-router";

interface WelcomeItemProps {
  icon: JSX.Element;
  label: string;
  to : string;
  sidebarOpen: boolean;
  src: string;
  alt: string;
}

export default function WelcomeItem({ icon, label, to, sidebarOpen, src, alt } : WelcomeItemProps) {
  return (
    <NavLink to={to} className={`${sidebarOpen ? "w-17 sm:w-33 md:w-43 lg:w-63" : "w-20 sm:w-38 md:w-48 lg:w-68"} transition-all duration-300 h-22 sm:h-30 md:h-37 lg:h-50 bg-[#02c1eb] dark:bg-slate-800 dark:border-2 dark:border-[#02c1eb] hover:text-white flex flex-col justify-around items-center p-2 rounded-xl`}>
      <div className="rounded-xl shadow-sm text-3xl dark:text-slate-300 sm:hidden">
        {icon}
      </div>
      <div className="w-full h-full overflow-hidden hidden sm:flex rounded-lg justify-center items-center">
        <img src={src} alt={alt} className="flex-1"/>
      </div>
      <span className=" dark:text-slate-300 text-sm sm:text-base md:text-lg sm:pt-1">{label}</span>
    </NavLink>
  );
}
