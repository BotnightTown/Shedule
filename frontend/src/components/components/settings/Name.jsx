import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function Name(){
  const { t } = useTranslation();
  const [name, setName] = useState(() => {
    return localStorage.getItem('name') || "Student";
  })

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  return(
    <div className="flex flex-row justify-between">
      <p>{t("Name")}</p>
      <input 
        type="text"
        className="w-36 p-1 rounded-md border border-gray-300 dark:border-gray-600 bg-cyan-50 dark:bg-gray-800 text-sm"
        maxLength={16} 
        onChange={e => setName(e.target.value)}
        value={name}
      />
    </div>
  )
}

export default Name;