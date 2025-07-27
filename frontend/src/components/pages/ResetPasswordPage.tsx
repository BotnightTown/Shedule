import { useState } from "react"
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function ResetRequestPage(){
  const { t } = useTranslation();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = async () => {
    try {
      await axios.post('http://localhost:8000/auth/reset_password', {
        token,
        newPassword,
      });
      setMessage('Пароль успішно змінено!');
    } catch (err) {
      setMessage('Помилка. Можливо, посилання вже недійсне.');
    }
  };

  return(
    <div className="w-full h-full p-5 pt-0 flex items-start justify-center">
      <div className="w-full h-max p-5 flex flex-col gap-3 bg-white dark:bg-slate-800 rounded-xl border-2 border-[#02c1eb]">
        <div className="flex flex-col gap-1 mb-2">
          <h1 className="text-2xl font-semibold dark:text-slate-300">{t("Reset password")}</h1>
          <p className="text-sm">{t("Input new password")}</p>
        </div>
        <div className="relative border border-slate-300 dark:border-slate-950 rounded-md">
          <span className="absolute -top-3 left-3 bg-white dark:bg-slate-800 px-1 text-sm text-slate-600 dark:text-slate-300">
            {t("Password")}
          </span>
          <input
            type={!isVisible ? "password" : "text"}
            className="w-full h-10 rounded-md pl-2
              border border-slate-300 dark:border-slate-950
              hover:outline-1 hover:outline-cyan-400
              focus:outline-2 focus:outline-[#02c1eb]
              transition-all duration-300"
            onChange={e => setNewPassword(e.target.value)}
          />
          <span 
            className={`absolute right-0 top-0 translate-y-1/2 -translate-x-1/2 text-lg cursor-pointer text-slate-600 dark:text-slate-300 transition-all duration-300 hover:dark:text-slate-300 ${newPassword === "" ? "dark:text-slate-950" : "dark:text-slate-300"}`}
            onClick={()=>setIsVisible(!isVisible)}
          >
            {isVisible ? <FaRegEye className="dark:text-slate-300"/> : <FaRegEyeSlash /> }
          </span>
        </div>
        <button 
          className="w-full h-10 bg-custom-blue dark:bg-slate-900 text-cyan-50 hover:bg-custom-blue hover:dark:bg-slate-700 rounded-sm shadow-md cursor-pointer focus:outline-[#02c1eb]" 
          onClick={handleReset}
        >
          {t("Submit")}
          </button>
          {message && <p className="text-sm">{message}</p>}
      </div>
    </div>
  )
}

export default ResetRequestPage;