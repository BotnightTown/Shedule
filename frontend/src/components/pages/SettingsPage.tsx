import { useContext } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../UserContext';
import axios from "axios";
import DarkMode from "../components/settings/DarkMode";
import Account from "../components/settings/Account";
import LanguageSwitch from "../components/settings/LanguageSwitch";

interface SettingsPageProps{
  sidebarOpen: boolean;
}

function SettingsPage({ sidebarOpen }: SettingsPageProps){
  const { setUser } = useContext(UserContext)!;
  const navigate = useNavigate();
  const { t } = useTranslation();

    const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/user/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return(
    <div className={`h-full flex flex-col gap-3 text-cyan-950 dark:text-gray-200 transition-all duration-300 ${!sidebarOpen ? 'p-5 pt-0' : ''}overflow-y-auto`}>
      <div className="h-max flex flex-row justify-between items-center ">
        <p className="text-xl md:text-2xl font-medium dark:text-slate-300">{t('Settings')}</p>
      </div>
      <div className="flex flex-col gap-5 text-base md:text-lg font-normal" >
        <div className="flex flex-col gap-2">
          <p className="text-base md:text-lg font-medium py-3 dark:text-slate-300">{t("View settings")}</p>
          <DarkMode />
          <LanguageSwitch />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base md:text-lg font-medium py-3 dark:text-slate-300">{t("Account settings")}</p>
          <Account />
        </div>
        <button onClick={handleLogout} className="text-red-500 text-shadow-sm cursor-pointer">{t("Logout")}</button>
      </div>
    </div>
  )
}

export default SettingsPage;