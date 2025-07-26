import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

function LoginPage(){
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useContext(UserContext)!;
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      await axios.post("http://localhost:8000/user/login", {username, password}, {withCredentials: true});
      const res = await axios.get("http://localhost:8000/user/profile", {withCredentials: true});
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      const error = err as AxiosError<{ err: string }>;
      setError(error.response?.data?.err || "Неправильний логін або пароль");
      console.log(error.response?.data);
    }
  }

  return(
    <div className="w-full h-full p-5 pt-0 flex items-start justify-center">
      <div className="w-full h-max p-5 flex flex-col gap-3 bg-white dark:bg-slate-800 rounded-xl border-2 border-[#02c1eb]">
        <h2 className="text-2xl font-semibold dark:text-slate-300">{t("Login")}</h2>
        <div className="flex flex-col gap-5 pt-1">
          <div className="relative border border-slate-300 dark:border-slate-950 rounded-md">
            <span className="absolute -top-3 left-3 bg-white dark:bg-slate-800 px-1 text-sm text-slate-600 dark:text-slate-300">{t("Username")}</span>
            <input 
              type="text" 
              className="w-full h-10 rounded-md pl-2
                border border-slate-300 dark:border-slate-950
                hover:outline-1 hover:outline-cyan-400
                focus:outline-2 focus:outline-[#02c1eb]"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="relative border border-slate-300 dark:border-slate-950 rounded-md">
            <span className="absolute -top-3 left-3 bg-white dark:bg-slate-800 px-1 text-sm text-slate-600 dark:text-slate-300">
              {t("Password")}
            </span>
            <input
              type="password"
              className="w-full h-10 rounded-md pl-2
                border border-slate-300 dark:border-slate-950
                hover:outline-1 hover:outline-cyan-400
                focus:outline-2 focus:outline-[#02c1eb]"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
        <p className="text-center dark:text-slate-300">{t("Don't have an account?")} <Link className="font-semibold cursor-pointer" to="/registration">{t("Registration")}</Link>!</p>
        <div className="flex flex-col gap-2">
          <button className="w-full h-10 bg-[#02c1eb] text-cyan-50 d rounded-sm shadow-md cursor-pointer focus:outline-[#02c1eb]"
          onClick={handleLogin}>{t("Log in")}</button>
          <Link className="pl-3 cursor-pointer text-sm dark:text-slate-300" to="/reset_request">{t("Forgot password?")}</Link>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  )

}

export default LoginPage;