import { useEffect, useState, useContext } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { UserContext } from "../../UserContext";
import TodayLessons from "../components/TodayLessons";
import LessonNow from "../components/LessonNow";

interface TodayPageProps {
  sidebarOpen: boolean;
}

interface Lesson {
  pair_number: number;
  subject: string;
  classroom: string;
  start_time: string;
  end_time: string;
  teacher: string;
}


function TodayPage({ sidebarOpen } : TodayPageProps){
  const [allTodayLesson, setAllTodayLesson] = useState<Lesson[]>([]);
  const userContext = useContext(UserContext);
  if (!userContext) return null
  const { user } = userContext;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTodayLesson = async () => {
      try {
        const group = user?.group;
        const subgroup = user?.subgroup;
        const response = await axios.get(`http://localhost:8000/today/all?group=${group}&subgroup=${subgroup}`);
        setAllTodayLesson(response.data);
      } catch (error) {
        console.error("Error fetching today's lesson:", error);
      }
    };

    fetchTodayLesson();
  }, []);

  return (
    <div className={`w-full h-full flex flex-col ${!sidebarOpen ? 'p-5 pt-0' : ''} gap-5 transition-all duration-300 text-cyan-950 dark:text-slate-200`}>
      <p className="text-xl md:text-2xl font-medium dark:text-slate-300">{t('Today')}</p>
      <LessonNow />
      <p className="font-semibold text-lg md:text-xl text-cyan-950 dark:text-slate-300">{t("Today's Lessons")}</p>
      <div className="shadow-md rounded-md bg-[#02c1eb] dark:bg-slate-800 dark:border-2 dark:border-[#02c1eb]">
        {allTodayLesson.length === 0
          ? <p className="p-5 text-black dark:text-slate-300">{t("No lessons today")}</p>
          : allTodayLesson.map((lesson, index) => (
              <div key={index}>
                {index !== 0 && (
                  <div className="border-t border-white dark:border-[#02c1eb] w-5/6 mx-auto my-2" />
                )}
                <TodayLessons
                  number={`${lesson.pair_number} ${t("Lesson(pair)")}`}
                  classroom={lesson.classroom || "-"}
                  time={`${lesson.start_time} - ${lesson.end_time}`}
                  name={lesson.subject || "-"}
                  teacher={lesson.teacher || "-"}
                />
              </div>
          ))
        }
      </div>
    </div>
  );
}

export default TodayPage;