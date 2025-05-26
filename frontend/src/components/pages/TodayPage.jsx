import TodayLessons from "../components/TodayLessons";
import LessonNow from "../components/LessonNow";

function TodayPage({ sidebarOpen }){
  return (
    <div className={`w-full h-full flex flex-col ${!sidebarOpen ? 'p-5 pt-0' : ''} gap-5 transition-all duration-300`}>
      <p className="text-2xl md:text-3xl font-medium">Today</p>
      <LessonNow />
      <p className="font-semibold text-xl md:text-2xl text-gray-950 dark:text-gray-200">Today's Lessons</p>
      <div className="shadow-md rounded-md ">
        <TodayLessons number={"1 пара"} classroom={"1-404"} time={"9:00 - 10:20"} name={"Organisation of DataBase"} teacher={"Кірей К. О."} />
        <TodayLessons number={"2 пара"} classroom={"1-404"} time={"10:30 - 11:50"} name={"Organisation of DataBase"} teacher={"Кірей К. О."} />
        <TodayLessons number={"3 пара"} time={"12:30 - 13:50"} name={"English"} />
        <TodayLessons number={"4 пара"} time={"14:00 - 15:20"} name={"SPA-Technology"} />
        <TodayLessons number={"5 пара"} name={"-"}/>
      </div>
    </div>
  )
}

export default TodayPage;