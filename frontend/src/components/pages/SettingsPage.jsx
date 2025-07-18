import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { UserContext } from '../../UserContext';
import DarkMode from "../components/settings/DarkMode";
import Account from "../components/settings/Account";
import Subgroup from "../components/settings/Subgroup";
import WeekType from "../components/settings/WeekType";
import Name from "../components/settings/Name";
import LanguageSwitch from "../components/settings/LanguageSwitch";

function SettingsPage({ sidebarOpen }){
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

    const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return(
    <div className={`h-full flex flex-col gap-3 text-cyan-950 dark:text-gray-200 transition-all duration-300 ${!sidebarOpen ? 'p-5 pt-0' : ''}`}>
      <div className="h-max flex flex-row justify-between items-center ">
        <p className="text-xl md:text-2xl font-medium dark:text-slate-300">{t('Settings')}</p>
      </div>
      <div className="flex flex-col gap-5 text-base md:text-lg font-normal" >
        <div className="flex flex-col gap-2">
          <p className="text-base md:text-lg font-medium py-3 dark:text-slate-300">{t("View settings")}</p>
          {/* <Name /> */}
          <DarkMode />
          <LanguageSwitch />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base md:text-lg font-medium py-3 dark:text-slate-300">Налаштування розкладу</p>
          <WeekType />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base md:text-lg font-medium py-3 dark:text-slate-300">Налаштування акаунта</p>
          <Account />
        </div>
        <button onClick={handleLogout} className="text-red-500 text-shadow-sm cursor-pointer">Вийти з акаунту</button>
      </div>
    </div>
  )
}

export default SettingsPage;