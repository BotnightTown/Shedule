import WelcomeItem from "../components/WelcomeItem";
import LessonNow from "../components/LessonNow";
import { BsCalendar2Event, BsJournalText, BsFileEarmarkText } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import ClassroomImg from "../../assets/WelcomePage/Classroom.webp";
import NotesImg from "../../assets/WelcomePage/Notes.webp";
import ScheduleImg from "../../assets/WelcomePage/Schedule.webp";

function HelloText(){
  return(
    <div className="w-full flex flex-col items-center gap-3 pt-6 pb-6">
      <p className="text-2xl md:text-3xl font-medium">Hello, Vladyslav</p>
      <p className="text-base md:text-lg">Choose what you want</p>
    </div>
  )
}

function Welcome({sidebarOpen}){
  return(
    <div className="w-full h-full flex flex-col gap-5">
      <HelloText />
      <div className="grid grid-cols-3 gap-2 p-4 justify-items-center">
        <WelcomeItem 
          icon={<BsJournalText />} 
          label="Today" 
          to="/today" 
          sidebarOpen={sidebarOpen}
          src={ClassroomImg}
          alt="Today"
        />
        <WelcomeItem 
          icon={<BsCalendar2Event />} 
          label="Schedule" 
          to="/schedule" 
          sidebarOpen={sidebarOpen} 
          src={ScheduleImg}
          alt="Today"
        />
        <WelcomeItem 
          icon={<BsFileEarmarkText />} 
          label="Notes" 
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