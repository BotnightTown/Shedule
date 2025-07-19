import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { IoChevronForward } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

interface NewNoteModalProps {
  onClose: () => void;
  onSave: () => Promise<void>;
}
interface NewNoteButtonProps{
  onSave: () => Promise<void>;
}
interface NoteProps{
  id: number;
  title: string;
  content: string;
  date: Date;
  onDelete: (id: number) => void;
}
interface NotesPageProps{
  sidebarOpen: boolean;
}
interface NoteType {
  id_note: number;
  title: string;
  content: string;
  date: Date;
}

function NewNoteModal({ onClose, onSave } : NewNoteModalProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;

    try {
      // const newNote = await axios.post('http://localhost:8000/notes/create', { title, content}, {withCredentials: true });
      await onSave();
    } catch (error){
      console.error("Error making note:", error);
    }
    onClose();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/10 backdrop-blur-[0.6vw] flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-[#02c1eb] dark:bg-slate-900 dark:border-2 dark:border-[#02c1eb] p-6 rounded-md shadow-md w-80 sm:w-85 md:w-90 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white dark:text-slate-300 cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-base md:text-lg font-semibold mb-4 text-white dark:text-slate-300">{t('New Note')}</h2>
        <input
          name="title"
          type="text"
          placeholder={`${t('Title')}...`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border-2 bg-sky-50 dark:bg-slate-800 border-sky-300 dark:border-[#02c1eb] focus:outline focus:outline-[#02c1eb] rounded mb-3 text-sm md:text-base"
        />
        <textarea
          placeholder={`${t('Write your note')}...`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border-2 bg-sky-50 dark:bg-slate-800 border-sky-300 dark:border-[#02c1eb] focus:outline focus:outline-[#02c1eb] rounded text-sm md:text-base h-24"
        />
        <button
          onClick={handleSave}
          className="mt-3 w-full bg-[#FEAA26] text-black py-2 rounded text-sm md:text-base cursor-pointer"
        >
          {t('Save')}
        </button>
      </div>
    </div>
  );
}

function NewNoteButton({ onSave }: NewNoteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-row w-23 md:w-25 lg:w-35 h-7 md:h-8 lg:h-10 pl-1 pr-1 bg-[#FEAA26] justify-around items-center rounded-sm shadow-md cursor-pointer text-black"
      >
        <AiOutlinePlus className="text-xs md:text-sm lg:text-lg" />
        <p className="text-xs md:text-sm lg:text-base">{t("New Note")}</p>
      </button>
      {isOpen && 
      <NewNoteModal 
        onClose={() => setIsOpen(false)} 
        onSave={async () => {
          await onSave(); 
          setIsOpen(false);
        }} 
      />}
    </>
  );
}

function Note({ id, title, content, date, onDelete }: NoteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const { t } = useTranslation();

  const formattedDate = new Date(date).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <div className="w-full h-max flex flex-col px-4 shadow-md rounded-md bg-[#02c1eb] dark:bg-slate-800 dark:border-2 dark:border-[#02c1eb]">
      <div className="w-full h-18 md:h-20 flex flex-row justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <div className="w-max flex flex-col gap-2">
          <p className="text-xm md:text-base font-medium text-white dark:text-slate-300">{title}</p>
          <p className="text-xs md:text-sm font-normal text-gray-50 dark:text-slate-400">{formattedDate}</p>
        </div>
        <IoChevronForward
          className={`text-xm md:text-base cursor-pointer transition-transform duration-800 text-white
            ${isOpen ? "rotate-90" : "rotate-0"}`}
        />
      </div>
      <div
        className={`
          w-full flex flex-col gap-2
          overflow-hidden transition-all duration-800 ease-in-out
          ${isOpen ? 'h-35 opacity-100' : 'h-0 opacity-0'}
        `}
      >
        <textarea
          className="w-full p-1 border bg-sky-50 border-sky-300 dark:border-slate-950 text-gray-900 dark:text-slate-400 rounded-md text-sm h-25"
          value={content}
          disabled
        />
        <div className="flex flex-row justify-end gap-5">
          <button className="w-25 bg-custom-blue dark:bg-slate-900 text-cyan-50 hover:scale-103 transition-all duration-300 hover:dark:bg-slate-700 rounded-sm shadow-md cursor-pointer" onClick={handleDelete}>{t("Delete")}</button>
        </div>
      </div>
    </div>
  );
}

function NotesPage({ sidebarOpen }: NotesPageProps) {
  const [notes, setNotes] = useState<NoteType[]>([])
  const { t } = useTranslation();

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/notes/all', { withCredentials: true });
      setNotes(response.data);
    } catch (err) {
      console.error("Error fetching schedule:", err)
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  const saveNote = async () => {
    await fetchNotes();
  };

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/notes/${id}`, { withCredentials: true });
      // const updatedNotes = notes.filter(note => note.id !== id);
      // setNotes(updatedNotes);
      await fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };


  return (
    <div className={`h-full flex flex-col gap-5 text-cyan-950 dark:text-slate-400 transition-all duration-300 ${!sidebarOpen ? 'p-5 pt-0' : ''}`}>
      <div className="h-max flex flex-row justify-between items-center ">
        <p className="text-lg md:text-xl font-medium dark:text-slate-300">{t("Notes")}</p>
        <NewNoteButton onSave={saveNote} />
      </div>
      <p className="h-max text-base md:text-lg font-medium dark:text-slate-300">{t("Recent Notes")}</p>
      <div className="h-full overflow-y-auto flex flex-col gap-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Note
              key={note.id_note}
              id={note.id_note}
              title={note.title}
              content={note.content}
              date={note.date}
              onDelete={deleteNote}
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