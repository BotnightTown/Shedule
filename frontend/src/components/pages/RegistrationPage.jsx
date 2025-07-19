import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function RegistrationPage(){
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = async () => {
    setError(null);
    setSuccess(null);
    try {
      await axios.post("http://localhost:8000/register", {
        username, email, password
      })
      setSuccess("Реєстрація успішна!");
    } catch (err) {
      setError(err.response?.data?.error || "Помилка реєстрації");
    }
  }

  return(
    <div className="w-full h-full p-5 pt-0 flex items-start justify-center">
      <div className="w-full h-max p-5 flex flex-col gap-3 bg-white dark:bg-slate-800 rounded-xl border-2 border-[#02c1eb]">
        <p className="text-2xl font-semibold dark:text-slate-300">Registration</p>
        <div className="flex flex-col gap-5 pt-1">
          <div className="relative border border-slate-300 dark:border-slate-950 rounded-md">
            <span className="absolute -top-3 left-3 bg-white dark:bg-slate-800 px-1 text-sm text-slate-600 dark:text-slate-300">Username</span>
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
            <span className="absolute -top-3 left-3 bg-white dark:bg-slate-800 px-1 text-sm text-slate-600 dark:text-slate-300">Password</span>
            <input type="password" 
              className="w-full h-10 rounded-md pl-2
                border border-slate-300 dark:border-slate-950
                hover:outline-1 hover:outline-cyan-400
                focus:outline-2 focus:outline-[#02c1eb]"
            onChange={e => setPassword(e.target.value)}/>
          </div>
        </div>
        <button className="w-full h-10 bg-custom-blue dark:bg-slate-900 text-cyan-50 hover:bg-custom-blue hover:dark:bg-slate-700 rounded-sm shadow-md cursor-pointer focus:outline-[#02c1eb]" onClick={handleRegister}>Registration</button>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <p className="text-center dark:text-slate-300">Вже маєте акаунт? <Link className="font-semibold cursor-pointer" to="/login">Увійти</Link>!</p>
      </div>
    </div>
  )
}

export default RegistrationPage;