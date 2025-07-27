import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from 'axios';
import { UserContext } from "../../UserContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function RegistrationPage(){
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedSubgroup, setSelectedSubgroup] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const groups = ["208", "209"];
  const subgroups = ["1", "2"];
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { setUser } = useContext(UserContext)!;
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null);
    setSuccess(null);
    try {
      await axios.post("http://localhost:8000/user/register", {
        username, email, password, selectedGroup, selectedSubgroup
      }, {withCredentials: true})
      await axios.post("http://localhost:8000/user/login", {username, password}, {withCredentials: true});
      const res = await axios.get("http://localhost:8000/user/profile", {withCredentials: true});
      setUser(res.data.user);
      setSuccess("Реєстрація успішна! Перенаправлення..");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data?.error || "Помилка реєстрації");
    }
  }

    return(
    <div className="w-full h-full p-5 pt-0 flex items-start justify-center">
      <form className="w-full h-max p-5 flex flex-col gap-3 bg-white dark:bg-slate-800 rounded-xl border-2 border-[#02c1eb]">
        <p className="text-2xl font-semibold dark:text-slate-300">{t("Registration")}</p>
        <div className="flex flex-col gap-5 pt-1">
          <div className="relative border border-slate-300 dark:border-slate-950 rounded-md">
            <span className="absolute -top-3 left-3 bg-white dark:bg-slate-800 px-1 text-sm text-slate-600 dark:text-slate-300">{t("Username")}</span>
            <input type="text" 
              className="w-full h-10 rounded-md pl-2
                border border-slate-300 dark:border-slate-950
                hover:outline-1 hover:outline-cyan-400
                focus:outline-2 focus:outline-[#02c1eb]"
            onChange={e => setUsername(e.target.value)}/>
          </div>
          <div className="relative border border-slate-300 dark:border-slate-950 rounded-md">
            <span className="absolute -top-3 left-3 bg-white dark:bg-slate-800 px-1 text-sm text-slate-600 dark:text-slate-300">Email</span>
            <input type="text" 
              className="w-full h-10 rounded-md pl-2
                border border-slate-300 dark:border-slate-950
                hover:outline-1 hover:outline-cyan-400
                focus:outline-2 focus:outline-[#02c1eb]"
            onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="relative border border-slate-300 dark:border-slate-950 rounded-md">
            <span className="absolute -top-3 left-3 bg-white dark:bg-slate-800 px-1 text-sm text-slate-600 dark:text-slate-300">{t("Password")}</span>
            <input type={!isVisible ? "password" : "text"} 
              className="w-full h-10 rounded-md pl-2
                border border-slate-300 dark:border-slate-950
                hover:outline-1 hover:outline-cyan-400
                focus:outline-2 focus:outline-[#02c1eb]"
              onChange={e => setPassword(e.target.value)}
            />
            <span 
              className={`absolute right-0 top-0 translate-y-1/2 -translate-x-1/2 text-lg cursor-pointer text-slate-600 dark:text-slate-300 transition-all duration-300 hover:dark:text-slate-300 ${password === "" ? "dark:text-slate-950" : "dark:text-slate-300"}`}
              onClick={()=>setIsVisible(!isVisible)}
            >
              {isVisible ? <FaRegEye className="dark:text-slate-300"/> : <FaRegEyeSlash /> }
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <p className="dark:text-slate-300">{t("Group")}</p>
            <select 
              className="w-36 p-1 rounded-md border-2 border-gray-300 dark:border-slate-800 focus:outline focus:outline-[#02c1eb] bg-white dark:bg-slate-800 text-sm" 
              required 
              value={selectedGroup} 
              onChange={e => setSelectedGroup(e.target.value)}
            >
              <option value="" disabled>{t("Choose group")}</option>
              {groups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-between">
            <p className="dark:text-slate-300">{t("Subgroup")}</p>
            <select 
              className="w-36 p-1 rounded-md border-2 border-gray-300 dark:border-slate-800 focus:outline focus:outline-[#02c1eb] bg-white dark:bg-slate-800 text-sm " 
              required 
              value={selectedSubgroup} 
              onChange={e => setSelectedSubgroup(e.target.value)}
            >
              <option value="" disabled>{t("Choose subgroup")}</option>
              {subgroups.map(subgroup => (
                <option key={subgroup} value={subgroup}>{subgroup}</option>
              ))}
            </select>
          </div>
        </div>
        <button 
          type="button" 
          className="w-full h-10 bg-custom-blue dark:bg-slate-900 text-cyan-50 hover:bg-custom-blue hover:dark:bg-slate-700 rounded-sm shadow-md cursor-pointer focus:outline focus:outline-[#02c1eb]" 
          onClick={handleRegister}
        >
          {t("Registration2")}
        </button>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <p className="text-center dark:text-slate-300">{t("Already have an account?")} <Link className="font-semibold cursor-pointer focus:outline focus:outline-[#02c1eb]" to="/login">{t("Login")}</Link>!</p>
      </form>
    </div>
  )

}

export default RegistrationPage;