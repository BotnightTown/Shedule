import axios from "axios";
import { useState, useEffect } from "react";

function LessonNow(){
  const [currentLesson, setCurrentLesson] = useState(null);
  const days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "Пʼятниця", "Субота"];
  
  useEffect(() => {
    const fetchLessonNow = async () => {
      try {
        const group = localStorage.getItem('selectedGroup') || '208';
        const subgroup = localStorage.getItem('selectedSubgroup') || '1';
        const weekType = localStorage.getItem('weekType') || 'upper';
        const response = await axios.get(`http://localhost:8000/today/current?group=${group}&subgroup=${subgroup}&weekType=${weekType}`);
        setCurrentLesson(response.data[0]);
      } catch (error) {
        console.error("Error fetching current lesson:", error);
      }
    };

    fetchLessonNow();
  }, []);

  return(
    
    <div className="w-full h-max p-5 flex flex-col gap-2 shadow-md rounded-md dark:bg-gray-800 dark:text-gray-200">
      {currentLesson ? (
        <>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{days[parseInt(currentLesson.day_of_week)]}</p>
          <p className="text-base md:text-lg font-semibold text-gray-950 dark:text-gray-200">{currentLesson.start_time} - {currentLesson.end_time}</p>
          <p className="text-base md:text-lg font-semibold text-gray-950 dark:text-gray-200">{currentLesson.subject}</p>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{currentLesson.teacher}</p>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Зараз немає пари</p>
      )}
    </div>
  )
}

export default LessonNow;