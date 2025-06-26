import TodayLessons from "../components/TodayLessons";
import LessonNow from "../components/LessonNow";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";

function TodayPage({ sidebarOpen }) {
  const [allTodayLesson, setAllTodayLesson] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTodayLesson = async () => {
      try {
        const group = localStorage.getItem('selectedGroup') || '208';
        const subgroup = localStorage.getItem('selectedSubgroup') || '1';
        const response = await axios.get(`http://localhost:8000/today/all?group=${group}&subgroup=${subgroup}`);
        // const response = await axios.get(`http://192.168.0.102:8000/today/all?group=${group}&subgroup=${subgroup}`);
        // const response = await axios.get(`http://192.168.43.49:8000/today/all?group=${group}&subgroup=${subgroup}`);
        setAllTodayLesson(response.data);
      } catch (error) {
        console.error("Error fetching today's lesson:", error);
      }
    };

    fetchTodayLesson();
  }, []);

  return (
    <div className={`w-full h-full flex flex-col ${!sidebarOpen ? 'p-5 pt-0' : ''} gap-5 transition-all duration-300 text-cyan-950 dark:text-slate-200`}>
      <p className="text-xl md:text-2xl font-medium">{t('Today')}</p>
      <LessonNow />
      <p className="font-semibold text-lg md:text-xl text-cyan-950 dark:text-slate-200">{t("Today's Lessons")}</p>
      <div className="shadow-md rounded-md bg-cyan-50 dark:bg-slate-800">
        {allTodayLesson.length === 0
          ? <p className="p-5">No lessons today</p>
          : allTodayLesson.map((lesson, index) => (
              <TodayLessons
                key={index}
                number={`${lesson.pair_number} ${t("Lesson(pair)")}`}
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
