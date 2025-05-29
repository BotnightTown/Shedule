import TodayLessons from "../components/TodayLessons";
import LessonNow from "../components/LessonNow";
import { useEffect, useState } from "react";
import axios from "axios";

function TodayPage({ sidebarOpen }) {
  const [allTodayLesson, setAllTodayLesson] = useState([]);

  useEffect(() => {
    const fetchTodayLesson = async () => {
      try {
        const group = localStorage.getItem('selectedGroup') || '208';
        const subgroup = localStorage.getItem('selectedSubgroup') || '1';
        const response = await axios.get(`http://localhost:8000/today/all?group=${group}&subgroup=${subgroup}`);
        setAllTodayLesson(response.data);
      } catch (error) {
        console.error("Error fetching today's lesson:", error);
      }
    };

    fetchTodayLesson();
  }, []);

  return (
    <div className={`w-full h-full flex flex-col ${!sidebarOpen ? 'p-5 pt-0' : ''} gap-5 transition-all duration-300`}>
      <p className="text-2xl md:text-3xl font-medium">Today</p>
      <LessonNow />
      <p className="font-semibold text-xl md:text-2xl text-gray-950 dark:text-gray-200">Today's Lessons</p>
      <div className="shadow-md rounded-md">
        {allTodayLesson.length === 0
          ? <p className="p-5">No lessons today</p>
          : allTodayLesson.map((lesson, index) => (
              <TodayLessons
                key={index}
                number={`${lesson.pair_number} пара`}
                classroom={lesson.classroom || "-"}
                time={`${lesson.start_time} - ${lesson.end_time}`}
                name={lesson.subject || "-"}
                teacher={lesson.teacher || "-"}
              />
            ))}
      </div>
    </div>
  );
}

export default TodayPage;
