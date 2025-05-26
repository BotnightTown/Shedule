import { NavLink } from "react-router-dom";


export default function WelcomeItem({ icon, label, to, sidebarOpen, src, alt }) {
  return (
    <NavLink to={to} className={`${sidebarOpen ? "w-17 sm:w-33 md:w-43 lg:w-63" : "w-20 sm:w-38 md:w-48 lg:w-68"} transition-all duration-300 h-22 sm:h-30 md:h-37 lg:h-50 bg-gray-200 dark:bg-gray-800 flex flex-col justify-around items-center p-2 rounded-xl`}>
      <div className="rounded-xl shadow-sm text-3xl text-gray-900 dark:text-gray-200 sm:hidden">
        {icon}
      </div>
      <div className="w-full h-full overflow-hidden hidden sm:flex rounded-lg justify-center items-center">
        <img src={src} alt={alt} className="flex-1"/>
      </div>
      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg sm:pt-1">{label}</span>
    </NavLink>
  );
}
