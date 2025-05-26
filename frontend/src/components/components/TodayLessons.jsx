import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";

function TodayLessons({number, classroom, time, name, teacher}){
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return(
    <div className="w-full flex flex-col m-2 p-2 h-max">
      <div className="w-full flex flex-row cursor-pointer" onClick={toggleOpen}>
        <div className="flex flex-col w-full gap-2">
          <p className="text-xs md:text-sm font-normal text-gray-600 dark:text-gray-300">{number}</p>
          <p className="text-sm md:text-base font-semibold text-gray-950 dark:text-gray-200">{name}</p>
        </div>
        <div className="flex items-center ml-2">
          <IoChevronForward 
            className={`cursor-pointer transition-transform duration-800 text-base md:text-lg ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </div>
      </div>
      <div
        className={`
          w-full flex flex-col gap-2
          overflow-hidden transition-all duration-800 ease-in-out
          ${isOpen ? 'h-19 md:h-22 opacity-100 pt-2' : 'h-0 opacity-0'}
        `}
      >
        <p className="text-sm md:text-base font-semibold text-gray-950 dark:text-gray-200">{time}</p>
        <div className="flex flex-col justify-between gap-2">
          <p className="text-xs md:text-sm font-semibold text-gray-900 dark:text-gray-200">{teacher}</p>
          <p className="text-xs md:text-sm font-normal text-gray-600 dark:text-gray-300">{classroom}</p>
        </div>
      </div>
    </div>
  )
}

export default TodayLessons;