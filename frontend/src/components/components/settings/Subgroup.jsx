import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function Subgroup() {
  const { t } = useTranslation();
  const subgroups = ["1", "2"];
  const [selectedSubgroup, setSelectedSubgroup] = useState(() => {
    return localStorage.getItem('selectedSubgroup') || '208';
  });

  useEffect(() => {
    if (selectedSubgroup) {
      localStorage.setItem('selectedSubgroup', selectedSubgroup);
    }
  }, [selectedSubgroup]);

  return (
    <div className="flex flex-row justify-between">
      <p>{t("Subgroup")}</p>
      <select className="p-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm" value={selectedSubgroup} onChange={e => setSelectedSubgroup(e.target.value)}>
        <option value="" disabled>{t("Choose subgroup")}</option>
        {subgroups.map(subgroup => (
          <option key={subgroup} value={subgroup}>{subgroup}</option>
        ))}
      </select>
    </div>
  );
}

export default Subgroup;