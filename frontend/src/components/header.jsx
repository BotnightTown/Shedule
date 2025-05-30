import { TfiAlignLeft } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

function Header({ onSidebarToggle }){
  return(
    <header className="h-max flex flex-row justify-start items-center p-4 text-2xl lg:text-3xl">
      <TfiAlignLeft className="w-10 mr-10 cursor-pointer" onClick={onSidebarToggle}/>
      <NavLink className="w-max text-left font-medium" to="/">Schedule</NavLink>
    </header>
  )
}

export default Header;