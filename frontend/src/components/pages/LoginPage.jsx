import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

function LoginPage(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      await axios.post("http://localhost:8000/login", {username, password}, {withCredentials: true});
      const res = await axios.get("http://localhost:8000/profile", {withCredentials: true});
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.err || "Неправильний логін або пароль");
      console.log(err.response?.data);
    }
  }

  return(
    <div className="w-full h-full p-5 pt-0 flex items-start justify-center">
      <div className="w-full h-max p-5 flex flex-col gap-3 bg-white dark:bg-slate-800 rounded-xl border-2 border-[#02c1eb]">
        <p className="text-2xl font-semibold dark:text-slate-300">Login</p>
        <div className="flex flex-col gap-5 pt-1">
          <div className="relative border border-slate-300 dark:border-slate-950 rounded-md">
            <span className="absolute -top-3 left-3 bg-white dark:bg-slate-800 px-1 text-sm text-slate-600 dark:text-slate-300">Username</span>
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
              Password
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
        <p className="text-center dark:text-slate-300">Не маєте акаунту? <Link className="font-semibold cursor-pointer" to="/registration">Зареєструватися</Link>!</p>
        <div className="flex flex-col gap-2">
          <button className="w-full h-10 bg-[#02c1eb] text-cyan-50 d rounded-sm shadow-md cursor-pointer focus:outline-[#02c1eb]"
          onClick={handleLogin}>Log in</button>
          <Link className="pl-3 cursor-pointer text-sm dark:text-slate-300" to="/reset_password">Забули пароль?</Link>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  )
}

export default LoginPage;