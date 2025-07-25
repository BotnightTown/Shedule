import SidebarItem from "./components/SidebarItem";
import { BsCalendar2Event, BsJournalText, BsFileEarmarkText } from "react-icons/bs";
import { GoGear } from "react-icons/go";
import { useTranslation } from 'react-i18next';

interface SidebarProps{
  open: boolean;
}

function Sidebar({open} : SidebarProps){
  const { t } = useTranslation();

  return (
    <div className={`transition-all duration-300 pt-4 ${open ? 'w-30 p-2' : 'w-0 p-0'} overflow-hidden flex flex-col gap-6 h-full`}> 
      <SidebarItem icon={<BsJournalText className="text-lg md:text-xl" />} label={t('Today')} to="/today" />
      <SidebarItem icon={<BsCalendar2Event className="text-lg md:text-xl" />} label={t('Schedule')} to="/schedule" />
      <SidebarItem icon={<BsFileEarmarkText className="text-lg md:text-xl" />} label={t("Notes")} to="/notes" />
      <SidebarItem icon={<GoGear className="text-lg md:text-xl" />} label={t("Settings")} to="/settings" />
    </div>
  );
}

export default Sidebar;