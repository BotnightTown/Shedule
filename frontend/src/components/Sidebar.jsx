import SidebarItem from "./components/SidebarItem";
import { BsCalendar2Event, BsJournalText, BsFileEarmarkText } from "react-icons/bs";
import { GoGear } from "react-icons/go";

function Sidebar({ open }){
    return (
    <div className={`transition-all duration-300 pt-4 ${open ? 'w-30 p-4' : 'w-0 p-0'} overflow-hidden flex flex-col gap-6 h-full`}> 
      <SidebarItem icon={<BsJournalText className="text-xl md:text-2xl" />} label="Today" to="/today" />
      <SidebarItem icon={<BsCalendar2Event className="text-xl md:text-2xl" />} label="Schedule" to="/schedule" />
      <SidebarItem icon={<BsFileEarmarkText className="text-xl md:text-2xl" />} label="Notes" to="/notes" />
      <SidebarItem icon={<GoGear className="text-xl md:text-2xl" />} label="Settings" to="/settings" />
    </div>
  );
}

export default Sidebar;