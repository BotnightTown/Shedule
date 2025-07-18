import { useEffect, useRef } from "react";
import { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { UserContext } from "../UserContext"
import Sidebar from "./Sidebar";
import Welcome from "./pages/Welcome";
import TodayPage from "./pages/TodayPage";
import SchedulePage from "./pages/SchdeulePage";
import NotesPage from "./pages/NotesPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ResetPasswordPage from "./pages/ResetPassword";

function Main({ sidebarOpen, setSidebarOpen }){
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {    
    if(location.pathname !== "/"){
      setSidebarOpen(true);
    }

    prevPathRef.current = location.pathname;
  }, [location, setSidebarOpen]);


  return(
    <main className="flex-1 overflow-hidden flex flex-row pt-5">
      {user ? (
        <>
          <Sidebar open={sidebarOpen} className='h-full' />
          <div className={`w-full h-full transition-all duration-300 ${sidebarOpen ? 'p-5' : 'p-0'}`}>
            <Routes>
              <Route path="/" element={<Welcome sidebarOpen={sidebarOpen} />}/>
              <Route path="/today" element={<TodayPage sidebarOpen={sidebarOpen} />}/>
              <Route path="/schedule" element={<SchedulePage sidebarOpen={sidebarOpen} />}/>
              <Route path="/notes" element={<NotesPage sidebarOpen={sidebarOpen} />}/>
              <Route path="/settings" element={<SettingsPage sidebarOpen={sidebarOpen} />}/>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/reset_password" element={<ResetPasswordPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </>
      )}
    </main>
  )
}

export default Main;