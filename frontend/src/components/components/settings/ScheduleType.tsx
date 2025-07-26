import { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../UserContext";

function ScheduleType(){
  const { isAuto, setIsAuto } = useContext(UserContext)!;
  const { t } = useTranslation();

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setIsAuto(value === "auto");
    localStorage.setItem("scheduleType", value);
  };
  
  useEffect(() => {
    const type = localStorage.getItem("scheduleType") || "auto"
    setIsAuto(type === "auto");
  }, [])
  

  return (
    <div className="flex flex-row justify-between">
      <p className='dark:text-slate-300'>{t("Schedule type")}</p>
      <div className="w-max">
        <label htmlFor="language-picker" className="sr-only">
          {t("Select language")}
        </label>
        <select
          id="type-picker"
          onChange={handleChange}
          value={isAuto ? "auto" : "manual"}
          className="p-1 rounded-md border-2 border-gray-300 dark:border-[#02c1eb] focus:outline focus:outline-[#02c1eb] bg-white dark:bg-slate-800 text-sm cursor-pointer"
        >
          <option value="auto">{t("Automatically")}</option>
          <option value="manual">{t("Manually")}</option>
        </select>
      </div>
      </div>
  )
}

export default ScheduleType;