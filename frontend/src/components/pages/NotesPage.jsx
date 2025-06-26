import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoChevronForward } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

function NewNoteModal({ onClose, onSave }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;

    const newNote = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString('uk-UA'),
    };

    onSave(newNote);
    onClose();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/10 backdrop-blur-[0.6vw] flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-cyan-50 dark:bg-slate-800 p-6 rounded-md shadow-md w-80 sm:w-85 md:w-90 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-cyan-900 hover:text-slate-800 cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-base md:text-lg font-semibold mb-4">{t('New Note')}</h2>
        <input
          name="title"
          type="text"
          placeholder={`${t('Title')}...`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-cyan-200 dark:border-slate-950 rounded mb-3 text-sm md:text-base"
        />
        <textarea
          placeholder={`${t('Write your note')}...`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-cyan-200 dark:border-slate-950 rounded text-sm md:text-base h-24"
        />
        <button
          onClick={handleSave}
          className="mt-3 w-full bg-cyan-500 dark:bg-slate-900 text-cyan-50 py-2 rounded hover:bg-cyan-600 hover:dark:bg-slate-700 text-sm md:text-base cursor-pointer"
        >
          {t('Save')}
        </button>
      </div>
    </div>
  );
}


function NewNoteButton({ onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-row w-23 md:w-25 lg:w-35 h-7 md:h-8 lg:h-10 pl-1 pr-1 bg-cyan-200 dark:bg-slate-700 justify-around items-center rounded-md shadow-md cursor-pointer text-cyan-950 dark:text-slate-400"
      >
        <AiOutlinePlus className="text-xs md:text-sm lg:text-lg" />
        <p className="text-xs md:text-sm lg:text-base">{t("New Note")}</p>
      </button>
      {isOpen && <NewNoteModal onClose={() => setIsOpen(false)} onSave={onSave} />}
    </>
  );
}


function Note({ title, content, date }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full h-max flex flex-col pr-4 pl-4 shadow-md rounded-md bg-cyan-50 dark:bg-slate-800">
      <div className="w-full h-18 md:h-20 flex flex-row justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <div className="w-max flex flex-col gap-2">
          <p className="text-xm md:text-base font-medium text-cyan-950 dark:text-slate-300">{title}</p>
          <p className="text-xs md:text-sm font-normal text-cyan-900 dark:text-slate-400">{date}</p>
        </div>
        <IoChevronForward
          className={`text-xm md:text-base cursor-pointer transition-transform duration-800 
            ${isOpen ? "rotate-90" : "rotate-0"}`}
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
          className="w-full p-1 border border-gray-500 dark:border-slate-950 text-cyan-900 dark:text-slate-400 rounded text-sm h-25"
          value={content}
          disabled
        />
      </div>
    </div>
  );
}


function NotesPage({ sidebarOpen }) {
  const [notes, setNotes] = useState(() => {
    const stored = localStorage.getItem('notes');
    return stored ? JSON.parse(stored) : [];
  });
  const { t } = useTranslation();

  const saveNote = (newNote) => {
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className={`h-full flex flex-col gap-5 text-cyan-950 dark:text-slate-400 transition-all duration-300 ${!sidebarOpen ? 'p-5 pt-0' : ''}`}>
      <div className="h-max flex flex-row justify-between items-center ">
        <p className="text-lg md:text-xl font-medium">{t("Notes")}</p>
        <NewNoteButton onSave={saveNote} />
      </div>
      <p className="h-max text-base md:text-lg font-medium">{t("Recent Notes")}</p>
      <div className="h-full overflow-y-auto flex flex-col gap-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Note
              key={note.id}
              title={note.title}
              content={note.content}
              date={note.date}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">{t("No notes found")}.</p>
        )}
      </div>
    </div>
  );
}


export default NotesPage;