import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function Name(){
  const { t } = useTranslation();
  const [name, setName] = useState(() => {
    return localStorage.getItem('name');
  })

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  return(
    <div className="flex flex-row justify-between">
      <p>{t("Name")}</p>
      <input 
        type="text" 
        maxLength={16} 
        onChange={e => setName(e.target.value)}
        value={name}
      />
    </div>
  )
}

export default Name;