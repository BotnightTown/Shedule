import { useState, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { UserContext } from "../../../UserContext";
import axios from "axios";

function Account() {
  const { t } = useTranslation();
  const { user, setUser } = useContext(UserContext)!;
  const groups = ["208", "209"];
  const subgroups = ["1", "2"];

  const [selectedUsername, setSelectedUsername] = useState<string>(user?.username || "");
  const [selectedGroup, setSelectedGroup] = useState<string>(user?.group || "");
  const [selectedSubgroup, setSelectedSubgroup] = useState<string>(user?.subgroup || "");

  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setStatus(null);
      await axios.patch("http://localhost:8000/updateInfo", {
        username: selectedUsername,
        group: selectedGroup,
        subgroup: selectedSubgroup
      }, { withCredentials: true })

      setUser((prev: string[]) => ({
        ...prev,
        username: selectedUsername,
        group: selectedGroup,
        subgroup: selectedSubgroup
      }))
      setStatus("Оновлено успішно!");
    } catch (err) {
      console.error(err);
      setStatus("Помилка при оновленні.");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <p className="dark:text-slate-300">{t("Name")}</p>
        <input 
          type="text"
          className="w-36 p-1 rounded-md border-2 border-gray-300 dark:border-[#02c1eb] focus:outline focus:outline-[#02c1eb] bg-white dark:bg-slate-800 text-sm"
          maxLength={16} 
          onChange={e => setSelectedUsername(e.target.value)}
          value={selectedUsername}
        />
      </div>
      <div className="flex flex-row justify-between">
        <p className="dark:text-slate-300">{t("Group")}</p>
        <select className="w-36 p-1 rounded-md border-2 border-gray-300 dark:border-[#02c1eb] focus:outline focus:outline-[#02c1eb] bg-white dark:bg-slate-800 text-sm" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
          <option value="" disabled>{t("Choose group")}</option>
          {groups.map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-row justify-between">
        <p className="dark:text-slate-300">{t("Subgroup")}</p>
        <select className="w-36 p-1 rounded-md border-2 border-gray-300 dark:border-[#02c1eb] focus:outline focus:outline-[#02c1eb] bg-white dark:bg-slate-800 text-sm " value={selectedSubgroup} onChange={e => setSelectedSubgroup(e.target.value)}>
          <option value="" disabled>{t("Choose subgroup")}</option>
          {subgroups.map(subgroup => (
            <option key={subgroup} value={subgroup}>{subgroup}</option>
          ))}
        </select>
      </div>
      <button className="py-1 bg-[#02c1eb] text-cyan-50 hover:bg-cyan-500 transition-all duration-300 rounded-sm shadow-md cursor-pointer" onClick={handleSubmit}>{t("Change")}</button>
      {status && <p className="text-sm mt-1">{status}</p>}
    </div>
  );
}

export default Account;