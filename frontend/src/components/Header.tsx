import { useContext } from "react";
import { UserContext } from "../UserContext";
import { GrTextAlignLeft } from "react-icons/gr";
import { NavLink } from "react-router";

interface HeaderProps {
  onSidebarToggle: () => void;
}

function Header ({ onSidebarToggle } : HeaderProps){
  const userContext = useContext(UserContext);
  if (!userContext) return null
  const { user } = userContext;

  return(
    <header className="h-max flex flex-row justify-start items-center p-4 text-2xl lg:text-3xl bg-custom-blue text-white">
      {user && <GrTextAlignLeft className="w-10 mr-10 cursor-pointer text-[27px]" onClick={onSidebarToggle}/>}
      <NavLink className={`w-max text-left font-medium ${user ? "ml-0" : "ml-10"}`} to="/">Schedule</NavLink>
    </header>
  )
}

export default Header