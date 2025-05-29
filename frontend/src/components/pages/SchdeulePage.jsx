import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";

function Lesson({number, classroom, name, teacher}){
  return(
    <div className="w-full flex flex-col gap-2 shadow-md rounded-md p-2">
      <div className="flex flex-row justify-between">
        <p className="text-xs md:text-sm font-normal text-gray-600 dark:text-gray-300">{number}</p>
        <p className="text-xs md:text-sm font-normal text-gray-600 dark:text-gray-300">{classroom}</p>
      </div>
      <p className="text-sm md:text-base font-medium">{name}</p>
      <p className="text-xs md:text-sm font-normal text-gray-600 dark:text-gray-300">{teacher}</p>
    </div>
  )
}

function DaySchedule({dayOfWeek, sidebarOpen, lessons}){
  const [isOpen, setIsOpen] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('http://localhost:8000/schedule');
        setSchedule(response.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, []);

  return(
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-row text-xl md:text-2xl font-medium font-grey-950 m-3 mr-0"
      >
        {dayOfWeek}
        <div className="flex item-center justify-center p-2 pr-0">
          <FaChevronDown
            onClick={toggleOpen}
            className={`cursor-pointer transition-transform duration-800 ${
            isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
      </div>
      <div
        className={`
          w-full ${sidebarOpen ? 'p-5' : 'p-0'} flex flex-col gap-4
          overflow-hidden transition-all duration-1000 ease-in-out
          ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="w-full p-5 pl-1 pr-1 flex flex-col gap-4">
          {lessons && lessons.length > 0 ? (
            lessons.map((lesson, idx) => (
              <Lesson
                key={idx}
                number={`${lesson.pair_number} пара`}
                classroom={lesson.classroom || "-"}
                name={lesson.subject || "-"}
                teacher={lesson.teacher || "-"}
              />
            ))
          ) : (
            <Lesson number={"-"} name={"Немає занять"} />
          )}
        </div>
      </div>
    </div>
  )
}

function SchedulePage({ sidebarOpen }){
    const [groupedSchedule, setGroupedSchedule] = useState({});

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('http://localhost:8000/schedule');
        const data = response.data;

        // Групування за днями тижня
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
    { label: "Понеділок", value: 1 },
    { label: "Вівторок", value: 2 },
    { label: "Середа", value: 3 },
    { label: "Четвер", value: 4 },
    { label: "Пʼятниця", value: 5 },
    { label: "Субота", value: 6 },
  ];

  return(
    <div className="h-full flex flex-col gap-5 ">
      <p className={`text-2xl md:text-3xl font-medium transition-all duration-300 ${!sidebarOpen ? 'pl-7' : 'pl-2'}`}>Schedule</p>
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