import { useState, useEffect, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { UserContext } from "../../../UserContext";
import axios from "axios";

function ScheduleSettings(){
  const { t } = useTranslation();
  const { isAuto } = useContext(UserContext)!;
  const groups = ["208", "209"];
  const subgroups = ["1", "2"];
  const weekTypes = [
    { label: `${t("Upper day of week")}`, value: 'upper' },
    { label: `${t("Lower day of week")}`, value: 'lower' }
  ];

  const [selectedGroup, setSelectedGroup] = useState(() => {
    return localStorage.getItem('selectedGroup') || '208';
  });
  const [selectedSubgroup, setSelectedSubgroup] = useState(() => {
    return localStorage.getItem('selectedSubgroup') || '1';
  });
  const [weekType, setWeekType] = useState(() => {
    return localStorage.getItem('weekType') || 'upper';
  });
  const [status, setStatus] = useState<string | null>(null);
  
  useEffect(() => {
    localStorage.setItem('weekType', weekType);
    localStorage.setItem("selectedGroup", selectedGroup);
    localStorage.setItem("selectedSubgroup", selectedSubgroup);
  }, [weekType, selectedGroup, selectedSubgroup]);

  const handleSubmit = async () =>{
    try{
      setStatus(null);
      await axios.patch("", {
        weekType: weekType,
        group: selectedGroup,
        subgroup: selectedSubgroup
      }, { withCredentials: true })
      setStatus("Оновлено успішно!");
    } catch (err) {
      console.error(err);
      setStatus("Помилка при оновленні.");
    }
  }

  return(
    <div className="flex flex-col gap-2">
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
      <div className="flex flex-row justify-between">
        <p className={`dark:text-slate-300 ${isAuto && "text-gray-400 dark:text-slate-500 cursor-default"}`}>{t("Group")}</p>
        <select 
          className={`w-36 p-1 rounded-md border-2 border-gray-300 dark:border-[#02c1eb] focus:outline focus:outline-[#02c1eb] bg-white dark:bg-slate-800 text-sm ${isAuto ? "text-gray-400 dark:text-slate-500 dark:border-[#009dbf] cursor-default" : "cursor-pointer"}`} 
          value={selectedGroup} 
          onChange={e => setSelectedGroup(e.target.value)}
          disabled={isAuto}
        >
          <option value="" disabled>{t("Choose group")}</option>
          {groups.map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-row justify-between">
        <p className={`dark:text-slate-300 ${isAuto && "text-gray-400 dark:text-slate-500"}`}>{t("Subgroup")}</p>
        <select 
          className={`w-36 p-1 rounded-md border-2 border-gray-300 dark:border-[#02c1eb] focus:outline focus:outline-[#02c1eb] bg-white dark:bg-slate-800 text-sm ${isAuto ? "text-gray-400 dark:text-slate-500 dark:border-[#009dbf] cursor-default" : "cursor-pointer"}`}
          value={selectedSubgroup} 
          onChange={e => setSelectedSubgroup(e.target.value)}
          disabled={isAuto}
        >
          <option value="" disabled>{t("Choose subgroup")}</option>
          {subgroups.map(subgroup => (
            <option key={subgroup} value={subgroup}>{subgroup}</option>
          ))}
        </select>
      </div>
      <button 
        className={`py-1 bg-[#02c1eb] rounded-sm shadow-md ${isAuto ? "bg-cyan-700 border-[#009dbf] text-gray-300 cursor-default" : "text-cyan-50 hover:bg-cyan-500 cursor-pointer transition-all duration-300"}`} 
        onClick={handleSubmit}
        disabled={isAuto}
      >{t("Change")}</button>
      {status && <p className="text-sm mt-1">{status}</p>}
    </div>
  )
}

export default ScheduleSettings;