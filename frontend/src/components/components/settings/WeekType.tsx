import { useState, useEffect, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { UserContext } from "../../../UserContext";

function WeekType() {
  const { t } = useTranslation();
  const { isAuto } = useContext(UserContext)!;

  const weekTypes = [
    { label: `${t("Upper day of week")}`, value: 'upper' },
    { label: `${t("Lower day of week")}`, value: 'lower' }
  ];
  const [weekType, setWeekType] = useState(() => {
    return localStorage.getItem('weekType') || 'upper';
  });

  useEffect(() => {
    if (weekType) {
      localStorage.setItem('weekType', weekType);
    }
  }, [weekType]);

  return (
    <div className="flex flex-row justify-between">
      <p className={`dark:text-slate-300 ${isAuto && "text-gray-400 dark:text-slate-500"}`}>{t("Week")}</p>
      <select 
        className={`w-36 p-1 rounded-md border-2 border-gray-300 dark:border-[#02c1eb] focus:outline focus:outline-[#02c1eb] bg-white dark:bg-gray-800 text-sm ${isAuto ? "text-gray-400 dark:text-slate-500 dark:border-[#009dbf] cursor-default" : "cursor-pointer"}`} 
        value={weekType} 
        onChange={e => setWeekType(e.target.value)}
        disabled={isAuto}
      >
        <option value="" disabled>{t("Choose week")}</option>
        {weekTypes.map(week => (
          <option key={week.label} value={week.value}>{week.label}</option>
        ))}
      </select>
    </div>
  );
}

export default WeekType;