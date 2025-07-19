import { useEffect, useRef } from "react";
import { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from 'react-router';
import { UserContext } from "../UserContext"
import Sidebar from "./Sidebar";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import WelcomePage from "./pages/WelcomePage";
import TodayPage from "./pages/TodayPage";
import SchedulePage from "./pages/SchedulePage";
import NotesPage from "./pages/NotesPage";
import SettingsPage from "./pages/SettingsPage";

interface MainAppProps {
  sidebarOpen : boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MainApp ({ sidebarOpen, setSidebarOpen } : MainAppProps){
  const userContext = useContext(UserContext);
  if (!userContext) return null
  const { user } = userContext;
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
          <Sidebar open={sidebarOpen} />
          <div className={`w-full h-full transition-all duration-300 ${sidebarOpen ? 'p-5' : 'p-0'}`}>
            <Routes>
              <Route path="/" element={<WelcomePage sidebarOpen={sidebarOpen} />}/>
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

export default MainApp;