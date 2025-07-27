import axios from "axios";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ChangePasswordType {
  sidebarOpen: boolean;
}

function ChangePassword({sidebarOpen}: ChangePasswordType){
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [isOldVisible, setIsOldVisible] = useState<boolean>(false);
  const [isNewVisible, setIsNewVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    if (
      updatedFormData.newPassword &&
      updatedFormData.confirmNewPassword &&
      updatedFormData.newPassword !== updatedFormData.confirmNewPassword
    ) {
      setError("Паролі не збігаються");
    } else {
      setError(null);
    }
  }

  const handleSubmit = async () => {
    setError(null);
    try{
      const result = await axios.post(`${API_BASE_URL}/user/change_password`, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }, { withCredentials: true });
      setError(result.data.message);
      setFormData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Щось пішло не так");
    }
  }

  return(
    <div className={`w-full h-max flex flex-col gap-5 transition-all duration-300 ${!sidebarOpen && "p-5"}`}>
      <h3 className="text-xl font-semibold dark:text-slate-300">{t("Change password2")}</h3>
      <div className="flex flex-col gap-5 pt-1">
        <div className="relative border border-slate-300 dark:border-2 dark:border-[#02c1eb] rounded-md">
          <span 
            className="absolute -top-3 left-3 bg-white dark:bg-slate-950 px-1 text-sm text-slate-600 dark:text-slate-300"
          >
            {t("Old password")}
          </span>
          <input 
            type={!isOldVisible ? "password" : "text"} 
            className="w-full h-10 rounded-md pl-2
              border border-slate-300 dark:border-slate-950
              hover:outline-1 hover:outline-cyan-400
              focus:outline-2 focus:outline-[#02c1eb]"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
          <span 
            className={`absolute right-0 top-0 translate-y-1/2 -translate-x-1/2 text-lg cursor-pointer text-slate-600 dark:text-slate-300 transition-all duration-300 hover:dark:text-slate-300 ${formData.oldPassword === "" ? "dark:text-slate-500" : "dark:text-slate-300"}`}
            onClick={()=>setIsOldVisible(!isOldVisible)}
          >
            {isOldVisible ? <FaRegEye className=" dark:text-slate-300"/> : <FaRegEyeSlash className="text-s"/> }
          </span>
        </div>
        <div className="relative border border-slate-300 dark:border-2 dark:border-[#02c1eb] rounded-md">
          <span 
            className="absolute -top-3 left-3 bg-white dark:bg-slate-950 px-1 text-sm text-slate-600 dark:text-slate-300"
          >
            {t("New password")}
          </span>
          <input 
            type={!isNewVisible ? "password" : "text"} 
            className="w-full h-10 rounded-md pl-2
              border border-slate-300 dark:border-slate-950
              hover:outline-1 hover:outline-cyan-400
              focus:outline-2 focus:outline-[#02c1eb]"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <span 
            className={`absolute right-0 top-0 translate-y-1/2 -translate-x-1/2 text-lg cursor-pointer text-slate-600 dark:text-slate-300 transition-all duration-300 hover:dark:text-slate-300 ${formData.newPassword === "" ? "dark:text-slate-500" : "dark:text-slate-300"}`}
            onClick={()=>setIsNewVisible(!isNewVisible)}
          >
            {isNewVisible ? <FaRegEye className=" dark:text-slate-300"/> : <FaRegEyeSlash className="text-s"/> }
          </span>
        </div>
        <div className="relative border border-slate-300 dark:border-2 dark:border-[#02c1eb] rounded-md">
          <span 
            className="absolute -top-3 left-3 bg-white dark:bg-slate-950 px-1 text-sm text-slate-600 dark:text-slate-300"
          >
            {t("Repeat password")}
          </span>
          <input 
            type={!isConfirmVisible ? "password" : "text"} 
            className="w-full h-10 rounded-md pl-2
              border border-slate-300 dark:border-slate-950
              hover:outline-1 hover:outline-cyan-400
              focus:outline-2 focus:outline-[#02c1eb]"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
          />
          <span 
            className={`absolute right-0 top-0 translate-y-1/2 -translate-x-1/2 text-lg cursor-pointer text-slate-600 dark:text-slate-300 transition-all duration-300 hover:dark:text-slate-300 ${formData.confirmNewPassword === "" ? "dark:text-slate-500" : "dark:text-slate-300"}`}
            onClick={()=>setIsConfirmVisible(!isConfirmVisible)}
          >
            {isConfirmVisible ? <FaRegEye className=" dark:text-slate-300"/> : <FaRegEyeSlash className="text-s"/> }
          </span>
        </div>
        {error && <p>{error}</p>}
        <button 
          className="w-full h-10 bg-[#02c1eb] text-cyan-50 d rounded-sm shadow-md cursor-pointer focus:outline-[#02c1eb] disabled:bg-[#009dbf]"
          onClick={handleSubmit}
          disabled={!formData.oldPassword || !formData.newPassword || !formData.confirmNewPassword || formData.newPassword !== formData.confirmNewPassword}
        >
          {t("Change password")}
        </button>
      </div>
    </div>
  )
}

export default ChangePassword;