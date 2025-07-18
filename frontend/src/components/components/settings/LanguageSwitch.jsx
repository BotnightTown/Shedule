import { useTranslation } from 'react-i18next';

function LanguageSwitch() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('lang', selectedLang);
  };

  return (
    <div className="flex flex-row justify-between">
      <p className='dark:text-slate-300'>Мова</p>
      <div className="w-max">
        <label htmlFor="language-picker" className="sr-only">
          Select your language
        </label>
        <select
          id="language-picker"
          onChange={handleChange}
          value={i18n.language}
          className="p-1 rounded-md border-2 border-gray-300 dark:border-[#02c1eb] focus:outline focus:outline-[#02c1eb] bg-white dark:bg-slate-800 text-sm cursor-pointer"
        >
          <option value="uk">Українська</option>
          <option value="en">English</option>
        </select>
      </div>
      </div>
  );
}

export default LanguageSwitch;
