import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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

function DaySchedule({dayOfWeek, sidebarOpen}){
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => setIsOpen(!isOpen);
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
          <Lesson number={"1 пара"} classroom={"1-403А"} name={"Мова програмування Python"} teacher={"Боровльова С. Ю."}/>
          <Lesson number={"2 пара"} classroom={"1-403А"} name={"Мова програмування Python"} teacher={"Боровльова С. Ю."}/>
          <Lesson number={"3 пара"} classroom={"1-403А"} name={"Мова програмування Python"} teacher={"Боровльова С. Ю."}/>
          <Lesson number={"4 пара"} classroom={"1-403А"} name={"Мова програмування Python"} teacher={"Боровльова С. Ю."}/>
          <Lesson number={"5 пара"} name={"-"}/>
        </div>
      </div>
    </div>
  )
}

function SchedulePage({ sidebarOpen }){
  return(
    <div className="h-full flex flex-col gap-5 ">
      <p className={`text-2xl md:text-3xl font-medium transition-all duration-300 ${!sidebarOpen ? 'pl-7' : 'pl-2'}`}>Schedule</p>
      <div className={`w-full h-screen overflow-y-auto transition-all duration-300 ${!sidebarOpen ? 'p-5 pt-0' : ''}`}>
        <DaySchedule dayOfWeek={"Wednesday"}/>
        <DaySchedule dayOfWeek={"Friday"}/>
      </div>
    </div>
  )
}

export default SchedulePage;