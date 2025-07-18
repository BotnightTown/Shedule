import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { UserContext } from "../../UserContext";

function LessonNow(){
  const [currentLesson, setCurrentLesson] = useState(null);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  
  useEffect(() => {
    const fetchLessonNow = async () => {
      try {
        // const group = localStorage.getItem('selectedGroup') || '208';
        // const subgroup = localStorage.getItem('selectedSubgroup') || '1';
        const group = user?.group;
        const subgroup = user?.subgroup;
        const weekType = localStorage.getItem('weekType') || 'upper';
        const response = await axios.get(`http://localhost:8000/today/current?group=${group}&subgroup=${subgroup}&weekType=${weekType}`);
        // const response = await axios.get(`http://192.168.0.102:8000/today/current?group=${group}&subgroup=${subgroup}&weekType=${weekType}`);
        // const response = await axios.get(`http://192.168.43.49:8000/today/current?group=${group}&subgroup=${subgroup}&weekType=${weekType}`);
        setCurrentLesson(response.data[0]);
      } catch (error) {
        console.error("Error fetching current lesson:", error);
      }
    };

    fetchLessonNow();
  }, []);

  return(
    <div className="w-full h-max p-5 flex flex-col gap-2 shadow-md rounded-md bg-[#FEAA26] dark:bg-[#02c1eb]">
      {currentLesson ? (
        <>
          <p className="text-xs md:text-sm text-[#3B424C] dark:text-slate-100">{t(`days.${parseInt(currentLesson.day_of_week)}`)}</p>
          <p className="text-base md:text-lg font-semibold text-gray-950 dark:text-slate-50">{currentLesson.start_time} - {currentLesson.end_time}</p>
          <p className="text-base md:text-lg font-semibold text-gray-950 dark:text-slate-50">{currentLesson.subject}</p>
          <p className="text-xs md:text-sm text-[#3B424C] dark:text-slate-100">{currentLesson.teacher}</p>
        </>
      ) : (
        <p className="text-black dark:text-slate-400">{t("No Lesson now")}</p>
      )}
    </div>
  )
}

export default LessonNow;