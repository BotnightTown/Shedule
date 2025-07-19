import { useState } from "react"
// import { Link } from "react-router";
import axios, { AxiosError } from 'axios';

function ResetPasswordPage(){
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleReset = async () => {
    setError(null);
    try {
      await axios.post("http://localhost:8000/register", {
        
      })

    console.log(email + error); // тимчасове рішення
    } catch (err) {
      const error = err as AxiosError<{ err: string }>;
      setError(error.response?.data?.err || "Помилка скидання паролю");
    }
  }

  return(
    <div className="w-full h-full p-5 pt-0 flex items-start justify-center">
      <div className="w-full h-max p-5 flex flex-col gap-3 bg-white dark:bg-slate-800 rounded-xl border-2 border-[#02c1eb]">
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-2xl font-semibold dark:text-slate-300">Reset password</p>
          <p className="text-sm">Введіть email уведений при реєстрації</p>
        </div>
        <div className="relative border border-slate-300 dark:border-slate-950 rounded-md">
          <span className="absolute -top-3 left-3 bg-white dark:bg-slate-800 px-1 text-sm text-slate-600 dark:text-slate-300">
            Email
          </span>
          <input
            type="email"
            className="w-full h-10 rounded-md pl-2
              border border-slate-300 dark:border-slate-950
              hover:outline-1 hover:outline-cyan-400
              focus:outline-2 focus:outline-[#02c1eb]"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button 
          className="w-full h-10 bg-custom-blue dark:bg-slate-900 text-cyan-50 hover:bg-custom-blue hover:dark:bg-slate-700 rounded-sm shadow-md cursor-pointer focus:outline-[#02c1eb]" 
          onClick={handleReset}
        >
          Підтвердити
          </button>
        {/* <p className="text-center dark:text-slate-300">Вже маєте акаунт? <Link className="font-semibold cursor-pointer" to="/login">Увійти</Link>!</p> */}
      </div>
    </div>
  )
}

export default ResetPasswordPage;