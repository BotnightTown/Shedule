import { useState, useEffect, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { UserContext } from "../../UserContext";

function Lesson({number, classroom, name, teacher}){
  return(
    <div className="w-full flex flex-col gap-2 shadow-md rounded-md p-2 bg-[#02c1eb] dark:bg-slate-800 dark:border-2 dark:border-[#02c1eb]">
      <div className="flex flex-row justify-between">
        <p className="text-xs md:text-sm font-normal text-gray-100 dark:text-slate-300">{number}</p>
        <p className="text-xs md:text-sm font-normal text-gray-100 dark:text-slate-300">{classroom}</p>
      </div>
      <p className="text-sm md:text-base font-medium text-white">{name}</p>
      <p className="text-xs md:text-sm font-normal text-gray-100 dark:text-slate-300">{teacher}</p>
    </div>
  )
}

function DaySchedule({dayOfWeek, sidebarOpen, lessons}){
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => setIsOpen(!isOpen);

  return(
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-row text-xl md:text-2xl font-medium m-3 mr-0 cursor-pointer dark:text-slate-300" onClick={toggleOpen}>
        {dayOfWeek}
        <div className="flex item-center justify-center p-2 pr-0">
          <FaChevronDown
            className={`cursor-pointer transition-transform duration-800 ${
            isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
      </div>
      <div
        className={`
          w-full ${sidebarOpen ? 'p-5 px-0' : 'p-0'} flex flex-col gap-4
          overflow-hidden transition-all duration-1000 ease-in-out
          ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="w-full p-5 pl-1 pr-1 flex flex-col gap-4">
          {lessons && lessons.length > 0 ? (
            lessons.map((lesson, idx) => (
              <Lesson
                key={idx}
                number={`${lesson.pair_number} ${t("Lesson(pair)")}`}
                classroom={lesson.classroom || "-"}
                name={lesson.subject || "-"}
                teacher={lesson.teacher || "-"}
              />
            ))
          ) : (
            <Lesson number={"-"} name={`${t("No Lessons")}`} />
          )}
        </div>
      </div>
    </div>
  )
}

function SchedulePage({ sidebarOpen }){
  const [groupedSchedule, setGroupedSchedule] = useState({});
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // const group = localStorage.getItem('selectedGroup') || '208';
        // const subgroup = localStorage.getItem('selectedSubgroup') || '1';
        const group = user?.group;
        const subgroup = user?.subgroup;
        const weekType = localStorage.getItem('weekType') || 'upper';
        const response = await axios.get(`http://localhost:8000/schedule?group=${group}&subgroup=${subgroup}&weekType=${weekType}`);
        // const response = await axios.get(`http://192.168.0.102:8000/schedule?group=${group}&subgroup=${subgroup}&weekType=${weekType}`);
        // const response = await axios.get(`http://192.168.43.49:8000/schedule?group=${group}&subgroup=${subgroup}&weekType=${weekType}`);
        const data = response.data;

        const grouped = {};
        for (const lesson of data) {
          const day = lesson.day_of_week;
          if (!grouped[day]) grouped[day] = [];
          grouped[day].push(lesson);
        }

        setGroupedSchedule(grouped);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, []);

  const daysOfWeek = [
    { label: `${t("days.1")}`, value: 1 },
    { label: `${t("days.2")}`, value: 2 },
    { label: `${t("days.3")}`, value: 3 },
    { label: `${t("days.4")}`, value: 4 },
    { label: `${t("days.5")}`, value: 5 },
    { label: `${t("days.6")}`, value: 6 },
  ];

  return(
    <div className="h-full flex flex-col gap-5 ">
      <p className={`text-xl md:text-2xl font-medium transition-all duration-300 dark:text-slate-300 ${!sidebarOpen ? 'pl-7' : 'pl-2'}`}>
        {t("Schedule")}
      </p>
      <div className={`w-full h-screen overflow-y-auto transition-all duration-300 ${!sidebarOpen ? 'p-5 pt-0' : ''}`}>
        {daysOfWeek.map(day => (
          <DaySchedule 
            key={day.value}
            dayOfWeek={day.label}
            lessons={groupedSchedule[day.value] || []}
            sidebarOpen={sidebarOpen}
          />
        ))}
      </div>
    </div>
  )
}

export default SchedulePage;