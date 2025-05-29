import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Welcome from "./pages/Welcome";
import TodayPage from "./pages/TodayPage";
import SchedulePage from "./pages/SchdeulePage";
import NotesPage from "./pages/NotesPage";
import SettingsPage from "./pages/SettingsPage";
import { Routes, Route } from 'react-router-dom';

function Main({ sidebarOpen, setSidebarOpen }){
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // if (prevPathRef.current === "/" && location.pathname !== "/") {
    //   setSidebarOpen(false);
    // } else if (location.pathname !== "/") {
    //   setSidebarOpen(true);
    // }
    
    if(location.pathname !== "/"){
      setSidebarOpen(true);
    }

    prevPathRef.current = location.pathname;
  }, [location, setSidebarOpen]);

  return(
    <main className="flex-1 overflow-hidden flex flex-row pt-5">
      <Sidebar open={sidebarOpen} className='h-full' />
      <div className={`w-full h-full transition-all duration-300 ${sidebarOpen ? 'p-5' : 'p-0'}`}>
        <Routes>
          <Route path="/" element={<Welcome sidebarOpen={sidebarOpen} />}/>
          <Route path="/today" element={<TodayPage sidebarOpen={sidebarOpen} />}/>
          <Route path="/schedule" element={<SchedulePage sidebarOpen={sidebarOpen} />}/>
          <Route path="/notes" element={<NotesPage sidebarOpen={sidebarOpen} />}/>
          <Route path="/settings" element={<SettingsPage sidebarOpen={sidebarOpen} />}/>
        </Routes>
      </div>
    </main>
  )
}

export default Main;