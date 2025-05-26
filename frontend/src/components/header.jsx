import { TfiAlignLeft } from "react-icons/tfi";
import { MdMoreHoriz } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Header({ onSidebarToggle }){
  return(
    <header className="h-max flex flex-row justify-between items-center p-4 text-2xl lg:text-3xl">
      <TfiAlignLeft className="w-10 mr-10 cursor-pointer" onClick={onSidebarToggle}/>
      <NavLink className="w-full text-left font-medium" to="/">Schedule</NavLink>
      {/* <MdMoreHoriz className="w-10"/> */}
    </header>
  )
}

export default Header;