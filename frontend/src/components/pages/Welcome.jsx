import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { UserContext } from "../../UserContext";
import { BsCalendar2Event, BsJournalText, BsFileEarmarkText } from "react-icons/bs";
import WelcomeItem from "../components/WelcomeItem";
import LessonNow from "../components/LessonNow";
import ClassroomImg from "../../assets/WelcomePage/Classroom.webp";
import NotesImg from "../../assets/WelcomePage/Notes.webp";
import ScheduleImg from "../../assets/WelcomePage/Schedule.webp";

function HelloText(){
  const [name] = useState(() => localStorage.getItem('name') || 'Student');
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  return(
    <div className="w-full flex flex-col items-center gap-3 pt-6 pb-6">
      <p className="text-2xl md:text-3xl font-medium dark:text-slate-300">{t('Hello')}, {user?.username}</p>
      <p className="text-base md:text-lg dark:text-slate-300">{t('Choose what you want')}</p>
    </div>
  )
}

function Welcome({sidebarOpen}){
  const { t } = useTranslation();
  
  return(
    <div className="w-full h-full flex flex-col gap-5">
      <HelloText />
      <div className="grid grid-cols-3 gap-2 p-4 justify-items-center">
        <WelcomeItem 
          icon={<BsJournalText />} 
          label={t("Today")}
          to="/today" 
          sidebarOpen={sidebarOpen}
          src={ClassroomImg}
          alt="Today"
        />
        <WelcomeItem 
          icon={<BsCalendar2Event />} 
          label={t("Schedule")}
          to="/schedule" 
          sidebarOpen={sidebarOpen} 
          src={ScheduleImg}
          alt="Today"
        />
        <WelcomeItem 
          icon={<BsFileEarmarkText />} 
          label={t("Notes")}
          to="/notes" 
          sidebarOpen={sidebarOpen} 
          src={NotesImg}
          alt="Today"
        />
      </div>
      <NavLink className={`transition-all duration-300 ${sidebarOpen ? "p-0" : "p-5"}`} to={"/today"}>
        <LessonNow />
      </NavLink>
    </div>
  )
}

export default Welcome;