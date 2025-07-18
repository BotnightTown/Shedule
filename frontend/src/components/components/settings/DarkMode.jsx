import ToggleSwitch from "../ToggleSwitch";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function DarkMode(){
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme(){
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return(
    <div className="flex flex-row justify-between">
      <p className="dark:text-slate-300">{t("Dark Mode")}</p>
      <ToggleSwitch onToggle={() => toggleTheme()} checked={theme === 'dark'} />
    </div>
  )
}

export default DarkMode;