import DarkMode from "../components/settings/DarkMode";
import Group from "../components/settings/Group";
import Subgroup from "../components/settings/Subgroup";
import WeekType from "../components/settings/WeekType";
import Name from "../components/settings/Name";
import LanguageSwitch from "../components/settings/LanguangeSwitch";
import { useTranslation } from 'react-i18next';


function SettingsPage({ sidebarOpen }){
  const { t } = useTranslation();

  return(
    <div className={`h-full flex flex-col gap-3 text-gray-950 dark:text-gray-200 transition-all duration-300 ${!sidebarOpen ? 'p-5 pt-0' : ''}`}>
      <div className="h-max flex flex-row justify-between items-center ">
        <p className="text-xl md:text-2xl font-medium">{t('Settings')}</p>
      </div>
      <div className="flex flex-col gap-5 text-base md:text-lg font-normal" >
        <div className="flex flex-col gap-2">
          <p className="text-base md:text-lg font-medium py-3">{t("View settings")}</p>
          <Name />
          <DarkMode />
          <LanguageSwitch />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base md:text-lg font-medium py-3">{t("Group settings")}</p>
          <Group />
          <Subgroup />
          <WeekType />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage;