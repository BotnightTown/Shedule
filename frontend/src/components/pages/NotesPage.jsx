import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoChevronForward } from "react-icons/io5";

function NewNoteModal({ onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/10 backdrop-blur-[0.6vw] flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md w-80 sm:w-85 md:w-90 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-lg md:text-xl font-semibold mb-4">New Note</h2>
        <input
          type="text"
          placeholder="Title..."
          className="w-full p-2 border border-gray-300 dark:border-gray-950 rounded mb-3 text-sm md:text-base"
        />
        <textarea
          placeholder="Write your note..."
          className="w-full p-2 border border-gray-300 dark:border-gray-950 rounded text-sm md:text-base h-24"
        />
        <button onClick={onClose} className="mt-3 w-full bg-blue-500 dark:bg-slate-900 text-white py-2 rounded hover:bg-blue-600 hover:dark:bg-slate-800 text-sm md:text-base cursor-pointer">
          Save
        </button>
      </div>
    </div>
  );
}

function NewNoteButton(){
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-row w-23 md:w-25 lg:w-35 h-7 md:h-8 lg:h-10 pl-1 pr-1 bg-gray-200 dark:bg-gray-700 justify-around items-center rounded-md cursor-pointer"
      >
        <AiOutlinePlus className="text-xs md:text-sm lg:text-lg"/>
        <p className="text-xs md:text-sm lg:text-lg">New Note</p>
      </button>
      {isOpen && <NewNoteModal onClose={() => setIsOpen(false)} />}
    </>
  );
}

function Note(){
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return(
    <div className="w-full h-max flex flex-col pr-4 pl-4 shadow-md rounded-md">
      <div className="w-full h-18 md:h-20 flex flex-row justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <div className="w-max flex flex-col gap-2">
          <p className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-200">Book Report</p>
          <p className="text-sm md:text-base font-normal text-gray-600 dark:text-gray-300">April 18, 2024</p>
        </div>
        <IoChevronForward
        className={`text-base md:text-lg cursor-pointer transition-transform duration-800 
          ${ isOpen ? "rotate-90" : "rotate-0" }`} 
        />
      </div>
      <div
        className={`
          w-full flex flex-col gap-2
          overflow-hidden transition-all duration-800 ease-in-out
          ${isOpen ? 'h-26 opacity-100' : 'h-0 opacity-0'}
        `}
      >
        <textarea
          className="w-full p-1 border border-gray-300 rounded text-sm h-24"
          disabled
        />
      </div>
    </div>
  )
}

function NotesPage({ sidebarOpen }){
  return(
    <div className={`h-full flex flex-col gap-5 text-gray-950 dark:text-gray-200 transition-all duration-300 ${!sidebarOpen ? 'p-5 pt-0' : ''}`}>
      <div className="h-max flex flex-row justify-between items-center ">
        <p className="text-2xl md:text-3xl font-medium">Notes</p>
        <NewNoteButton />
      </div>
      <p className="h-max text-lg md:text-xl font-medium">Recent Notes</p>
      <div className="h-full overflow-y-auto">
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </div>
    </div>
  )
}

export default NotesPage;