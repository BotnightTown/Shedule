import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function Group() {
  const { t } = useTranslation();
  const groups = ["208", "209"];
  const [selectedGroup, setSelectedGroup] = useState(() => {
    return localStorage.getItem('selectedGroup') || '208';
  });

  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem('selectedGroup', selectedGroup);
    }
  }, [selectedGroup]);

  return (
    <div className="flex flex-row justify-between">
      <p>{t("Group")}</p>
      <select className="w-36 p-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
        <option value="" disabled>{t("Choose group")}</option>
        {groups.map(group => (
          <option key={group} value={group}>{group}</option>
        ))}
      </select>
    </div>
  );
}

export default Group;