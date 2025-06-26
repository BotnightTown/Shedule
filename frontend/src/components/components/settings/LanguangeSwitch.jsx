import { useTranslation } from 'react-i18next';

function LanguageSwitc() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('lang', selectedLang);
  };

  return (
    <div className="flex flex-row justify-between">
      <p>Мова</p>
      <div className="w-max">
        <label htmlFor="language-picker" className="sr-only">
          Select your language
        </label>
        <select
          id="language-picker"
          onChange={handleChange}
          value={i18n.language}
          className="p-1 rounded-md border border-gray-300 dark:border-gray-600 bg-cyan-50 dark:bg-gray-800 text-sm"
        >
          <option value="uk">Українська</option>
          <option value="en">English</option>
        </select>
      </div>
      </div>
  );
}

export default LanguageSwitc;
